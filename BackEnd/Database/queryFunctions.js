import {queryExecute} from "./database.js";

function baseQuery(tableName) {
  return `Select *
          From ${tableName}`;
}

function runProcedure(procedure) {
  return `Begin\n${procedure};\nEnd;`;
}

export async function updateUserDB(context) {
  const query = runProcedure(
    `UPDATE_USER(${context.USER_ID}, '${context.FIRST_NAME}', '${context.LAST_NAME}', '${context.ADDRESS}', '${context.EMAIL}', '${context.CONTACT_NO}', '${context.IMAGE}', '${context.GENDER}', '${context.PASSWORD}')`
  );
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return null;
  }
  return context;
}

export async function getUserDetailsDB(context) {
  let query = baseQuery('"USER"');
  const binds = {};
  binds.USER_ID = context.USER_ID;

  query += "\nWhere USER_ID = :USER_ID";
  let result = null;
  try {
    result = await queryExecute(query, binds);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function postUserDB(user) {
  console.log("postUserDB");
  const query = runProcedure(
    `INSERT_USER('${user.FIRST_NAME}','${user.LAST_NAME}','${user.IMAGE}','${user.ADDRESS}','${user.EMAIL}','${user.PASSWORD}','${user.CONTACT_NO}','${user.GENDER}')`
  );
  console.log("procedure postUserDB");
    console.log(query);
  try {
    const result = await queryExecute(query, []);
  } catch (err) {
    return null;
  }
  return user;
}

export async function findUserDB(user) {
  let query = baseQuery('"USER"');
  query += `\nWhere UPPER(EMAIL) = UPPER('${user.EMAIL}')`;
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function postAdminDB(admin) {
  const procedure = "INSERT_ADMIN(:USER_ID)";
  const query = runProcedure(procedure);
  try {
    const result = await queryExecute(query, admin);
  } catch (err) {
    return null;
  }
  return admin;
}

export async function findAdminDB(admin) {
  let query = baseQuery("ADMIN");
  const binds = {};
  binds.USER_ID = admin.USER_ID;
  // console.log(admin);
  query += "\nWhere USER_ID = :USER_ID";
  let result = null;
  try {
    result = await queryExecute(query, binds);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function findEmployeeDB(employee) {
  let query = baseQuery("EMPLOYEE");
  const binds = {};
  binds.USER_ID = employee.USER_ID;

  query += "\nWhere USER_ID = :USER_ID";
  let result = null;
  try {
    result = await queryExecute(query, binds);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getBookDetailsByIDDB(context) {
  console.log(context);
  let query =
    "SELECT B.ISBN, P.PUBLISHER_ID, P.NAME AS PUBLISHER_NAME, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, " +
    "(SELECT JSON_ARRAYAGG(DISTINCT JSON_OBJECT('NAME' VALUE A.NAME, 'ID' VALUE A.AUTHOR_ID)) FROM WRITTEN_BY WB JOIN AUTHOR A ON WB.AUTHOR_ID = A.AUTHOR_ID WHERE WB.ISBN = B.ISBN) AS AUTHOR, " +
    "(SELECT JSON_ARRAYAGG(DISTINCT JSON_OBJECT('NAME' VALUE G.GENRE_NAME, 'ID' VALUE G.GENRE_ID)) FROM BOOK_GENRE BG JOIN GENRE G ON BG.GENRE_ID = G.GENRE_ID WHERE BG.ISBN = B.ISBN) AS GENRE, " +
    "(SELECT JSON_ARRAYAGG(DISTINCT JSON_OBJECT('ID' VALUE E.EDITION_ID, 'NUM' VALUE E.EDITION_NUM, 'COUNT' VALUE E.NUM_OF_COPIES, 'YEAR' VALUE E.PUBLISH_YEAR)) FROM EDITION E WHERE E.ISBN = B.ISBN) AS EDITION, " +
    "(SELECT  MIN(E.PUBLISH_YEAR) FROM EDITION E WHERE E.ISBN = B.ISBN) AS PUBLISH_YEAR, B.PREVIEWLINK, " +
    "NVL(ROUND(AVG(R.RATING), 2), 0) AS RATING, NVL(COUNT(DISTINCT F.USER_ID), 0) AS FAVOURITE, B.DESCRIPTION";
  if (context.USER_ID) {
    query += `, CASE WHEN B.ISBN = ANY(SELECT F.ISBN FROM FAVOURITE F WHERE F.USER_ID = ${context.USER_ID}) THEN 1 ELSE 0 END AS IS_FAVOURITE`;
  }
  query +=
    "\nFROM BOOK B " +
    "LEFT JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID) " +
    "LEFT JOIN REVIEW_RATING R ON (B.ISBN = R.ISBN) " +
    "LEFT JOIN FAVOURITE F ON (B.ISBN = F.ISBN)";
  query += `\nWHERE B.ISBN = '${context.ISBN}'`;
  query +=
    "\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, P.PUBLISHER_ID, P.NAME, B.NUMBER_OF_PAGES, B.LANGUAGE, B.DESCRIPTION, B.PREVIEWLINK";
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAllBookDB() {
  const query = "SELECT ISBN, TITLE, IMAGE FROM BOOK" + "\nORDER BY TITLE ASC";
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAllBookSumDB(context) {
  console.log(context);
  let query =
    "SELECT B.ISBN, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, " +
    "(SELECT MAX(E.PUBLISH_YEAR) FROM EDITION E WHERE E.ISBN = B.ISBN) AS PUBLISH_YEAR, " +
    "(SELECT EDITION_ID FROM EDITION E WHERE E.ISBN = B.ISBN AND PUBLISH_YEAR >= ALL (SELECT PUBLISH_YEAR FROM EDITION E2 WHERE E2.ISBN = B.ISBN)) AS EDITION_ID, " +
    "(SELECT LISTAGG(A.NAME, ', ') FROM WRITTEN_BY WB JOIN AUTHOR A ON WB.AUTHOR_ID = A.AUTHOR_ID WHERE WB.ISBN = B.ISBN) AS AUTHORS, " +
    "NVL(ROUND(AVG(R.RATING), 2), 0) AS RATING, NVL(COUNT(DISTINCT F.USER_ID),0) AS FAVOURITE";
  if (context.USER_ID) {
    query += `, CASE WHEN B.ISBN = ANY(SELECT F.ISBN FROM FAVOURITE F WHERE F.USER_ID = ${context.USER_ID}) THEN 1 ELSE 0 END AS IS_FAVOURITE`;
  }
  query +=
    "\nFROM BOOK B " +
    "LEFT JOIN REVIEW_RATING R ON (B.ISBN = R.ISBN) " +
    "LEFT JOIN FAVOURITE F ON(B.ISBN = F.ISBN) ";
  query += "\nWHERE 1 = 1 ";
  if (context.USER_ID) {
    if (context.MY_RAT === true) {
      query += `\nAND B.ISBN IN (SELECT R.ISBN FROM REVIEW_RATING R WHERE R.USER_ID = ${context.USER_ID})`;
    }
    if (context.MY_FAV === true) {
      query += `\nAND B.ISBN IN (SELECT F.ISBN FROM FAVOURITE F WHERE F.USER_ID = ${context.USER_ID})`;
    }
  }
  if (context.ISBN) {
    query += `\nAND B.ISBN = '${context.ISBN}'`;
  }
  if (context.TITLE) {
    query += `\nAND UPPER(B.TITLE) LIKE '%${context.TITLE}%'`;
  }
  if (context.LANGUAGE) {
    query += `\nAND UPPER(B.LANGUAGE) LIKE '${context.LANGUAGE}'`;
  }
  if (context.AUTHOR_ID) {
    query += `\nAND B.ISBN IN (SELECT WB.ISBN FROM WRITTEN_BY WB WHERE WB.AUTHOR_ID = ${context.AUTHOR_ID})`;
  }
  if (context.GENRE_ID) {
    query += `\nAND B.ISBN IN (SELECT BG.ISBN FROM BOOK_GENRE BG WHERE BG.GENRE_ID = ${context.GENRE_ID})`;
  }
  if (context.PUBLISHER_ID) {
    query += `\nAND B.PUBLISHER_ID = ${context.PUBLISHER_ID}`;
  }
  if (context.PAGE_START) {
    query += `\nAND B.NUMBER_OF_PAGES >= ${context.PAGE_START}`;
  }
  if (context.PAGE_END) {
    query += `\nAND B.NUMBER_OF_PAGES <= ${context.PAGE_END}`;
  }
  if (context.YEAR_START) {
    query += `\nAND B.ISBN IN (SELECT E.ISBN FROM EDITION E WHERE E.PUBLISH_YEAR >= ${context.YEAR_START})`;
  }
  if (context.YEAR_END) {
    query += `\nAND B.ISBN IN (SELECT E.ISBN FROM EDITION E WHERE E.PUBLISH_YEAR <= ${context.YEAR_END})`;
  }
  if (context.RATING_START > 0) {
    query += `\nAND B.ISBN IN (SELECT R.ISBN FROM REVIEW_RATING R GROUP BY R.ISBN HAVING NVL(ROUND(AVG(R.RATING), 2), 0) >= ${context.RATING_START})`;
  }
  if (context.RATING_END) {
    query +=
      `\nAND (B.ISBN IN (SELECT R.ISBN FROM REVIEW_RATING R GROUP BY R.ISBN HAVING NVL(ROUND(AVG(R.RATING), 2), 0) <= ${context.RATING_END})` +
      `\nOR B.ISBN NOT IN (SELECT R.ISBN FROM REVIEW_RATING R GROUP BY R.ISBN))`;
  }
  query += "\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE";
  // Check for sorting and ordering options
  if (context.sort && context.order) {
    // const validColumns = ["ISBN", "TITLE", "IMAGE", "PAGE", "LANGUAGE", "PUBLISH_YEAR", "EDITION_ID", "AUTHORS", "FAVOURITE", "RATING"];
    // if (context.USER_ID) {
    //   validColumns.push("IS_FAVOURITE");
    // }
    // const validOrders = ["ASC", "DESC"];

    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "TITLE") {
      query += ", B.TITLE ASC";
    }
  } else {
    query += "\nORDER BY B.TITLE ASC";
  }
  // }
  let result = null;
  try {
    console.log(query);
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getSearchBarDB(context) {
  console.log(context);
  let query =
    "SELECT B.ISBN, B.TITLE, B.IMAGE, B.LANGUAGE, " +
    "(SELECT LISTAGG(A.NAME, ', ') FROM WRITTEN_BY WB JOIN AUTHOR A ON WB.AUTHOR_ID = A.AUTHOR_ID WHERE WB.ISBN = B.ISBN) AS AUTHORS";
  query +=
    "\nFROM BOOK B LEFT JOIN WRITTEN_BY WB ON (WB.ISBN = B.ISBN) " +
    "LEFT JOIN AUTHOR A ON(WB.AUTHOR_ID = A.AUTHOR_ID) ";
  query += `\nWHERE B.ISBN LIKE '%${context.text}%' OR UPPER(B.TITLE) LIKE '%${context.text}%' OR UPPER(A.NAME) LIKE '%${context.text}%'`;
  query += "\nGROUP BY B.TITLE, B.IMAGE, B.ISBN, B.LANGUAGE";
  if (context.sort && context.order) {
    // const validColumns = ["ISBN", "TITLE", "IMAGE", "LANGUAGE", "AUTHORS"];
    // const validOrders = ["ASC", "DESC"];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "TITLE") {
      query += ", TITLE ASC";
    }
  } else {
    query += `\nORDER BY TITLE ASC, AUTHORS ASC, ISBN ASC`;
  }
  // } else {
  //   query += `\nORDER BY TITLE ASC, AUTHORS ASC, ISBN ASC`;
  // }
  let result = null;
  try {
    console.log(query);
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAvgRatingDB(context) {
  let binds = {};
  binds.ISBN = context.ISBN;
  let query = "SELECT NVL(Round(AVG(RATING),2), 0) AS AVG_RATING FROM REVIEW_RATING" + "\nWHERE ISBN = :ISBN";
  console.log(query);
  let result;
  try {
    result = await queryExecute(query, binds);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function getAllLanguagesDB() {
  let query = "SELECT LANGUAGE FROM BOOK GROUP BY LANGUAGE";
  query += "\nORDER BY LANGUAGE ASC";
  let result = null;
  try {
    result = await queryExecute(query);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getAuthorDB(context) {
  let query = baseQuery("AUTHOR");
  if (context.AUTHOR_ID) {
    query += `\nWHERE AUTHOR_ID = ${context.AUTHOR_ID}`;
  }
  if (context.sort && context.order) {
    query += `\nORDER BY ${context.sort} ${context.order}, NAME ASC`;
  } else {
    query += "\nORDER BY NAME ASC";
  }
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getPublisherDB(context) {
  let query = baseQuery("PUBLISHER");
  if (context.PUBLISHER_ID) {
    query += `\nWhere PUBLISHER_ID = ${context.PUBLISHER_ID}`;
  }
  if (context.sort && context.order) {
    query += `\nORDER BY ${context.sort} ${context.order}, NAME ASC`;
  } else {
    query += "\nORDER BY NAME ASC";
  }
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getEmployeeDB(context) {
  let query =
    "SELECT U.USER_ID, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, U.EMAIL, U.IMAGE, E.JOIN_DATE, E.JOB_ID, J.JOB_TITLE " +
    '\nFROM EMPLOYEE E LEFT JOIN "USER" U ON(U.USER_ID = E.USER_ID) LEFT JOIN JOB J ON(J.JOB_ID = E.JOB_ID)';
  if (context.USER_ID) {
    query += `\nWHERE E.USER_ID = ${context.USER_ID}`;
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['EMAIL', 'NAME', 'JOB_TITLE', 'JOIN_DATE', 'JOB_ID'];
    // const validOrders = ['ASC', 'DESC'];

    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "JOIN_DATE") {
      query += ", JOIN_DATE ASC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY JOIN_DATE ASC";
  }
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getMyMessagesDB(context) {
  // get all messages of a user
  let query = baseQuery("MESSAGE") + `\nWHERE USER_ID = ${context.USER_ID}` + "\nORDER BY Message_Date DESC";
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAllNewsDB() {
  // get all messages of a user
  let query = baseQuery("NEWS") + "\nORDER BY News_Date DESC";
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAllUsersDB(context) {
  // Define the base query
  let query =
    "SELECT U.USER_ID, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, U.IMAGE, U.ADDRESS, U.EMAIL, U.CONTACT_NO, U.GENDER, " +
    "CASE\nWHEN E.USER_ID IS NOT NULL THEN 'employee'\nWHEN A.USER_ID IS NOT NULL THEN 'admin'\nELSE 'user'\nEND AS ROLE" +
    '\nFROM "USER" U LEFT JOIN EMPLOYEE E ON(U.USER_ID = E.USER_ID) LEFT JOIN ADMIN A ON(U.USER_ID = A.USER_ID) WHERE 1=1';
  if (context.USER_ID) {
    query += `\nAND U.USER_ID <> ${context.USER_ID}`;
  }
  if (!context.USER) {
    query += `\nAND (A.USER_ID IS NOT NULL OR E.USER_ID IS NOT NULL)`;
  }
  if (!context.EMPLOYEE) {
    query += `\nAND E.USER_ID IS NULL`;
  }
  if (!context.ADMIN) {
    query += `\nAND A.USER_ID IS NULL`;
  }

  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['USER_ID', 'NAME', 'EMAIL'];
    // const validOrders = ['ASC', 'DESC'];

    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "NAME") {
      query += ", NAME ASC";
    }
    flag = 0;
  }
  // }

  if (flag) {
    query += "\nORDER BY NAME ASC";
  }

  // Execute the query
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getMyRequestsDB(context) {
  let query =
    "SELECT B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, R.REQUEST_DATE " +
    "\nFROM REQUEST R JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)" +
    `\nWHERE 1=1`;
  if (context.USER_ID) {
    query += `\nAND R.USER_ID = ${context.USER_ID}`;
  }
  if (context.ISBN) {
    query += `\nAND B.ISBN = '${context.ISBN}'`;
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['TITLE', 'EDITION_NUM', 'REQUEST_DATE'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "REQUEST_DATE") {
      query += ", REQUEST_DATE ASC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY REQUEST_DATE ASC";
  }
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getApplicationDB(context) {
  // Define the base query
  let query =
    "SELECT U.USER_ID, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, U.IMAGE, U.EMAIL, J.JOB_ID, J.JOB_TITLE, A.APPLY_DATE " +
    '\nFROM APPLY A LEFT JOIN "USER" U ON(A.USER_ID = U.USER_ID) LEFT JOIN JOB J ON(J.JOB_ID = A.JOB_ID) ';
  if (context.JOB_ID) {
    query += `\nWHERE A.JOB_ID = ${context.JOB_ID}`;
  }
  if (context.USER_ID) {
    query += `\nWHERE U.USER_ID = ${context.USER_ID}`;
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['NAME', 'EMAIL', 'JOB_TITLE', 'APPLY_DATE'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "APPLY_DATE") {
      query += ", APPLY_DATE DESC";
    }
    flag = 0;
  }
  // }

  if (flag) {
    query += "\nORDER BY APPLY_DATE DESC";
  }

  // Execute the query
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}


export async function getAllRequestsDB(context) {
  let query =
    `SELECT (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, R.USER_ID, U.IMAGE, U.EMAIL, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, E.NUM_OF_COPIES, R.REQUEST_DATE` +
    '\nFROM REQUEST R JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)  JOIN "USER" U ON(R.USER_ID = U.USER_ID)';
  // if (context.USER_ID) {
  //   query += `\nWHERE R.USER_ID <> ${context.USER_ID}`
  // }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['TITLE', 'EDITION_NUM', 'REQUEST_DATE', 'NUM_OF_COPIES', 'EMAIL'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "REQUEST_DATE") {
      query += ", REQUEST_DATE ASC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY REQUEST_DATE ASC";
  }
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getMyRentHistoryDB(context) {
  let query =
    "SELECT RENT_HISTORY_ID, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, RENT_DATE, RETURN_DATE, STATUS" +
    "\nFROM RENT_HISTORY R JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)";
  if (context.USER_ID) {
    query += `\nWHERE R.USER_ID = ${context.USER_ID}`;
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['TITLE', 'EDITION_NUM', 'RENT_DATE', 'STATUS'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "TITLE") {
      query += ", TITLE ASC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY TITLE ASC";
  }

  let result = [];
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getMyFineHistoryDB(context) {
  let query =
    "SELECT F.RENT_HISTORY_ID, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, START_DATE, PAYMENT_DATE, FEE_AMOUNT" +
    "\nFROM FINE_HISTORY F LEFT JOIN RENT_HISTORY R ON(R.RENT_HISTORY_ID = F.RENT_HISTORY_ID) LEFT JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)";
  if (context.USER_ID) {
    query += `\nWHERE R.USER_ID = ${context.USER_ID}`;
  }
  if (context.CHECK) {
    query += " AND F.PAYMENT_DATE IS NULL";
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['TITLE', 'EDITION_NUM', 'START_DATE', 'PAYMENT_DATE', 'FEE_AMOUNT'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "TITLE") {
      query += ", TITLE ASC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY TITLE ASC";
  }
  console.log(query);
  let result = [];
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getRentHistoryDB(context) {
  let query =
    "SELECT RENT_HISTORY_ID, U.USER_ID, U.EMAIL, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, RENT_DATE, RETURN_DATE, STATUS" +
    `\nFROM RENT_HISTORY R LEFT JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) LEFT JOIN BOOK B ON(E.ISBN = B.ISBN) LEFT JOIN "USER" U ON(R.USER_ID = U.USER_ID)`;
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['TITLE', 'EDITION_NUM', 'RENT_DATE', 'STATUS'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "RENT_DATE") {
      query += ", RENT_DATE DESC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY RENT_DATE DESC";
  }

  let result = [];
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getRunningFineDB(context) {
  let query =
    "SELECT F.RENT_HISTORY_ID, U.USER_ID, U.EMAIL, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, B.ISBN, B.TITLE, R.EDITION_ID, START_DATE, PAYMENT_DATE, FEE_AMOUNT" +
    "\nFROM FINE_HISTORY F LEFT JOIN RENT_HISTORY R ON(R.RENT_HISTORY_ID = F.RENT_HISTORY_ID) " +
    'LEFT JOIN "USER" U ON(U.USER_ID = R.USER_ID) LEFT JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)';
  if (context.CHECK) {
    query += "\nWHERE F.PAYMENT_DATE IS NULL";
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['EMAIL', 'NAME', 'START_DATE', 'FEE_AMOUNT', 'TITLE', 'PAYMENT_DATE'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "FEE_AMOUNT") {
      query += ", FEE_AMOUNT DESC";
    }
    flag = 0;
  }
  // }
  if (flag) {
    query += "\nORDER BY FEE_AMOUNT DESC";
  }
  console.log(query);
  let result = [];
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function addRequestDB(context) {
  let query = runProcedure(`INSERT_REQUEST(${context.EDITION_ID}, ${context.USER_ID})`);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function applyForJobDB(context) {
  let query = runProcedure(`INSERT_APPLY(${context.USER_ID}, ${context.JOB_ID})`);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function updateEditionDB(context) {
  let query = runProcedure(
    `UPDATE_EDITION(${context.EDITION_ID}, ${context.EDITION_NUM}, ${context.NUM_OF_COPIES}, ${context.PUBLISH_YEAR})`
  );

  const query1 = baseQuery("EDITION") + `\nWHERE EDITION_ID = ${context.EDITION_ID}`;
  let result = null;
  try {
    console.log(query);
    console.log(query1);
    await queryExecute(query, []);
    console.log(context);
    result = await queryExecute(query1, []);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function getFavouriteDB(fav) {
  const favDB = {...fav};
  let query = "SELECT * FROM FAVOURITE";
  query += "\nWhere USER_ID = :USER_ID AND ISBN = :ISBN";
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, favDB);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getOwnRatRevDB(context) {
  console.log(context);
  let query =
    `SELECT U.USER_ID,
                             (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME,
                             U.IMAGE,
                             R.RATING,
                             R.REVIEW,
                             R.EDIT_DATE` +
    `\nFROM "USER" U JOIN REVIEW_RATING R ON (U.USER_ID = R.USER_ID)` +
    `\nWHERE R.ISBN = '${context.ISBN}' AND U.USER_ID = ${context.USER_ID}`;
  console.log(query);
  let result;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return result.rows;
}

export async function getGenreDB(context) {
  let query = baseQuery("GENRE");

  if (context.GENRE_ID) {
    query += `\nWhere GENRE_ID = ${context.GENRE_ID}`;
  }
  query += " order by GENRE_NAME asc";
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getJobDB(context) {
  let query = `SELECT JOB_TITLE, JOB_ID, SALARY, (SELECT COUNT(*) FROM EMPLOYEE E WHERE E.JOB_ID = J.JOB_ID) AS NUM_OF_EMPLOYEES`;
  if (context.USER_ID) {
    query +=
      `, CASE\nWHEN JOB_ID IN (SELECT JOB_ID FROM EMPLOYEE WHERE USER_ID = ${context.USER_ID}) THEN 'working'` +
      `\nWHEN JOB_ID IN (SELECT JOB_ID FROM APPLY WHERE USER_ID = ${context.USER_ID}) THEN 'applied'\nELSE 'apply' END\nAS STATUS`;
  }
  query += `\nFROM JOB J`;
  if (context.JOB_ID) {
    query += `\nWhere JOB_ID = ${context.JOB_ID}`;
  }
  let flag = 1;
  if (context.sort && context.order) {
    // const validColumns = ['JOB_TITLE', 'SALARY', 'STATUS'];
    // const validOrders = ['ASC', 'DESC'];
    //
    // if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
    query += `\nORDER BY ${context.sort} ${context.order}`;
    if (context.sort !== "SALARY") {
      query += ", SALARY DESC";
    }
    flag = 0;
  }
  // }

  if (flag) {
    query += "\nORDER BY SALARY DESC";
  }
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getAllRatRevOfBookDB(context) {
  console.log(context);
  let query1 = "";
  if (context.USER_ID) {
    query1 =
      `SELECT U.USER_ID,
                             (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME,
                             U.IMAGE,
                             R.RATING,
                             R.REVIEW,
                             R.EDIT_DATE` +
      `\n FROM "USER" U JOIN REVIEW_RATING R ON (U.USER_ID = R.USER_ID)` +
      `\nWHERE R.ISBN = '${context.ISBN}' AND U.USER_ID = ${context.USER_ID}`;
  }
  let query =
    "SELECT U.USER_ID, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, U.IMAGE, R.RATING, R.REVIEW, R.EDIT_DATE" +
    `\nFROM REVIEW_RATING R JOIN "USER" U ON (U.USER_ID = R.USER_ID)` +
    `\nWHERE R.ISBN = '${context.ISBN}'`;
  if (context.USER_ID) {
    query += ` AND U.USER_ID <> ${context.USER_ID}` + "\nORDER BY R.EDIT_DATE DESC";
  } else {
    query += "\nORDER BY R.EDIT_DATE DESC";
  }
  // console.log(query);
  // console.log(query1);
  let result, result1;
  try {
    result = await queryExecute(query, []);
    if (context.USER_ID) result1 = await queryExecute(query1, []);
    return {allRatRev: result?.rows || [], myRatRev: result1?.rows || []};
  } catch (e) {
    return {allRatRev: [], myRatRev: []};
  }
}

export async function ratrevBookDB(ratRev) {
  const query = runProcedure(
    `EDIT_REVIEW_RATING('${ratRev.ISBN}', ${ratRev.USER_ID}, ${ratRev.RATING}, '${ratRev.REVIEW}')`
  );
  console.log(query);
  let result;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return ratRev;
}

export async function postFavouriteDB(review) {
  console.log(review);
  const reviewDB = {...review};
  const query = runProcedure("POST_FAVOURITE(:ISBN, :USER_ID)");
  try {
    const result = await queryExecute(query, reviewDB);
  } catch (e) {
    return null;
  }
  return reviewDB;
}

export async function createBookDB(book) {
  let query = `BEGIN
    SAVEPOINT book_savepoint;
    INSERT_BOOK('${book.ISBN}', ${book.TITLE ? `'${book.TITLE}'` : 'null'}, ${book.IMAGE ? `'${book.IMAGE}'` : 'null'}, ${book.NUMBER_OF_PAGES}, ${book.LANGUAGE ? `LOWER('${book.LANGUAGE}')` : 'null'}, ${book.DESCRIPTION ? `'${book.DESCRIPTION}'` : 'null'},${book.PUBLISHER_ID});`;

  for (const a of book.AUTHORS) {
    query += `\nINSERT_WRITTEN_BY('${book.ISBN}', ${a.AUTHOR_ID});`;
  }
  for (const a of book.GENRES) {
    query += `\nINSERT_BOOK_GENRE('${book.ISBN}', ${a.GENRE_ID});`;
  }
  for (const e of book.EDITIONS) {
    query += `\nINSERT_EDITION('${book.ISBN}', ${e.EDITION_NUM}, ${e.NUM_OF_COPIES}, ${e.PUBLISH_YEAR});`;
  }

  query += `\nCOMMIT;
    END;`;
  console.log(query);
  try {
    await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return book;
}

export async function deleteRatRevBookDB(context) {
  let query = runProcedure("DELETE_REVIEW_RATING(:ISBN, :USER_ID)");
  console.log(context);
  let result;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return result;
}

export async function updateHistoryDB(context) {
  let query = runProcedure(`EDIT_HISTORY(${context.USER_ID}, ${context.RENT_HISTORY_ID}, ${context.PAY})`);
  console.log(context);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteRequestDB(context) {
  let query = runProcedure(`DELETE_REQUEST(${context.EDITION_ID}, ${context.USER_ID})`);
  console.log(context);
  let result;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function addRentHistoryDB(context) {
  const binds = {
    USER_ID: context.USER_ID,
    EDITION_ID: context.EDITION_ID,
    RETURN_DATE: context.RETURN_DATE,
  };
  let query = runProcedure(`INSERT_RENT_HISTORY(:USER_ID, :EDITION_ID, :RETURN_DATE)`);
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, binds);
  } catch (e) {
    return null;
  }
  return context;
}

export async function getEditionDB(context) {
  let query = baseQuery("EDITION");
  if (context.ISBN && context.EDITION_ID) {
    query += `\nWHERE ISBN = '${context.ISBN}'`;
    query += ` And EDITION_ID = '${context.EDITION_ID}'`;
  } else if (context.ISBN) {
    query += `\nWHERE ISBN = '${context.ISBN}'`;
  } else if (context.EDITION_ID) {
    query += `\nWHERE EDITION_ID = '${context.EDITION_ID}'`;
  } else {
    return [];
  }
  query += "\nORDER BY EDITION_NUM ASC";
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function sendMessageDB(context) {
  let query = runProcedure(`INSERT_MESSAGE(${context.USER_ID}, '${context.MESSAGE}')`);
  console.log(context);
  let result;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function updateMessageDB(context) {
  let query = runProcedure(`UPDATE_MESSAGE(${context.USER_ID})`);
  console.log(context);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteMessageDB(context) {
  let query = runProcedure(`DELETE_MESSAGE(${context.USER_ID}, ${context.MESSAGE_ID})`);
  console.log(context);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function publishNewsDB(context) {
  let query = runProcedure(`INSERT_NEWS('${context.NEWS}')`);
  console.log(context);
  let result;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

export async function addWrittenByDB(bookAuthor) {
  const query = runProcedure("INSERT_WRITTEN_BY(:ISBN, :AUTHOR_ID)");
  console.log(bookAuthor);
  try {
    console.log(query);
    await queryExecute(query, bookAuthor);
  } catch (e) {
    return null;
  }
  return bookAuthor;
}

export async function addBookGenreDB(bookGenre) {
  const query = runProcedure("INSERT_BOOK_GENRE(:ISBN, :GENRE_ID)");
  console.log(bookGenre);
  try {
    console.log(query);
    await queryExecute(query, bookGenre);
  } catch (e) {
    return null;
  }
  return bookGenre;
}

export async function updateBookDB(book) {
  let query = `BEGIN
    SAVEPOINT book_savepoint2;
    UPDATE_BOOK('${book.ISBN}', ${book.TITLE ? `'${book.TITLE}'` : 'null'}, ${book.IMAGE ? `'${book.IMAGE}'` : 'null'}, ${book.NUMBER_OF_PAGES}, ${book.LANGUAGE ? `LOWER('${book.LANGUAGE}')` : 'null'}, ${book.DESCRIPTION ? `'${book.DESCRIPTION}'` : 'null'}, ${book.PUBLISHER_ID});`;

  query += `\nDELETE_WRITTEN_BY('${book.ISBN}');`;
  query += `\nDELETE_BOOK_GENRE('${book.ISBN}');`;

  for (const a of book.AUTHORS) {
    query += `\nINSERT_WRITTEN_BY('${book.ISBN}', ${a.AUTHOR_ID});`;
  }
  for (const a of book.GENRES) {
    query += `\nINSERT_BOOK_GENRE('${book.ISBN}', ${a.GENRE_ID});`;
  }
  for (const e of book.EDITIONS) {
    query += `\nINSERT_EDITION('${book.ISBN}', ${e.EDITION_NUM}, ${e.NUM_OF_COPIES}, ${e.PUBLISH_YEAR});`;
  }

  query += `\nCOMMIT;
    END;`;

  console.log(query);

  try {
    await queryExecute(query, []);
  } catch (e) {
    return null;
  }

  return book;
}

export async function deleteBookDB(context) {
  const query = runProcedure("DELETE_BOOK(:ISBN)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteBookGenreDB(context) {
  const query = runProcedure("DELETE_BOOK_GENRE(:ISBN)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteWittenByDB(context) {
  const query = runProcedure("DELETE_WRITTEN_BY(:ISBN)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function updateAuthorDB(author) {
  const query = runProcedure(
    `UPDATE_AUTHOR(${author.AUTHOR_ID}, '${author.NAME}', ${author.DoB}, ${author.DoD}, '${author.NATIONALITY}', '${author.BIO}', '${author.IMAGE}')`
  );

  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }

  return author;
}

export async function addAuthorDB(author) {
  console.log(author);
  const binds = {
    NAME: author.NAME,
    DoB: author.DoB,
  };
  const query = runProcedure(
    `INSERT_AUTHOR('${author.NAME}', ${author.DoB}, ${author.DoD}, '${author.NATIONALITY}', '${author.BIO}', '${author.IMAGE}')`
  );
  const query1 = baseQuery("AUTHOR") + `\nWHERE (UPPER(NAME) = UPPER(:NAME) AND DoB = :DoB)`;
  let result = null;
  try {
    console.log(author);
    console.log(query);
    console.log(query1);

    await queryExecute(query, []);
    result = await queryExecute(query1, binds);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function deleteAuthorDB(context) {
  const query = runProcedure("DELETE_AUTHOR(:AUTHOR_ID)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function resignAdminDB(context) {
  const query = runProcedure("DELETE_ADMIN(:USER_ID)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteEmployeeDB(context) {
  const query = runProcedure("DELETE_EMPLOYEE(:USER_ID)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function addPublisherDB(publisher) {
  const query = runProcedure(
    `INSERT_PUBLISHER('${publisher.NAME}' ,'${publisher.IMAGE}' ,'${publisher.CITY}' ,'${publisher.COUNTRY}' ,'${publisher.POSTAL_CODE}' ,'${publisher.CONTACT_NO}' ,LOWER('${publisher.EMAIL}'))`
  );
  const query1 = baseQuery("PUBLISHER") + `\nWHERE LOWER(EMAIL) = LOWER('${publisher.EMAIL}')`;
  let result = null;

  try {
    console.log(publisher);
    console.log(query);
    console.log(query1);
    await queryExecute(query, []);
    result = await queryExecute(query1, []);
    console.log(result);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function updatePublisherDB(publisher) {
  const query = runProcedure(
    `UPDATE_PUBLISHER(${publisher.PUBLISHER_ID}, '${publisher.NAME}' ,'${publisher.IMAGE}' ,'${publisher.CITY}' ,'${publisher.COUNTRY}' ,'${publisher.POSTAL_CODE}' ,'${publisher.CONTACT_NO}' ,LOWER('${publisher.EMAIL}'))`
  );

  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return publisher;
}

export async function deletePublisherDB(context) {
  const query = runProcedure("DELETE_PUBLISHER(:PUBLISHER_ID)");
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function addGenreDB(genre) {
  const query = runProcedure(`INSERT_GENRE(INITCAP(LOWER('${genre.GENRE_NAME}')))`);
  const query1 = baseQuery("GENRE") + `\nWHERE UPPER(GENRE_NAME) = UPPER('${genre.GENRE_NAME}')`;
  let result = null;
  try {
    console.log(genre);
    console.log(query);
    console.log(query1);
    await queryExecute(query, []);
    result = await queryExecute(query1, []);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function addJobDB(job) {
  const query = runProcedure(`INSERT_JOB('${job.JOB_TITLE}', ${job.SALARY})`);
  console.log(query);
  try {
    console.log(job);
    const result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return job;
}

export async function addEmployeeDB(employee) {
  const query = runProcedure("INSERT_EMPLOYEE(:USER_ID, :JOB_ID)");
  console.log(query);
  try {
    console.log(employee);
    const result = await queryExecute(query, employee);
  } catch (e) {
    return null;
  }
  return employee;
}

export async function updateJobDB(job) {
  const query = runProcedure(`UPDATE_JOB(${job.JOB_ID}, '${job.JOB_TITLE}', ${job.SALARY})`);
  console.log(query);
  try {
    console.log(job);
    const result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return job;
}

export async function addEditionDB(edition) {
  const query = runProcedure(
    `INSERT_EDITION('${edition.ISBN}', ${edition.EDITION_NUM}, ${edition.NUM_OF_COPIES}, ${edition.PUBLISH_YEAR})`
  );
  // const binds = {
  //   ISBN: edition.ISBN,
  //   EDITION_NUM: edition.EDITION_NUM
  // }
  // const query1 = baseQuery('EDITION') +
  //   `\nWHERE ISBN = :ISBN AND EDITION_NUM = :EDITION_NUM`;
  // let result = null;
  console.log(edition);
  try {
    console.log(query);
    // console.log(query1);
    await queryExecute(query, []);
    // result = await queryExecute(query1, binds);
  } catch (e) {
    return null;
  }
  return edition;
}

export async function updateGenreDB(genre) {
  const query = runProcedure(`UPDATE_GENRE(${genre.GENRE_ID}, '${genre.GENRE_NAME}')`);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return genre;
}

export async function deleteGenreDB(genre) {
  const query = runProcedure("DELETE_GENRE(:GENRE_ID)");
  let result = null;
  try {
    result = await queryExecute(query, genre);
  } catch (e) {
    return null;
  }
  return genre;
}

export async function deleteJobDB(job) {
  const query = runProcedure("DELETE_JOB(:JOB_ID)");
  let result = null;
  try {
    result = await queryExecute(query, job);
  } catch (e) {
    return null;
  }
  return job;
}

export async function deleteApplyDB(job) {
  const query = runProcedure("DELETE_APPLY(:USER_ID, :JOB_ID)");
  let result = null;
  try {
    result = await queryExecute(query, job);
  } catch (e) {
    return null;
  }
  return job;
}

export async function deleteEditionDB(context) {
  const query = runProcedure(`DELETE_EDITION('${context.EDITION_ID}')`);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null;
  }
  return context;
}

import {queryExecute} from './database.js';

// let result = null;
//   try {
//     result = await queryExecute(query, genre);
//   } catch (e) {
//     return null;
//   }
//   return genre;


function baseQuery(tableName) {
  return `Select *
          From ${tableName}`;
}

function runProcedure(procedure) {
  return `Begin\n${procedure};\nEnd;`;
}


export async function updateUserDB(context) {
  const query = runProcedure('UPDATE_USER(:USER_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :CONTACT_NO, :IMAGE, :GENDER, :PASSWORD)');
  let result = null;
  try {

    result = await queryExecute(query, context);
  } catch (err) {
    return null;
  }
  return context;
}

export async function getUserDetailsDB(context) {
  let query = baseQuery('"USER"');
  const binds = {};
  binds.USER_ID = context.USER_ID;

  query += '\nWhere USER_ID = :USER_ID';
  const result = await queryExecute(query, binds);
  return result?.rows;
}

export async function postUserDB(user) {
  console.log('postUserDB');
  const procedure =
    'INSERT_USER(:FIRST_NAME,:LAST_NAME,:IMAGE,:ADDRESS,:EMAIL,:PASSWORD,:CONTACT_NO,:GENDER)';
  // 'INSERT_USER(:FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :USER_NAME, :PASSWORD)'
  const query = runProcedure(procedure);
  console.log('procedure postUserDB');
  try {
    const result = await queryExecute(query, user);
    console.log('exec postUserDB ', result);
  } catch (err) {
    return err;
  }
  return user;
}

export async function findUserDB(user) {
  let query = baseQuery('"USER"');
  const binds = {};
  // console.log(user);
  binds.EMAIL = user.EMAIL;
  query += '\nWhere EMAIL = :EMAIL';
  let result = null;
  try {
    result = await queryExecute(query, binds);
  } catch (err) {
    console.log('error occured');
  }
  return result?.rows;
}

export async function postAdminDB(admin) {
  const procedure = 'INSERT_ADMIN(:FIRST_NAME,:LAST_NAME,:IMAGE,:ADDRESS,:EMAIL,:PASSWORD,:CONTACT_NO,:GENDER)';
  const query = runProcedure(procedure);
  const result = await queryExecute(query, admin);
  return admin;
}

export async function findAdminDB(admin) {
  let query = baseQuery('ADMIN');
  const binds = {};
  binds.USER_ID = admin.USER_ID;
  // console.log(admin);
  query += '\nWhere USER_ID = :USER_ID';
  const result = await queryExecute(query, binds);
  return result.rows;
}

export async function findEmployeeDB(employee) {
  let query = baseQuery('EMPLOYEE');
  const binds = {};
  binds.USER_ID = employee.USER_ID;

  query += '\nWhere USER_ID = :USER_ID';
  const result = await queryExecute(query, binds);
  return result.rows;
}

export async function getBookDetailsByIDDB(context) {
  console.log(context);
  let query =
    "SELECT B.ISBN, " +
    "(SELECT JSON_ARRAYAGG(DISTINCT JSON_OBJECT('NAME' VALUE A.NAME, 'ID' VALUE A.AUTHOR_ID)) FROM WRITTEN_BY WB JOIN AUTHOR A ON WB.AUTHOR_ID = A.AUTHOR_ID WHERE WB.ISBN = B.ISBN) AS AUTHOR, " +
    "(SELECT JSON_ARRAYAGG(DISTINCT JSON_OBJECT('NAME' VALUE G.GENRE_NAME, 'ID' VALUE G.GENRE_ID)) FROM BOOK_GENRE BG JOIN GENRE G ON BG.GENRE_ID = G.GENRE_ID WHERE BG.ISBN = B.ISBN) AS GENRE, " +
    "(SELECT JSON_ARRAYAGG(DISTINCT JSON_OBJECT('ID' VALUE E.EDITION_ID, 'NUM' VALUE E.EDITION_NUM, 'COUNT' VALUE E.NUM_OF_COPIES, 'YEAR' VALUE E.PUBLISH_YEAR)) FROM EDITION E WHERE E.ISBN = B.ISBN) AS EDITION, " +
    "(SELECT  MIN(E.PUBLISH_YEAR) FROM EDITION E WHERE E.ISBN = B.ISBN) AS PUBLISH_YEAR, " +
    "P.PUBLISHER_ID, P.NAME AS PUBLISHER_NAME, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, " +
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
    "\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, P.PUBLISHER_ID, P.NAME, B.NUMBER_OF_PAGES, B.LANGUAGE, B.DESCRIPTION";
  console.log(query);
  const result = await queryExecute(query, []);
  return result.rows;
}

// export async function getBookDetailsByIDDB(context) {
//   console.log(context);
//   const query = 'SELECT B.ISBN,B.TITLE,B.IMAGE,B.NUMBER_OF_PAGES,B.LANGUAGE,'+
//     'B.DESCRIPTION,B.PUBLISHER_ID,P.NAME AS PUBLISHER_NAME,P.EMAIL AS PUBLISHER_EMAIL,' +
//     'P.CONTACT_NO AS PUBLISHER_CONTACT_NO,' +
//     "(P.POSTAL_CODE || ', ' || P.CITY || ', ' || P.COUNTRY) AS PUBLISHER_ADDRESS," +
//     "P.IMAGE AS PUBLISHER_IMAGE,LISTAGG(A.NAME, ', ') WITHIN GROUP (ORDER BY A.NAME) " +
//     'AS AUTHOR_NAME FROM BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)' +
//     ' JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) JOIN AUTHOR A ON (WB.AUTHOR_ID = A.AUTHOR_ID)' +
//     ' where B.ISBN = :ISBN \n' +
//     'GROUP BY B.ISBN,B.TITLE,B.IMAGE,B.NUMBER_OF_PAGES,B.LANGUAGE,' +
//     'B.DESCRIPTION,B.PUBLISHER_ID,P.NAME,P.EMAIL,P.CONTACT_NO,' +
//     "(P.POSTAL_CODE || ', ' || P.CITY || ', ' || P.COUNTRY),P.IMAGE\n";
//   console.log(query);
//   const binds = {};
//   binds.ISBN = context.ISBN;
//   const result = await queryExecute(query, binds);
//   return result.rows;
// }

export async function getAllBookDB() {
  const query = 'SELECT ISBN, TITLE, IMAGE FROM BOOK'+
    '\nORDER BY TITLE ASC';
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}


export async function getBookDB() {
  const query = 'SELECT ISBN, TITLE, IMAGE FROM BOOK';
  console.log(query);
  const result = await queryExecute(query, []);
  return result.rows;
}

// export async function getAllBookSumDB(context) {
//   console.log(context);
//   let query =
//     "SELECT B.ISBN, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, " +
//     "(SELECT MAX(E.PUBLISH_YEAR) FROM EDITION E WHERE E.ISBN = B.ISBN) AS PUBLISH_YEAR, " +
//     "(SELECT LISTAGG(A.NAME, ', ') FROM WRITTEN_BY WB JOIN AUTHOR A ON WB.AUTHOR_ID = A.AUTHOR_ID WHERE WB.ISBN = B.ISBN) AS AUTHORS, " +
//     "NVL(ROUND(AVG(R.RATING), 2), 0) AS RATING, NVL(COUNT(DISTINCT F.USER_ID),0) AS FAVOURITE";
//   if (context.USER_ID) {
//     query += `, CASE WHEN B.ISBN = ANY(SELECT F.ISBN FROM FAVOURITE F WHERE F.USER_ID = ${context.USER_ID}) THEN 1 ELSE 0 END AS IS_FAVOURITE`
//   }
//   query +=
//     '\nFROM BOOK B ' +
//     'LEFT JOIN REVIEW_RATING R ON (B.ISBN = R.ISBN) ' +
//     'LEFT JOIN FAVOURITE F ON(B.ISBN = F.ISBN)';
//   query +=
//     '\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE';
//
//   // Check for sorting and ordering options
//   if (context.sort && context.order) {
//     const validColumns = ['TITLE', 'PAGE', 'LANGUAGE', 'RATING', 'FAVOURITE', 'PUBLISH_YEAR'];
//     const validOrders = ['ASC', 'DESC'];
//
//     if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
//       query += `\nORDER BY ${context.sort} ${context.order}`;
//       if (context.sort !== 'TITLE') {
//         query += ', B.TITLE ASC';
//       }
//     } else {
//       query += '\nORDER BY B.TITLE ASC';
//     }
//   }
//
//   console.log(query);
//   const result = await queryExecute(query, []);
//   return result.rows;
// }

export async function getAllBookSumDB(context) {
  console.log(context);
  let query =
    "SELECT B.ISBN, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, " +
    "(SELECT MAX(E.PUBLISH_YEAR) FROM EDITION E WHERE E.ISBN = B.ISBN) AS PUBLISH_YEAR, " +
    "(SELECT LISTAGG(A.NAME, ', ') FROM WRITTEN_BY WB JOIN AUTHOR A ON WB.AUTHOR_ID = A.AUTHOR_ID WHERE WB.ISBN = B.ISBN) AS AUTHORS, " +
    "NVL(ROUND(AVG(R.RATING), 2), 0) AS RATING, NVL(COUNT(DISTINCT F.USER_ID),0) AS FAVOURITE";
  if (context.USER_ID) {
    query += `, CASE WHEN B.ISBN = ANY(SELECT F.ISBN FROM FAVOURITE F WHERE F.USER_ID = ${context.USER_ID}) THEN 1 ELSE 0 END AS IS_FAVOURITE`
  }
  query +=
    '\nFROM BOOK B ' +
    'LEFT JOIN REVIEW_RATING R ON (B.ISBN = R.ISBN) ' +
    'LEFT JOIN FAVOURITE F ON(B.ISBN = F.ISBN) ';
  query += '\nWHERE 1 = 1 ';
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
  if (context.RATING_START) {
    query += `\nAND B.ISBN IN (SELECT R.ISBN FROM REVIEW_RATING R GROUP BY R.ISBN HAVING NVL(ROUND(AVG(R.RATING), 2), 0) >= ${context.RATING_START})`;
  }
  if (context.RATING_END) {
    query += `\nAND B.ISBN IN (SELECT R.ISBN FROM REVIEW_RATING R GROUP BY R.ISBN HAVING NVL(ROUND(AVG(R.RATING), 2), 0) <= ${context.RATING_END})`;
  }
  query +=
    '\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE';
  // Check for sorting and ordering options
  if (context.sort && context.order) {
    const validColumns = ['TITLE', 'PAGE', 'LANGUAGE', 'RATING', 'FAVOURITE', 'PUBLISH_YEAR'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'TITLE') {
        query += ', B.TITLE ASC';
      }
    } else {
      query += '\nORDER BY B.TITLE ASC';
    }
  }
  let result = null;
  try {
    console.log(query);
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAdvancedSearchedBookDB(context) {
  let query01 =
    'SELECT B.COVER_IMAGE, B.ISBN, B.TITLE, B.DESCRIPTION, B.LANGUAGE, B.NUMBER_OF_PAGES, B.ORIGINAL_PUBLICATION_YEAR, P.NAME FROM ';

  let queryAuthor =
    'SELECT WB.ISBN FROM PERSON PR JOIN AUTHOR A ON (PR.PERSON_ID = A.PERSON_ID) JOIN WRITTEN_BY WB ON (A.PERSON_ID = WB.PERSON_ID)';
  queryAuthor += "\nWHERE UPPER(PR.FIRST_NAME||' '||PR.LAST_NAME) LIKE :AUTHOR";

  let queryGenre = 'SELECT ISBN FROM BOOK_GENRE';
  queryGenre += '\nWHERE GENRE_ID = :GENRE_ID';

  let queryAward = 'SELECT ISBN FROM BOOK_AWARD';
  queryAward += '\nWhere AWARDS = :AWARD';

  let queryRating = 'SELECT B.ISBN FROM BOOK B LEFT JOIN RATING R ON (B.ISBN = R.ISBN)';
  queryRating += '\nGROUP BY B.ISBN';
  queryRating += '\nHAVING NVL(Round(AVG(R.VALUE),2), 0) BETWEEN :RATING_START AND :RATING_END';

  const binds = {};

  query01 += 'BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)';
  query01 += '\nWhere ';
  if (context.TITLE) {
    query01 += 'UPPER(B.TITLE) LIKE :TITLE AND ';
    binds.TITLE = context.TITLE;
  }
  if (context.YEAR_START) {
    query01 += 'B.ORIGINAL_PUBLICATION_YEAR BETWEEN :YEAR_START AND :YEAR_END AND ';
    binds.YEAR_START = Number(context.YEAR_START);
    binds.YEAR_END = Number(context.YEAR_END);
  }
  if (context.PAGE_START) {
    query01 += 'B.NUMBER_OF_PAGES BETWEEN :PAGE_START AND :PAGE_END AND ';
    binds.PAGE_START = Number(context.PAGE_START);
    binds.PAGE_END = Number(context.PAGE_END);
  }
  if (context.LANGUAGE) {
    query01 += 'B.LANGUAGE = :LANGUAGE AND ';
    binds.LANGUAGE = context.LANGUAGE;
  }
  if (context.BINDING) {
    query01 += 'B.BINDING = :BINDING AND ';
    binds.BINDING = context.BINDING;
  }
  if (context.PUBLISHER) {
    query01 += 'UPPER(P.NAME) LIKE :PUBLISHER AND ';
    binds.PUBLISHER = context.PUBLISHER;
  }
  if (context.AUTHOR) {
    query01 += `B.ISBN IN (${queryAuthor}) AND `;
    binds.AUTHOR = context.AUTHOR;
  }
  if (context.GENRE_ID) {
    query01 += `B.ISBN IN (${queryGenre}) AND `;
    binds.GENRE_ID = context.GENRE_ID;
  }
  if (context.AWARD) {
    query01 += `B.ISBN IN (${queryAward}) AND `;
    binds.AWARD = context.AWARD;
  }
  if (context.RATING_START) {
    query01 += `B.ISBN IN (${queryRating}) AND `;
    binds.RATING_START = Number(context.RATING_START);
    binds.RATING_END = Number(context.RATING_END);
  }

  query01 += ' 1=1';

  if (context.SORT) {
    if (context.SORT === 'title') {
      if (context.SORT_TYPE) {
        if (context.SORT_TYPE === 'desc') {
          query01 += '\nORDER BY B.TITLE DESC';
        } else {
          query01 += '\nORDER BY B.TITLE  ASC';
        }
      } else {
        query01 += '\nORDER BY B.TITLE ASC';
      }
    } else if (context.SORT === 'avg') {
      const queryAvg =
        'SELECT T.COVER_IMAGE, T.ISBN, T.TITLE, T.DESCRIPTION, T.LANGUAGE, T.NUMBER_OF_PAGES, T.ORIGINAL_PUBLICATION_YEAR, T.NAME';
      query01 = `${queryAvg}\nFROM (${query01}) T LEFT JOIN RATING R ON (T.ISBN = R.ISBN)`;
      query01 +=
        '\nGROUP BY T.COVER_IMAGE, T.ISBN, T.TITLE, T.DESCRIPTION, T.LANGUAGE, T.NUMBER_OF_PAGES, T.ORIGINAL_PUBLICATION_YEAR, T.NAME';
      if (context.SORT_TYPE) {
        if (context.SORT_TYPE === 'desc') {
          query01 += '\nORDER BY NVL(Round(AVG(R.VALUE),2), 0) DESC';
        } else {
          query01 += '\nORDER BY NVL(Round(AVG(R.VALUE),2), 0)  ASC';
        }
      } else {
        query01 += '\nORDER BY NVL(Round(AVG(R.VALUE),2), 0)  DESC';
      }
    } else if (context.SORT === 'year') {
      if (context.SORT_TYPE) {
        if (context.SORT_TYPE === 'desc') {
          query01 += '\nORDER BY B.ORIGINAL_PUBLICATION_YEAR DESC';
        } else {
          query01 += '\nORDER BY B.ORIGINAL_PUBLICATION_YEAR  ASC';
        }
      } else {
        query01 += '\nORDER BY B.ORIGINAL_PUBLICATION_YEAR  ASC';
      }
    } else if (context.SORT === 'pages') {
      if (context.SORT_TYPE) {
        if (context.SORT_TYPE === 'desc') {
          query01 += '\nORDER BY B.NUMBER_OF_PAGES DESC';
        } else {
          query01 += '\nORDER BY B.NUMBER_OF_PAGES  ASC';
        }
      } else {
        query01 += '\nORDER BY B.NUMBER_OF_PAGES ASC';
      }
    }
  } else {
    query01 += '\nORDER BY B.TITLE ASC';
  }

  console.log(query01);
  console.log(binds);

  let books = await queryExecute(query01, binds);
  books = books.rows;

  for (let i = 0; i < books.length; i++) {
    const binds02 = {
      ISBN: books[i].ISBN,
    };
    const rating = await getAvgRatingDB(binds02);
    books[i].AVG_RATING = rating[0].AVERAGE_RATING;
  }

  return await getAuthorGenreIntoBook(books);
}


export async function getBookByTitleDB(context) {
  let query =
    "SELECT ISBN, TITLE, IMAGE, NUMBER_OF_PAGES, LANGUAGE, DESCRIPTION, PUBLISHER_ID, TO_CHAR(PUBLISH_DATE,'DD-MM-YYYY') AS PUBLISH_DATE";
  query += '\nFROM BOOK ';

  const binds = {};
  binds.Title = context.Title.toUpperCase();
  if (context.Title) {
    query += '\nWhere UPPER(TITLE) LIKE "%:Title%"';
  }
  const result = await queryExecute(query, binds);
  return result.rows;
}

export async function getTopBookDB(context) {
  let query =
    'SELECT ISBN, TITLE, IMAGE, AVERAGE_RATING, RANK() OVER (ORDER BY AVERAGE_RATING DESC NULLS LAST) AS book_rank';
  query +=
    '\nFROM (SELECT B.ISBN AS ISBN, B.TITLE AS TITLE, B.IMAGE AS IMAGE,  NVL(Round(AVG(R.RATING),2), 0) AS AVERAGE_RATING';
  query += '\nFROM BOOK B LEFT JOIN RATING R ON (B.ISBN = R.ISBN)';
  query += '\nGROUP BY B.ISBN, B.TITLE, B.IMAGE';
  query += '\nORDER BY AVERAGE_RATING DESC)';
  query = baseQuery(`(${query})`);
  query += '\nWHERE book_rank <= :COUNT'; // COUNT NEED TO BE DEFINED
  query += '\nORDER BY book_rank, TITLE';
  // console.log(query)
  const result = await queryExecute(query, context);
  return result.rows;
}

export async function getRecentBookDB(context) {
  let query =
    "(SELECT ISBN, TITLE, IMAGE, TO_CHAR(PUBLISH_DATE,'DD-MM-YYYY') AS PUBLISH_DATE FROM BOOK ORDER BY PUBLISH_DATE DESC)";
  query = baseQuery(query);
  query += '\nWHERE ROWNUM <= :COUNT';
  console.log(query);
  const result = await queryExecute(query, context);
  return result.rows;
}

export async function getAvgRatingDB(context) {
  let binds = {};
  binds.ISBN = context.ISBN;
  let query =
    'SELECT NVL(Round(AVG(RATING),2), 0) AS AVG_RATING FROM REVIEW_RATING' +
    '\nWHERE ISBN = :ISBN';
  console.log(query)
  let result;
  try {
    result = await queryExecute(query, binds);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function getAllGenreDB() {
  let query = baseQuery('GENRE');
  query += '\nORDER BY GENRE_NAME ASC';

  const result = await queryExecute(query);
  return result.rows;
}

export async function getAllAuthorsDB() {
  let query = "SELECT AUTHOR_ID, (P.FIRST_NAME||' '||P.LAST_NAME) AS AUTHOR_NAME FROM AUTHOR";
  query += '\nORDER BY AUTHOR_NAME ASC';

  const result = await queryExecute(query);
  return result.rows;
}

export async function getAllPublishersDB() {
  let query = 'Select PUBLISHER_ID, NAME FROM PUBLISHER';
  query += '\nORDER BY NAME ASC';

  const result = await queryExecute(query);
  return result.rows;
}

export async function getAllLanguagesDB() {
  let query = 'SELECT LANGUAGE FROM BOOK GROUP BY LANGUAGE';
  query += '\nORDER BY LANGUAGE ASC';
  let result = null;
  try {
    result = await queryExecute(query);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getAuthorDB(context) {
  let query = baseQuery('AUTHOR');
  if (context.AUTHOR_ID) {
    query += `\nWHERE AUTHOR_ID = ${context.AUTHOR_ID}`;
  }
  const result = await queryExecute(query, []);
  return result.rows;
}

export async function getPublisherDB(context) {
  let query = '';
  query += baseQuery('PUBLISHER');
  if (context.PUBLISHER_ID) {
    query += `\nWhere PUBLISHER_ID = ${context.PUBLISHER_ID}`;
  }
  const result = await queryExecute(query, []);
  return result.rows;
}

export async function getMyMessagesDB(context) {
  // get all messages of a user
  let query = baseQuery('MESSAGE') +
    `\nWHERE USER_ID = ${context.USER_ID}` +
    '\nORDER BY Message_Date DESC';
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAllNewsDB(context) {
  // get all messages of a user
  let query = baseQuery('NEWS') +
    '\nORDER BY News_Date DESC';
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}

export async function getAllUsersDB(context) {
  // get all messages of a user
  let query = "SELECT USER_ID, (FIRST_NAME || ' ' || LAST_NAME) AS NAME, IMAGE, ADDRESS, EMAIL, CONTACT_NO, GENDER" +
    '\nFROM "USER"';
  let flag = 1;
  if (context.sort && context.order) {
    const validColumns = ['USER_ID', 'NAME', 'EMAIL'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'NAME') {
        query += ', NAME ASC';
      }
      flag = 0;
    }
  }
  if (flag) {
    query += '\nORDER BY NAME ASC';
  }

  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (err) {
    return [];
  }
  return result.rows;
}


export async function getMyRequestsDB(context) {
  let query = 'SELECT B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, R.REQUEST_DATE ' +
    '\nFROM REQUEST R JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)';
  if (context.USER_ID) {
    query +=
      `\nWHERE R.USER_ID = ${context.USER_ID}`;
  }
  let flag = 1;
  if (context.sort && context.order) {
    const validColumns = ['TITLE', 'EDITION_NUM', 'REQUEST_DATE'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'REQUEST_DATE') {
        query += ', REQUEST_DATE ASC';
      }
      flag = 0;
    }
  }
  if (flag) {
    query += '\nORDER BY REQUEST_DATE ASC';
  }

  const result = await queryExecute(query, []);
  return result.rows;
}


export async function getAllRequestsDB(context) {
  let query = `SELECT (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, R.USER_ID, U.EMAIL, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, E.NUM_OF_COPIES, R.REQUEST_DATE` +
    '\nFROM REQUEST R JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)  JOIN "USER" U ON(R.USER_ID = U.USER_ID)';
  // if (context.USER_ID) {
  //   query += `\nWHERE R.USER_ID <> ${context.USER_ID}`
  // }
  let flag = 1;
  if (context.sort && context.order) {
    const validColumns = ['TITLE', 'EDITION_NUM', 'REQUEST_DATE', 'NUM_OF_COPIES', 'EMAIL'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'REQUEST_DATE') {
        query += ', REQUEST_DATE ASC';
      }
      flag = 0;
    }
  }
  if (flag) {
    query += '\nORDER BY REQUEST_DATE ASC';
  }

  const result = await queryExecute(query, []);
  return result.rows;
}


export async function getMyRentHistoryDB(context) {
  let query = 'SELECT RENT_HISTORY_ID, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, RENT_DATE, RETURN_DATE, STATUS' +
    '\nFROM RENT_HISTORY R JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)' +
    `\nWHERE R.USER_ID = ${context.USER_ID}`;
  let flag = 1;
  if (context.sort && context.order) {
    const validColumns = ['TITLE', 'EDITION_NUM', 'RENT_DATE', 'STATUS'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'TITLE') {
        query += ', TITLE ASC';
      }
      flag = 0;
    }
  }
  if (flag) {
    query += '\nORDER BY TITLE ASC';
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
  let query = 'SELECT F.RENT_HISTORY_ID, B.ISBN, B.TITLE, R.EDITION_ID, E.EDITION_NUM, START_DATE, PAYMENT_DATE, FEE_AMOUNT' +
    '\nFROM FINE_HISTORY F LEFT JOIN RENT_HISTORY R ON(R.RENT_HISTORY_ID = F.RENT_HISTORY_ID) LEFT JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)';
  if (context.USER_ID) {
    query +=
      `\nWHERE R.USER_ID = ${context.USER_ID}`;
  }
  if (context.CHECK) {
    query += ' AND F.PAYMENT_DATE IS NULL';
  }
  let flag = 1;
  if (context.sort && context.order) {
    const validColumns = ['TITLE', 'EDITION_NUM', 'START_DATE', 'PAYMENT_DATE', 'FEE_AMOUNT'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'TITLE') {
        query += ', TITLE ASC';
      }
      flag = 0;
    }
  }
  if (flag) {
    query += '\nORDER BY TITLE ASC';
  }
  console.log(query)
  let result = [];
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return [];
  }
  return result.rows;
}

export async function getRunningFineDB(context) {
  let query = "SELECT F.RENT_HISTORY_ID, U.USER_ID, U.EMAIL, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, B.ISBN, B.TITLE, R.EDITION_ID, START_DATE, PAYMENT_DATE, FEE_AMOUNT" +
    '\nFROM FINE_HISTORY F LEFT JOIN RENT_HISTORY R ON(R.RENT_HISTORY_ID = F.RENT_HISTORY_ID) ' +
    'LEFT JOIN "USER" U ON(U.USER_ID = R.USER_ID) LEFT JOIN EDITION E ON(R.EDITION_ID = E.EDITION_ID) JOIN BOOK B ON(E.ISBN = B.ISBN)';
  if (context.CHECK) {
    query += '\nWHERE F.PAYMENT_DATE IS NULL';
  }
  let flag = 1;
  if (context.sort && context.order) {
    const validColumns = ['EMAIL', 'NAME', 'START_DATE', 'FEE_AMOUNT', 'TITLE', 'PAYMENT_DATE'];
    const validOrders = ['ASC', 'DESC'];

    if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
      query += `\nORDER BY ${context.sort} ${context.order}`;
      if (context.sort !== 'FEE_AMOUNT') {
        query += ', FEE_AMOUNT DESC';
      }
      flag = 0;
    }
  }
  if (flag) {
    query += '\nORDER BY FEE_AMOUNT DESC';
  }
  console.log(query)
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

export async function updateEditionDB(context) {
  let query = runProcedure(`UPDATE_EDITION('${context.EDITION_ID}', ${context.EDITION_NUM}, ${context.NUM_OF_COPIES}, ${context.PUBLISH_YEAR})`);

  const query1 = baseQuery('EDITION') +
    `\nWHERE EDITION_ID = '${context.EDITION_ID}'`;
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


export async function getUserRatedBooksDB(context) {
  let query = baseQuery('BOOK B JOIN RATING R ON(B.ISBN=R.ISBN)');
  query += '\nWHERE R.USER_ID = :USER_ID';

  const result = await queryExecute(query, context);
  return result.rows;
}

export async function getUserReviewedBooksDB(context) {
  let query = baseQuery('BOOK B JOIN REVIEW R ON(B.ISBN=R.ISBN)');
  query += '\nWHERE R.USER_ID = :USER_ID';

  const result = await queryExecute(query, context);
  return result.rows;
}

export async function getAuthorBooksDB(context) {
  let query = 'SELECT B.ISBN AS ISBN, B.IMAGE AS IMAGE, B.TITLE AS TITLE';
  query += 'FROM BOOK B JOIN WRITTEN_BY WB ON(B.ISBN=WB.ISBN)';
  query += '\nWHERE WB.USER_ID = :USER_ID';

  const result = await queryExecute(query, context);
  return result.rows;
}

export async function getPublisherBooksDB(context) {
  let query = 'SELECT ISBN, IMAGE, TITLE';
  query += '\nFROM BOOK';
  query += '\nWHERE PUBLISHER_ID = :PUBLISHER_ID';

  console.log(context);

  const result = await queryExecute(query, context);
  return result.rows;
}

export async function getGenreBookDB(context) {
  let query = 'SELECT B.ISBN AS ISBN, B.IMAGE AS IMAGE, B.TITLE AS TITLE';
  query +=
    '\nBOOK B JOIN BOOK_GENRE BG ON(B.ISBN = BG.ISBN) JOIN GENRE G ON(BG.GENRE_ID = G.GENRE_ID)';
  const binds = {};

  if (context.ID) {
    binds.ID = context.ID;
    query += '\nWHERE G.GENRE_ID = :ID';
  } else if (context.name) {
    binds.name = context.name.toUpperCase();
    query += '\nWHERE UPPER(GENRE_NAME) = :name';
  }

  const result = await queryExecute(query, binds);
  return result.rows;
}

export async function getRatingDB(rate) {
  const rateDB = {...rate};
  let query = 'SELECT RATING FROM RATING';
  query += '\nWhere USER_ID = :USER_ID AND ISBN = :ISBN';
  console.log(query);
  const result = await queryExecute(query, rateDB);
  return result.rows;
}

export async function getFavouriteDB(fav) {
  const favDB = {...fav};
  let query = 'SELECT * FROM FAVOURITE';
  query += '\nWhere USER_ID = :USER_ID AND ISBN = :ISBN';
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, favDB);
  } catch (e) {
    return null;
  }
  return result.rows;
}


export async function getOwnRatRevDB(context) {
  console.log(context);
  let query = `SELECT U.USER_ID,
                             (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME,
                             U.IMAGE,
                             R.RATING,
                             R.REVIEW,
                             R.EDIT_DATE` +
    `\nFROM "USER" U JOIN REVIEW_RATING R ON (U.USER_ID = R.USER_ID)` +
    `\nWHERE R.ISBN = '${context.ISBN}' AND U.USER_ID = ${context.USER_ID}`;
  console.log(query);
  let result
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null
  }
  return result.rows;
}

export async function getGenreDB(context) {
  let query = baseQuery('GENRE');

  if (context.GENRE_ID) {
    query += `\nWhere GENRE_ID = ${context.GENRE_ID}`;
  }
  const result = await queryExecute(query, []);
  return result.rows;
}


export async function getAllRatRevOfBookDB(context) {
  console.log(context);
  let query = '';
  let query1 = '';
  let result, result1;
  if (context.USER_ID) {
    query1 = `SELECT U.USER_ID,
                             (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME,
                             U.IMAGE,
                             R.RATING,
                             R.REVIEW,
                             R.EDIT_DATE` +
      `\n FROM "USER" U JOIN REVIEW_RATING R ON (U.USER_ID = R.USER_ID)` +
      `\nWHERE R.ISBN = ${context.ISBN} AND U.USER_ID = ${context.USER_ID}`;
  }
  query =
    "SELECT U.USER_ID, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, U.IMAGE, R.RATING, R.REVIEW, R.EDIT_DATE" +
    `\nFROM REVIEW_RATING R JOIN "USER" U ON (U.USER_ID = R.USER_ID)` +
    `\nWHERE R.ISBN = ${context.ISBN}`;
  if (context.USER_ID) {
    query += ` AND U.USER_ID <> ${context.USER_ID}` +
      '\nORDER BY R.EDIT_DATE DESC';
  } else {
    query += '\nORDER BY R.EDIT_DATE DESC';
  }
  // console.log(query);
  // console.log(query1);
  result = await queryExecute(query, []);
  if (context.USER_ID) result1 = await queryExecute(query1, []);
  return {allRatRev: result.rows, myRatRev: result1?.rows || []};
}


export async function getCompleteBookDB(context) {
  let query = 'SELECT * FROM BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)';
  const binds = {};

  if (context.ISBN) {
    binds.ISBN = context.ISBN;
    query += '\nWHERE B.ISBN = :ISBN';
  }

  let books = await queryExecute(query, binds);
  books = books.rows;
  console.log(books);
  return await getAuthorGenreIntoBook(books);
}

export async function rateBookDB(rate) {
  const rateDB = {...rate};
  const query = runProcedure('RATE(:PERSON_ID, :ISBN, :VALUE)');

  const result = await queryExecute(query, rateDB);

  return rateDB;
}


export async function getAllBindsDB() {
  let query = 'SELECT BINDING FROM BOOK GROUP BY BINDING';
  query += '\nORDER BY BINDING ASC';

  const result = await queryExecute(query);
  return result.rows;
}

export async function getAllAwardsDB() {
  let query = 'SELECT AWARDS FROM BOOK_AWARD GROUP BY AWARDS';
  query += '\nORDER BY AWARDS ASC';

  const result = await queryExecute(query);
  return result.rows;
}

export async function ratrevBookDB(ratRev) {
  const ratrevDB = {...ratRev};
  const query = runProcedure('EDIT_REVIEW_RATING(:ISBN, :USER_ID, :RATING, :REVIEW)');
  console.log(query)
  let result;
  try {
    result = await queryExecute(query, ratrevDB);
  } catch (e) {
    return null
  }
  return ratrevDB;
}

export async function postFavouriteDB(review) {
  console.log(review);
  const reviewDB = {...review};
  const query = runProcedure('POST_FAVOURITE(:ISBN, :USER_ID)');
  try {
    const result = await queryExecute(query, reviewDB);
  } catch (e) {
    return null;
  }
  return reviewDB;
}


export async function getBookshelvesDB(bookshelves) {
  const bookshelvesDB = {};
  bookshelvesDB.PERSON_ID = bookshelves.PERSON_ID;
  let query = baseQuery('BOOKSHELF');
  query += '\nWhere PERSON_ID = :PERSON_ID';

  if (bookshelves.BOOKSHELF_ID) {
    bookshelvesDB.BOOKSHELF_ID = bookshelves.BOOKSHELF_ID;
    query += ' AND BOOKSHELF_ID = :BOOKSHELF_ID';
  }

  const result = await queryExecute(query, bookshelvesDB);
  return result.rows;
}

export async function getBookFromBookshelfDB(book) {
  const bookDB = {...book};
  let query =
    'Select B.ISBN, B.TITLE, B.COVER_IMAGE FROM BOOKSHELF BS join BOOKSHELF_CONTENT BC ON(BS.BOOKSHELF_ID = BC.BOOKSHELF_ID) JOIN BOOK B ON(BC.ISBN = B.ISBN)';
  query += '\nWhere BS.PERSON_ID = :PERSON_ID AND BS.BOOKSHELF_ID = :BOOKSHELF_ID';
  query += '\nORDER BY B.TITLE';

  const result = await queryExecute(query, bookDB);
  return result.rows;
}

export async function findPersonDB(P_ID) {
  let query = baseQuery('"PERSON"');
  const binds = {};
  binds.PERSON_ID = P_ID;

  query += '\nWhere PERSON_ID = :PERSON_ID';
  const result = await queryExecute(query, binds);
  return result.rows;
}

export async function getSearchedBookDB(context) {
  // let query = "SELECT B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME) AS AUTHOR_NAME from BOOK B join PUBLISHER P ON(B.PUBLISHER_ID = P.PUBLISHER_ID) JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) JOIN AUTHOR A ON (WB.PERSON_ID = A.PERSON_ID) JOIN PERSON PR ON (A.PERSON_ID = PR.PERSON_ID) JOIN BOOK_GENRE BG ON (B.ISBN = BG.ISBN) JOIN GENRE G ON (BG.GENRE_ID = G.GENRE_ID)";
  // let groupByString = " GROUP BY B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME)";

  let query01 =
    'SELECT B.COVER_IMAGE, B.ISBN, B.TITLE, B.DESCRIPTION, B.LANGUAGE, B.NUMBER_OF_PAGES, B.ORIGINAL_PUBLICATION_YEAR, P.NAME FROM ';

  const binds = {
    SEARCH_TEXT: context.SEARCH_TEXT,
  };

  if (context.CONSTRAINT === 'Title') {
    query01 += 'BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)';
    query01 += '\nWhere UPPER(B.TITLE) LIKE :SEARCH_TEXT';
    query01 += '\nOrder by B.TITLE ASC';
  } else if (context.CONSTRAINT === 'Author') {
    query01 +=
      'PERSON PR JOIN AUTHOR A ON (PR.PERSON_ID = A.PERSON_ID) JOIN WRITTEN_BY WB ON (A.PERSON_ID = WB.PERSON_ID) JOIN BOOK B ON (B.ISBN = WB.ISBN) JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)';
    query01 += "\nWhere UPPER(PR.FIRST_NAME||' '||PR.LAST_NAME) LIKE :SEARCH_TEXT";
    query01 += '\nOrder by B.TITLE ASC';
  } else if (context.CONSTRAINT === 'Genre') {
    query01 +=
      'BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID) JOIN BOOK_GENRE BG ON(B.ISBN = BG.ISBN) JOIN GENRE G ON (BG.GENRE_ID = G.GENRE_ID)';
    query01 += '\nWhere UPPER(G.GENRE_NAME) LIKE :SEARCH_TEXT';
    query01 += '\nOrder by B.TITLE ASC';
  } else if (context.CONSTRAINT === 'Publisher') {
    query01 += 'BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)';
    query01 += '\nWhere UPPER(P.NAME) LIKE :SEARCH_TEXT';
    query01 += '\nOrder by B.TITLE ASC';
  }

  let books = await queryExecute(query01, binds);
  books = books.rows;

  for (let i = 0; i < books.length; i++) {
    const binds02 = {
      ISBN: books[i].ISBN,
    };
    const rating = await getAvgRatingDB(binds02);
    books[i].AVG_RATING = rating[0].AVERAGE_RATING;
  }

  return await getAuthorGenreIntoBook(books);
}

async function getAuthorGenreIntoBook(books) {
  let query02 =
    "SELECT PR.FIRST_NAME||' '||PR.LAST_NAME AS AUTHOR_NAME, PR.PERSON_ID AS AUTHOR_ID ";
  query02 +=
    'FROM WRITTEN_BY WB JOIN AUTHOR A ON(WB.PERSON_ID = A.PERSON_ID) JOIN PERSON PR ON(A.PERSON_ID = PR.PERSON_ID)';
  const query03 =
    'SELECT G.GENRE_NAME FROM GENRE G JOIN BOOK_GENRE BG ON(G.GENRE_ID = BG.GENRE_ID)';

  for (let i = 0; i < books.length; i++) {
    const queryAuthor = `${query02}\nWHERE WB.ISBN = :ISBN`;
    const queryGenre = `${query03}\nWHERE BG.ISBN = :ISBN`;
    const binds02 = {
      ISBN: books[i].ISBN,
    };
    const authors = await queryExecute(queryAuthor, binds02);
    const genres = await queryExecute(queryGenre, binds02);
    books[i].AUTHORS = authors.rows;
    books[i].GENRES = genres.rows;
  }
  return books;
}

// export async function getSearchedBookDB(context){
//     let query = "SELECT B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME) AS AUTHOR_NAME from BOOK B join PUBLISHER P ON(B.PUBLISHER_ID = P.PUBLISHER_ID) JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) JOIN AUTHOR A ON (WB.PERSON_ID = A.PERSON_ID) JOIN PERSON PR ON (A.PERSON_ID = PR.PERSON_ID) JOIN BOOK_GENRE BG ON (B.ISBN = BG.ISBN) JOIN GENRE G ON (BG.GENRE_ID = G.GENRE_ID)";
//     let groupByString = " GROUP BY B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME)";

//     const binds = {
//         SEARCH_TEXT: context.SEARCH_TEXT
//     };

//     if(context.CONSTRAINT === 'Title'){
//         console.log('at title');
//         query += "\nWhere UPPER(B.TITLE) LIKE :SEARCH_TEXT";

//     }else if(context.CONSTRAINT === 'Author'){
//         console.log('at author');
//         query += "\nWhere UPPER(PR.FIRST_NAME||' '||PR.LAST_NAME) LIKE :SEARCH_TEXT";

//     }else if(context.CONSTRAINT === 'Genre'){
//         console.log('at genre');
//         query += "\nWhere UPPER(G.GENRE_NAME) LIKE :SEARCH_TEXT";

//     }else if(context.CONSTRAINT === 'Publisher'){
//         console.log('at publisher');
//         query += "\nWhere UPPER(P.NAME) LIKE :SEARCH_TEXT";

//     }
//     query += groupByString;
//     const result = await queryExecute(query, binds);
//     return result.rows;
// }

export async function createBookDB(book) {
  const bookDB = {...book};
  const query = runProcedure('INSERT_BOOK(:ISBN, :TITLE, :IMAGE, :NUMBER_OF_PAGES, INITCAP(LOWER(:LANGUAGE)), :DESCRIPTION, :PUBLISHER_ID)');
  try {
    await queryExecute(query, bookDB);
  } catch
    (e) {
    return null;
  }
  return bookDB;
}

// export async function getAuthorDB(context){
//     let queryPerson = baseQuery("Person");
//     let queryAuthor = baseQuery("Author");
//     const binds = {};

//     if(context.ID){
//         binds.ID = context.ID;
//         queryPerson += "\nWhere Person_ID = :ID\nAnd Exists(" + queryAuthor + "\nWhere Person_ID = :ID)";

//     }

//     const result = await queryExecute(queryPerson, binds);
//     return result.rows;
// }

export async function deleteBookOfBookshelfDB(context) {
  let query = 'delete from BOOKSHELF_CONTENT';
  console.log(context);
  query += '\nwhere ISBN = :ISBN AND BOOKSHELF_ID = :BOOKSHELF_ID';

  const result = await queryExecute(query, context);
  return result;
}

export async function deleteRatRevBookDB(context) {
  let query = runProcedure('DELETE_REVIEW_RATING(:ISBN, :USER_ID)');
  console.log(context);
  let result;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null
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
    return null
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
    return null
  }
  return context;
}

export async function addRentHistoryDB(context) {
  const binds = {
    USER_ID: context.USER_ID,
    EDITION_ID: context.EDITION_ID,
    RETURN_DATE: context.RETURN_DATE
  }
  let query = runProcedure(`INSERT_RENT_HISTORY(:USER_ID, :EDITION_ID, :RETURN_DATE)`);
  console.log(query);
  let result = null;
  try {
    result = await queryExecute(query, binds);
  } catch (e) {
    return null
  }
  return context;
}

export async function getEditionDB(context) {
  let query = baseQuery('EDITION');
  if (context.ISBN && context.EDITION_ID) {
    query += `\nWhere ISBN = '${context.ISBN}'`;
    query += ` And EDITION_ID = '${context.EDITION_ID}'`;
  } else if (context.ISBN) {
    query += `\nWhere ISBN = '${context.ISBN}'`;
  } else if (context.EDITION_ID) {
    query += `\nWhere EDITION_ID = '${context.EDITION_ID}'`;
  } else {
    return []
  }
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
    return null
  }
  return context;
}

export async function updateMessageDB(context) {
  let query = runProcedure(`UPDATE_MESSAGE(${context.USER_ID})`)
  console.log(context);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null
  }
  return context;
}

export async function deleteMessageDB(context) {
  let query = runProcedure(`DELETE_MESSAGE(${context.USER_ID}, ${context.MESSAGE_ID})`)
  console.log(context);
  let result = null;
  try {
    result = await queryExecute(query, []);
  } catch (e) {
    return null
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
    return null
  }
  return context;
}

export async function deleteAllBooksBookshelfDB(context) {
  let query = 'delete from BOOKSHELF_CONTENT';
  console.log(context);
  query += '\nwhere BOOKSHELF_ID = :BOOKSHELF_ID';

  const result = await queryExecute(query, context);
  return result;
}

export async function deleteBookshelfDB(context) {
  let query = 'delete from BOOKSHELF';
  console.log(context);
  query += '\nwhere BOOKSHELF_ID = :BOOKSHELF_ID';

  const result = await queryExecute(query, context);
  return result;
}

export async function addBookDB(book) {
  const procedure =
    'INSERT_BOOK(:ISBN, :TITLE, :COVER_IMAGE, :BINDING, :NUMBER_OF_PAGES, :ORIGINAL_PUBLICATION_YEAR, :LANGUAGE, :DESCRIPTION, :SUMMARY, :PUBLISHER_ID, :PUBLICATION_DATE)';
  const query = runProcedure(procedure);
  const result = await queryExecute(query, book);
  return book;
}

export async function addBookAwardDB(bookAward) {
  const procedure = 'INSERT_BOOK_AWARD(:ISBN, :AWARDS)';
  const query = runProcedure(procedure);
  const result = await queryExecute(query, bookAward);
  return bookAward;
}

export async function addWrittenByDB(bookAuthor) {
  const query = runProcedure('INSERT_WRITTEN_BY(:ISBN, :AUTHOR_ID)');
  console.log(bookAuthor);
  try {
    console.log(query);
    // console.log(query1);
    await queryExecute(query, bookAuthor);
    // result = await queryExecute(query1, binds);
  } catch (e) {
    return null;
  }
  return bookAuthor;
}

export async function addBookGenreDB(bookGenre) {
  const query = runProcedure('INSERT_BOOK_GENRE(:ISBN, :GENRE_ID)');
  console.log(bookGenre);
  try {
    console.log(query);
    // console.log(query1);
    await queryExecute(query, bookGenre);
    // result = await queryExecute(query1, binds);
  } catch (e) {
    return null;
  }
  return bookGenre;
}


export async function updateBookDB(context) {
  const query = runProcedure('UPDATE_BOOK(:ISBN, :TITLE, :IMAGE, :NUMBER_OF_PAGES, INITCAP(LOWER(:LANGUAGE)), :DESCRIPTION, :PUBLISHER_ID)');
  try {
    await queryExecute(query, context);
  } catch
    (e) {
    return null;
  }
  return context;
}

export async function deleteBookDB(context) {
  const query = runProcedure('DELETE_BOOK(:ISBN)');
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteBookGenreDB(context) {
  const query = runProcedure('DELETE_BOOK_GENRE(:ISBN)');
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function deleteWittenByDB(context) {
  const query = runProcedure('DELETE_WRITTEN_BY(:ISBN)');
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

// export async function getAuthorDB(context){
//     /* let queryPerson = baseQuery("Person");
//     let queryAuthor = baseQuery("Author");
//     const binds = {};

//     if(context.ID){
//         binds.ID = context.ID;
//         queryPerson += "\nWhere Person_ID = :ID\nAnd Exists(" + queryAuthor + "\nWhere Person_ID = :ID)";

//     } */

//     let query = "";
//     const binds = {};
//     if(context.PERSON_ID) {
//         binds.PERSON_ID = context.PERSON_ID;
//         query += "SELECT * FROM PERSON P JOIN AUTHOR A ON (P.PERSON_ID = A.PERSON_ID) WHERE (P.PERSON_ID = :PERSON_ID AND EXISTS (SELECT * FROM AUTHOR AB WHERE AB.PERSON_ID = :PERSON_ID))";
//     }

//     const result = await queryExecute(query, binds);
//     return result.rows;
// }

export async function updateAuthorDB(author) {
  const query = runProcedure('UPDATE_AUTHOR(:AUTHOR_ID, :NAME, :DoB, :DoD, :NATIONALITY, :BIO, :IMAGE)');

  let result = null;
  try {
    result = await queryExecute(query, author);
  } catch (e) {
    return null;
  }

  return author;
}

export async function addAuthorDB(author) {
  console.log(author);
  const binds = {
    NAME: author.NAME,
    DoB: author.DoB
  }
  const query = runProcedure('INSERT_AUTHOR(:NAME, :DoB, :DoD, :NATIONALITY, :BIO, :IMAGE)');
  const query1 = baseQuery('AUTHOR') +
    `\nWHERE (UPPER(NAME) = UPPER(:NAME) AND DoB = :DoB)`;
  let result = null;
  try {
    console.log(author);
    console.log(query);
    console.log(query1);

    await queryExecute(query, author);
    result = await queryExecute(query1, binds);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function deleteAuthorDB(context) {
  const query = runProcedure('DELETE_AUTHOR(:AUTHOR_ID)');
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function addPublisherDB(publisher) {
  const query = runProcedure('INSERT_PUBLISHER(:NAME ,:IMAGE ,:CITY ,:COUNTRY ,:POSTAL_CODE ,:CONTACT_NO ,LOWER(:EMAIL))');
  const query1 = baseQuery('PUBLISHER') +
    `\nWHERE LOWER(EMAIL) = LOWER('${publisher.EMAIL}')`;
  let result = null;

  try {
    console.log(publisher);
    console.log(query);
    console.log(query1);
    await queryExecute(query, publisher);
    result = await queryExecute(query1, []);
    console.log(result);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

// export async function getPublisherDB(context) {
//     let query = baseQuery("PUBLISHER");
//     const binds = {};

//     if(context.PUBLISHER_ID){
//         binds.PUBLISHER_ID = context.PUBLISHER_ID;
//         query += "\nWhere PUBLISHER_ID = :PUBLISHER_ID";
//     }
//     const result = await queryExecute(query, binds);
//     return result.rows;
// }

export async function updatePublisherDB(publisher) {
  const query = runProcedure('UPDATE_PUBLISHER(:PUBLISHER_ID, :NAME ,:IMAGE ,:CITY ,:COUNTRY ,:POSTAL_CODE ,:CONTACT_NO ,LOWER(:EMAIL))');

  let result = null;
  try {
    result = await queryExecute(query, publisher);
  } catch (e) {
    return null;
  }
  return publisher;
}

export async function deletePublisherDB(context) {
  const query = runProcedure('DELETE_PUBLISHER(:PUBLISHER_ID)');
  let result = null;
  try {
    result = await queryExecute(query, context);
  } catch (e) {
    return null;
  }
  return context;
}

export async function addGenreDB(genre) {
  const query = runProcedure('INSERT_GENRE(INITCAP(LOWER(:GENRE_NAME)))');
  const query1 = baseQuery('GENRE') +
    `\nWHERE UPPER(GENRE_NAME) = UPPER('${genre.GENRE_NAME}')`;
  let result = null;
  try {
    console.log(genre);
    console.log(query);
    console.log(query1);
    await queryExecute(query, genre);
    result = await queryExecute(query1, []);
  } catch (e) {
    return null;
  }
  return result.rows[0];
}

export async function addEditionDB(edition) {
  const query = runProcedure(`INSERT_EDITION('${edition.ISBN}', ${edition.EDITION_NUM}, ${edition.NUM_OF_COPIES}, ${edition.PUBLISH_YEAR})`);
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
  const query = runProcedure('UPDATE_GENRE(:GENRE_ID, :GENRE_NAME)');
  let result = null;
  try {
    result = await queryExecute(query, genre);
  } catch (e) {
    return null;
  }
  return genre;
}

export async function deleteGenreDB(genre) {
  const query = runProcedure('DELETE_GENRE(:GENRE_ID)');
  let result = null;
  try {
    result = await queryExecute(query, genre);
  } catch (e) {
    return null;
  }
  return genre;
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

export async function updateAdminDB(context) {
  const query = runProcedure(
    'UPDATE_ADMIN(:PERSON_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS)'
  );

  const result = await queryExecute(query, context);
  return result;
}

export async function reviewRateBookDB(review) {
  const reviewDB = {...review};
  const query = runProcedure('REVIEW_POST(:USER_ID, :ISBN, :REVIEW, :RATING)');

  const result = await queryExecute(query, reviewDB);

  return reviewDB;
}

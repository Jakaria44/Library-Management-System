import {queryExecute} from './database.js';

function baseQuery(tableName) {
    return `Select *
            From ${tableName}`;
}

function runProcedure(procedure) {
    return `Begin\n${procedure};\nEnd;`;
}


export async function updateUserDB(context) {
  const query = runProcedure(  'UPDATE_USER(:USER_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :CONTACT_NO, :IMAGE, :GENDER, :PASSWORD)'  );
  let result =  null;
  try {

    result = await queryExecute(query, context);
  } catch (err) {
    return null;
  }
  return result;
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
        console.log('exec postUserDB');
        return user;
    } catch (err) {
        return err;
    }
}

export async function findUserDB(user) {
    let query = baseQuery('"USER"');
    const binds = {};
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
        "P.PUBLISHER_ID, P.NAME AS PUBLISHER_NAME, B.TITLE, B.IMAGE, B.PUBLISH_YEAR, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, " +
        "NVL(ROUND(AVG(R.RATING), 2), 0) AS RATING, NVL(COUNT(F.USER_ID), 0) AS FAVOURITE";
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
        "\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, P.PUBLISHER_ID, P.NAME, B.PUBLISH_YEAR, B.NUMBER_OF_PAGES, B.LANGUAGE";
    console.log(query);
    const result = await queryExecute(query, []);
    return result.rows;
}

// export async function getBookDetailsByIDDB(context) {
//   console.log(context);
//   const query = 'SELECT B.ISBN,B.TITLE,B.IMAGE,B.NUMBER_OF_PAGES,B.LANGUAGE,B.PUBLISH_YEAR,'+
//     'B.DESCRIPTION,B.PUBLISHER_ID,P.NAME AS PUBLISHER_NAME,P.EMAIL AS PUBLISHER_EMAIL,' +
//     'P.CONTACT_NO AS PUBLISHER_CONTACT_NO,' +
//     "(P.POSTAL_CODE || ', ' || P.CITY || ', ' || P.COUNTRY) AS PUBLISHER_ADDRESS," +
//     "P.IMAGE AS PUBLISHER_IMAGE,LISTAGG(A.NAME, ', ') WITHIN GROUP (ORDER BY A.NAME) " +
//     'AS AUTHOR_NAME FROM BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)' +
//     ' JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) JOIN AUTHOR A ON (WB.AUTHOR_ID = A.AUTHOR_ID)' +
//     ' where B.ISBN = :ISBN \n' +
//     'GROUP BY B.ISBN,B.TITLE,B.IMAGE,B.NUMBER_OF_PAGES,B.LANGUAGE,B.PUBLISH_YEAR,' +
//     'B.DESCRIPTION,B.PUBLISHER_ID,P.NAME,P.EMAIL,P.CONTACT_NO,' +
//     "(P.POSTAL_CODE || ', ' || P.CITY || ', ' || P.COUNTRY),P.IMAGE\n";
//   console.log(query);
//   const binds = {};
//   binds.ISBN = context.ISBN;
//   const result = await queryExecute(query, binds);
//   return result.rows;
// }

export async function getAllBookDB() {
    const query = 'SELECT ISBN, TITLE, IMAGE FROM BOOK';
    console.log(query);
    const result = await queryExecute(query, []);
    return result.rows;
}


export async function getBookDB() {
    const query = 'SELECT ISBN, TITLE, IMAGE FROM BOOK';
    console.log(query);
    const result = await queryExecute(query, []);
    return result.rows;
}

export async function getAllBookSumDB(context) {
    console.log(context);
    let query =
        "SELECT B.ISBN, B.TITLE, B.IMAGE, B.PUBLISH_YEAR, B.NUMBER_OF_PAGES AS PAGE, B.LANGUAGE, LISTAGG(A.NAME, ', ') AS AUTHORS, NVL(ROUND(AVG(R.RATING), 2), 0) AS RATING, NVL(COUNT(F.USER_ID),0) AS FAVOURITE";
    if (context.USER_ID) {
        query += `, CASE WHEN B.ISBN = ANY(SELECT F.ISBN FROM FAVOURITE F WHERE F.USER_ID = ${context.USER_ID}) THEN 1 ELSE 0 END AS IS_FAVOURITE`
    }
    query +=
        '\nFROM BOOK B LEFT JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) LEFT JOIN AUTHOR A ON (WB.AUTHOR_ID = A.AUTHOR_ID) LEFT JOIN REVIEW_RATING R ON (B.ISBN = R.ISBN) LEFT JOIN FAVOURITE F ON(B.ISBN = F.ISBN)';
    query +=
        '\nGROUP BY B.ISBN, B.TITLE, B.IMAGE, B.PUBLISH_YEAR, B.NUMBER_OF_PAGES, B.LANGUAGE';

    // Check for sorting and ordering options
    if (context.sort && context.order) {
        const validColumns = ['TITLE', 'PUBLISH_YEAR', 'PAGE', 'LANGUAGE', 'RATING', 'FAVOURITE'];
        const validOrders = ['ASC', 'DESC'];

        if (validColumns.includes(context.sort) && validOrders.includes(context.order)) {
            query += `\nORDER BY ${context.sort} ${context.order}`;
            if (context.sort !== 'TITLE') {
                query += ', B.TITLE ASC';
            }
        } else {
            query += '\nORDER BY B.TITLE ASC, B.PUBLISH_YEAR DESC';
        }
    }

    console.log(query);
    const result = await queryExecute(query, []);
    return result.rows;
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
    let query =
        'SELECT NVL(Round(AVG(R.RATING),2), 0) AS AVERAGE_RATING FROM BOOK B LEFT JOIN RATING R ON (B.ISBN = R.ISBN)';
    const binds = {};

    if (context.ISBN) {
        binds.ISBN = context.ISBN;
        query += '\nWhere B.ISBN = :ISBN';
    }

    const result = await queryExecute(query, binds);
    return result.rows;
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
    const result = await queryExecute(query);
    return result.rows;
}

export async function getAuthorDB(context) {
    let query =
        "SELECT NAME, TO_CHAR(DoB,'DD-MM-YYYY') AS DoB, " +
        "TO_CHAR(DoD,'DD-MM-YYYY') AS DoD, NATIONALITY, BIO, IMAGE FROM AUTHOR";
    query += '\nWHERE AUTHOR_ID = :AUTHOR_ID';
    const result = await queryExecute(query, context);
    return result.rows;
}

export async function getPublisherDB(context) {
    let query = '';
    query +=
        "SELECT NAME, POSTAL_CODE, CITY, COUNTRY, CONTACT_NO, EMAIL, IMAGE FROM PUBLISHER";
    query += '\nWhere PUBLISHER_ID = :PUBLISHER_ID';
    const result = await queryExecute(query, context);
    return result.rows;
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
    const result = await queryExecute(query, favDB);
    return result.rows;
}


export async function getOwnReviewDB(review) {
    const reviewDB = {...review};
    let query = 'SELECT CONTENT FROM REVIEW';
    query += '\nWhere USER_ID = :USER_ID AND ISBN = :ISBN';
    console.log(query);
    const result = await queryExecute(query, reviewDB);
    return result.rows;
}

export async function getGenreDB(context) {
    let query = baseQuery('GENRE');
    const binds = {};

    if (context.GENRE_ID) {
        binds.GENRE_ID = context.GENRE_ID;
        query += '\nWhere GENRE_ID = :GENRE_ID';
    }
    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function getAllRatRevOfBookDB(context) {
    console.log(context);
    let query = '';
    if (context.USER_ID) {
        query += `SELECT *
                  FROM (SELECT U.USER_ID,
                               (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME,
                               U.IMAGE,
                               R.RATING,
                               R.REVIEW,
                               TO_CHAR(R.EDIT_DATE, 'DD-MM-YYYY')   AS EDIT_DATE` +
            `\n FROM "USER" U JOIN REVIEW_RATING R ON (U.USER_ID = R.USER_ID)` +
            `\nWHERE R.ISBN = ${context.ISBN} AND U.USER_ID = ${context.USER_ID}) UNION SELECT * FROM (`;
    }
    query +=
        "SELECT U.USER_ID, (U.FIRST_NAME || ' ' || U.LAST_NAME) AS NAME, U.IMAGE, R.RATING, R.REVIEW, TO_CHAR(R.EDIT_DATE, 'DD-MM-YYYY') AS EDIT_DATE" +
        `\nFROM REVIEW_RATING R JOIN "USER" U ON (U.USER_ID = R.USER_ID)` +
        `\nWHERE R.ISBN = ${context.ISBN}`;
    if (context.USER_ID) {
        query += ` AND U.USER_ID <> ${context.USER_ID}` +
            '\nORDER BY R.EDIT_DATE DESC)';
    } else {
        query += '\nORDER BY R.EDIT_DATE DESC';
    }
    console.log(query);
    const result = await queryExecute(query, []);

    return result.rows;
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

export async function reviewBookDB(review) {
    const reviewDB = {...review};
    const query = runProcedure('REVIEW_POST(:PERSON_ID, :ISBN, :REVIEW_CONTENT)');

    const result = await queryExecute(query, reviewDB);

    return reviewDB;
}

export async function postFavouriteDB(review) {
    console.log(review);
    const reviewDB = {...review};
    const query = runProcedure('POST_FAVOURITE(:ISBN, :USER_ID)');

    const result = await queryExecute(query, reviewDB);

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

    query01 = query01.slice(0, -4);

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
    const query =
        'insert into BOOK (ISBN, TITLE, COVER_IMAGE, BINDING, NUMBER_OF_PAGES, ORIGINAL_PUBLICATION_YEAR, LANGUAGE, DESCRIPTION, SUMMARY, PUBLISHER_ID, PUBLICATION_DATE)\nvalues (:ISBN, :TITLE, :COVER_IMAGE, :BINDING, :NUMBER_OF_PAGES, :ORIGINAL_PUBLICATION_YEAR, :LANGUAGE, :DESCRIPTION, :SUMMARY, :PUBLISHER_ID, :PUBLICATION_DATE)';

    const result = await queryExecute(query, bookDB);

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
    const procedure = 'INSERT_WRITTEN_BY(:ISBN, :AUTHOR_ID)';
    const query = runProcedure(procedure);
    const result = await queryExecute(query, bookAuthor);
    return bookAuthor;
}

export async function addBookGenreDB(bookGenre) {
    const procedure = 'INSERT_BOOK_GENRE(:ISBN, :GENRE_ID)';
    const query = runProcedure(procedure);
    const result = await queryExecute(query, bookGenre);
    return bookGenre;
}


export async function updateBookDB(context) {
    const query = runProcedure(
        'UPDATE_BOOK(:ISBN, :TITLE, :COVER_IMAGE, :BINDING, :NUMBER_OF_PAGES, :ORIGINAL_PUBLICATION_YEAR, :LANGUAGE, :DESCRIPTION, :SUMMARY, :PUBLICATION_DATE)'
    );

    const result = await queryExecute(query, context);
    return result;
}

export async function deleteBookDB(context) {
    const query = runProcedure('DELETE_BOOK(:ISBN)');

    const result = await queryExecute(query, context);
    return result;
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

export async function updateAuthorDB(context) {
    const query = runProcedure(
        'UPDATE_AUTHOR(:PERSON_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :WEB_ADDRESS)'
    );

    const result = await queryExecute(query, context);
    return result;
}

export async function addAuthorDB(author) {
    console.log(author);

    const procedure =
        'INSERT_AUTHOR(:FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :WEB_ADDRESS)';
    const query = runProcedure(procedure);
    const result = await queryExecute(query, author);
    return author;
}

export async function deleteAuthorDB(context) {
    const procedure = 'DELETE_AUTHOR(:PERSON_ID)';
    const query = runProcedure(procedure);

    const result = await queryExecute(query, context);
    return result;
}

export async function addPublisherDB(publisher) {
    const procedure = 'INSERT_PUBLISHER(:NAME, :ADDRESS, :EMAIL_ID, :WEB_ADDRESS)';
    const query = runProcedure(procedure);
    const result = await queryExecute(query, publisher);
    return publisher;
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

export async function updatePublisherDB(context) {
    const query = runProcedure(
        'UPDATE_PUBLISHER(:PUBLISHER_ID, :NAME, :ADDRESS, :EMAIL_ID, :WEB_ADDRESS)'
    );

    const result = await queryExecute(query, context);
    return result;
}

export async function deletePublisherDB(context) {
    const procedure = 'DELETE_PUBLISHER(:PUBLISHER_ID)';
    const query = runProcedure(procedure);

    const result = await queryExecute(query, context);
    return result;
}

export async function addGenreDB(genre) {
    const procedure = 'INSERT_GENRE(:GENRE_NAME)';
    const query = runProcedure(procedure);
    const result = await queryExecute(query, genre);
    return genre;
}

export async function updateGenreDB(context) {
    const query = runProcedure('UPDATE_GENRE(:GENRE_ID, :GENRE_NAME)');

    const result = await queryExecute(query, context);
    return result;
}

export async function deleteGenreDB(context) {
    let query = 'delete from GENRE';
    console.log(context);
    query += '\nwhere GENRE_ID = :GENRE_ID';

    const result = await queryExecute(query, context);
    return result;
}


export async function updateAdminDB(context) {
    const query = runProcedure(
        'UPDATE_ADMIN(:PERSON_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS)'
    );

    const result = await queryExecute(query, context);
    return result;
}

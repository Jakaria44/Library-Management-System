import {
  getAllBookDB,
  getAllBookSumDB,
  getAllLanguagesDB,
  getAllNewsDB,
  getAllRatRevOfBookDB,
  getAllRequestsDB,
  getAllUsersDB,
  getApplicationDB,
  getAuthorDB,
  getBookDetailsByIDDB,
  getEditionDB,
  getEmployeeDB,
  getGenreDB,
  getJobDB,
  getMyFineHistoryDB,
  getMyMessagesDB,
  getMyRentHistoryDB,
  getMyRequestsDB,
  getOwnRatRevDB,
  getPublisherDB,
  getRunningFineDB,
  getUserDetailsDB,
  getSearchBarDB,
  getRentHistoryDB
} from "../Database/queryFunctions.js";


export async function getUserDetails(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;

    console.log(context);
    const rows = await getUserDetailsDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({message: 'No Data Found'});
    }
  } catch (err) {
    next(err);
  }
}

export async function getBookDetailsByID(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.id;
    context.USER_ID = req.USER_ID;

    console.log(context);

    const rows = await getBookDetailsByIDDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllBook(req, res, next) {
  try {
    const rows = await getAllBookDB();
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllBookSum(req, res, next) {
  try {
    let context = {};

    const perPage = req.query.perPage || 20;
    let page = req.query.page || 1;

    if (req.USER_ID) {
      context.USER_ID = req.USER_ID;
    }
    if (req.query.MY_FAV) {
      context.MY_FAV = req.query.MY_FAV === 'true';
    }
    if (req.query.MY_RAT) {
      context.MY_RAT = req.query.MY_RAT === 'true';
    }
    if (req.query.ISBN) {
      context.ISBN = req.query.ISBN;
    }
    if (req.query.TITLE) {
      context.TITLE = req.query.TITLE?.toUpperCase()?.replace(/'/g, `''`);
    }
    if (req.query.LANGUAGE) {
      context.LANGUAGE = req.query.LANGUAGE?.toUpperCase();
    }
    if (req.query.PAGE_START) {
      context.PAGE_START = parseInt(req.query.PAGE_START);
    }
    if (req.query.PAGE_END) {
      context.PAGE_END = parseInt(req.query.PAGE_END);
    }
    if (req.query.YEAR_START) {
      context.YEAR_START = parseInt(req.query.YEAR_START);
    }
    if (req.query.YEAR_END) {
      context.YEAR_END = parseInt(req.query.YEAR_END);
    }
    if (req.query.RATING_START) {
      context.RATING_START = parseFloat(req.query.RATING_START, 2);
    }
    if (req.query.RATING_END) {
      context.RATING_END = parseFloat(req.query.RATING_END, 2);
    }
    if (req.query.AUTHOR_ID) {
      context.AUTHOR_ID = req.query.AUTHOR_ID;
    }
    if (req.query.PUBLISHER_ID) {
      context.PUBLISHER_ID = req.query.PUBLISHER_ID;
    }
    if (req.query.GENRE_ID) {
      context.GENRE_ID = req.query.GENRE_ID;
    }
    if (req.query.sort) {
      context.sort = req.query.sort;
    }
    if (req.query.order) {
      context.order = req.query.order;
    }

    const rows = await getAllBookSumDB(context);

    if (rows.length > 0) {
      const total = rows.length;
      const totalPages = Math.ceil(total / perPage);
      page = (page < totalPages ? page : totalPages);
      const start = (page - 1) * perPage;
      const end = page * perPage;
      res.status(200).json({rows: rows.slice(start, end), totalPages});
      // res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getSearchBar(req, res, next) {
  try {
    let context = {};

    const count = req.query.count || 5;

    if (req.query.text?.length > 0) {
      context.text = req.query.text?.toUpperCase()?.replace(/'/g, `''`);
    } else{
      res.status(404).json({message: "No text provided"});
      return;
    }

    if (req.query.sort) {
      context.sort = req.query.sort;
    }
    if (req.query.order) {
      context.order = req.query.order;
    }
    console.log(context)

    const rows = await getSearchBarDB(context);

    if (rows.length > 0) {
      const total = rows.length;
      res.status(200).json(rows.slice(0, (total < count) ? total : count));
      // res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllLanguages(req, res, next) {
  try {
    const rows = await getAllLanguagesDB();

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAuthor(req, res, next) {
  try {
    const context = {};
    context.AUTHOR_ID = req.query.aid;
    context.sort = req.query.sort;
    context.order = req.query.order;
    console.log(context);

    const rows = await getAuthorDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getJob(req, res, next) {
  try {
    const context = {};
    context.JOB_ID = req.query.jid;
    context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;

    console.log(context);

    const rows = await getJobDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getEmployee(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.query.uid;
    console.log(context);

    const rows = await getEmployeeDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getPublisher(req, res, next) {
  try {
    const context = {};

    context.PUBLISHER_ID = req.query.pid;
    context.sort = req.query.sort;
    context.order = req.query.order;
    console.log(context)

    const rows = await getPublisherDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getGenre(req, res, next) {
  try {
    let context = {};

    context.GENRE_ID = req.query.gid;
    console.log(context)

    const rows = await getGenreDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getEdition(req, res, next) {
  try {
    let context = {};

    context.ISBN = req.query.id;
    context.EDITION_ID = req.query.eid;
    console.log(context)

    const rows = await getEditionDB(context);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else if (rows.length > 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}


export async function getMyMessages(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;
    console.log(context)

    const rows = await getMyMessagesDB(context);

    if (rows.length >= 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getOwnRatRev(req, res, next) {
  let ratrev = {};
  ratrev.USER_ID = req.USER_ID;
  ratrev.ISBN = req.query.ISBN;
      console.log(context)

  try {
    ratrev = await getOwnRatRevDB(ratrev);
    if (ratrev.length > 0) {
      res.status(201).json(ratrev[0]);
    } else {
      res.status(404).json({message: 'No Data Found'});
    }
  } catch (err) {
    next(err);
  }
}

export async function getMyRequests(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;
    context.ISBN = req.query.id;
        console.log(context)

    const rows = await getMyRequestsDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllRequests(req, res, next) {
  try {
    const context = {};
    // context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;
        console.log(context)

    const rows = await getAllRequestsDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllNews(req, res, next) {
  try {
    const context = {};
    // context.USER_ID = req.USER_ID;
    const rows = await getAllNewsDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getNews(req, res, next) {
  try {
    let count = req.query.count || 5;
    const rows = await getAllNewsDB();

    if (rows.length > 0) {
      count = (count < rows.length) ? count : rows.length;
      res.status(200).json(rows.slice(0, count));
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;
    context.EMPLOYEE = req.query.EMPLOYEE;
    context.ADMIN = req.query.ADMIN;
    context.USER = req.query.USER;
        console.log(context)

    const rows = await getAllUsersDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getApplication(req, res, next) {
  try {
    const context = {};
    context.sort = req.query.sort;
    context.order = req.query.order;
    context.JOB_ID = req.query.JOB_ID;
        console.log(context)

    const rows = await getApplicationDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}


export async function getMyRentHistory(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;
        console.log(context)

    const rows = await getMyRentHistoryDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getMyFineHistory(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;
        console.log(context)

    const rows = await getMyFineHistoryDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getRentHistory(req, res, next) {
  try {
    const context = {};
    // context.USER_ID = req.USER_ID;
    context.sort = req.query.sort;
    context.order = req.query.order;
        console.log(context)

    const rows = await getRentHistoryDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}

export async function getRunningFine(req, res, next) {
  try {
    const context = {};
    context.sort = req.query.sort;
    context.order = req.query.order;
    context.CHECK = req.query.CHECK === 'true';
        console.log(context)

    const rows = await getRunningFineDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}


export async function getAllRatRevOfBook(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.id;
    context.USER_ID = req.USER_ID;
    console.log(context);
    const rows = await getAllRatRevOfBookDB(context);
    // console.log(rows);
    if (rows.allRatRev.length > 0 || rows.myRatRev.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message: "No Data Found"});
    }
  } catch (err) {
    next(err);
  }
}
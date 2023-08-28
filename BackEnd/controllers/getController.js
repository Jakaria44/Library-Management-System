import jwt from "jsonwebtoken";
import {secret} from "../Database/databaseConfiguration.js";
import {
  getAllAuthorsDB,
  getAllAwardsDB,
  getAllBindsDB,
  getAllBookDB,
  getAllBookSumDB,
  getAllGenreDB,
  getAllLanguagesDB,
  getAllPublishersDB,
  getAllRatRevOfBookDB,
  getAuthorBooksDB,
  getAuthorDB,
  getAvgRatingDB,
  getBookByTitleDB,
  getBookDB,
  getBookDetailsByIDDB,
  getBookFromBookshelfDB,
  getBookshelvesDB,
  getCompleteBookDB,
  getGenreBookDB,
  getGenreDB,
  getOwnRatRevDB,
  getPublisherBooksDB,
  getPublisherDB,
  getRatingDB,
  getRecentBookDB,
  getTopBookDB,
  getUserDetailsDB,
  getUserRatedBooksDB,
  getUserReviewedBooksDB,
  getMyRequestsDB,
  getMyRentHistoryDB
} from "../Database/queryFunctions.js";


export async function getUserDetails(req, res, next) {
  try {
    const context = {};
    context.USER_ID = req.USER_ID;

    console.log(context);
    const rows = await getUserDetailsDB(context);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getBookDetailsByID(req, res, next) {
  try {
    console.log("in getControllers.js");

    const context = {};

    // localhost:3000/db-api/book?id=9781408855669

    context.ISBN = req.query.id;
    context.USER_ID = req.USER_ID;

    // console.log(context);

    const rows = await getBookDetailsByIDDB(context);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllBook(req, res, next) {
  try {
    console.log("in getControllers.js");
    const rows = await getAllBookDB();

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllBookSum(req, res, next) {
  try {
    console.log("in getControllers.js");
    const context = {};
    // console.log(req);
    context.sort = req.query.sort;
    context.order = req.query.order;
    context.USER_ID = req.USER_ID;

    const rows = await getAllBookSumDB(context);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getBookByTitle(req, res, next) {
  try {
    const context = {};

    context.Title = req.query.Title;

    const rows = await getBookByTitleDB(context);

    if (req.query.Title) {
      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(404).end();
      // res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getTopBook(req, res, next) {
  try {
    const context = {};

    context.COUNT = req.query.COUNT;

    const rows = await getTopBookDB(context);

    if (req.query.ISBN || req.query.Title) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getRecentBook(req, res, next) {
  try {
    const context = {};

    context.COUNT = req.query.COUNT;

    const rows = await getRecentBookDB(context);

    if (req.query.ISBN || req.query.Title) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getAvgRating(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.ISBN;

    const rows = await getAvgRatingDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getBook(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.ISBN;
    context.TITLE = req.query.TITLE;

    const rows = await getBookDB(context);

    if (req.query.ISBN || req.query.Title) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllAuthors(req, res, next) {
  try {
    const rows = await getAllAuthorsDB();

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllPublishers(req, res, next) {
  try {
    const rows = await getAllPublishersDB();

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllGenre(req, res, next) {
  try {
    const rows = await getAllGenreDB();

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
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
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAuthor(req, res, next) {
  try {
    const context = {};
    context.AUTHOR_ID = req.query.aid;
    console.log(context);

    const rows = await getAuthorDB(context);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else if (rows.length > 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getPublisher(req, res, next) {
  try {
    const context = {};

    context.PUBLISHER_ID = req.query.pid;

    const rows = await getPublisherDB(context);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else if (rows.length > 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getGenre(req, res, next) {
  try {
    const context = {};

    context.GENRE_ID = req.query.GENRE_ID;

    const rows = await getGenreDB(context);

    if (rows.length >= 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAuthorBooks(req, res, next) {
  try {
    const context = {};

    context.AUTHOR_ID = req.query.AUTHOR_ID;

    const rows = await getAuthorBooksDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getPublisherBooks(req, res, next) {
  try {
    const context = {};
    console.log(req.query);

    context.PUBLISHER_ID = req.query.PUBLISHER_ID;

    const rows = await getPublisherBooksDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getUserRatedBooks(req, res, next) {
  try {
    //   let token = req.headers['x-access-token'];
    //   jwt.verify(token, secret, async function(err, decoded) {
    const context = {
      USER_ID: req.query.USER_ID,
    };

    try {
      const rows = await getUserRatedBooksDB(context);

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }

    // });
    //
  } catch (err) {
    next(err);
  }
}

export async function getUserReviewedBooks(req, res, next) {
  try {
    //   let token = req.headers['x-access-token'];
    //   jwt.verify(token, secret, async function(err, decoded) {
    //     let context = {
    //       USER_ID: decoded.USER_ID,
    //     };
    context.USER_ID = req.query.USER_ID;

    try {
      const rows = await getUserReviewedBooksDB(context);

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }

    // });
    //
  } catch (err) {
    next(err);
  }
}

export async function getGenreBook(req, res, next) {
  try {
    const context = {};

    context.ID = req.query.ID;
    context.name = req.query.name;

    const rows = await getGenreBookDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getRating(req, res, next) {
  try {
    // let token = req.headers['x-access-token'];
    // jwt.verify(token, secret, async function(err, decoded) {
    //     let rate = {
    //         USER_ID: decoded.USER_ID,
    //         ISBN: req.query.ISBN
    //     };
    let rate = {};
    rate.USER_ID = req.query.USER_ID;
    rate.ISBN = req.query.ISBN;

    try {
      rate = await getRatingDB(rate);
      if (rate.length > 0) {
        res.status(201).json(rate);
      } else {
        res.status(404).end();
      }
    } catch (error) {
      res.status(501).json(error);
    }
    // });
  } catch (err) {
    next(err);
  }
}

export async function getOwnRatRev(req, res, next) {
  let ratrev = {};
  ratrev.USER_ID = req.USER_ID;
  ratrev.ISBN = req.query.ISBN;
  try {
    ratrev = await getOwnRatRevDB(ratrev);
    if (ratrev.length === 1) {
      res.status(201).json(ratrev[0]);
    } else {
      res.status(404).json('User is not allowed');
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
    const rows = await getMyRequestsDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message:"Not Found"});
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
    const rows = await getMyRentHistoryDB(context);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({message:"Not Found"});
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
    // console.log(context);
    const rows = await getAllRatRevOfBookDB(context);
    // console.log(rows);
    if (rows.allRatRev.length > 0 || rows.myRatRev.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getCompleteBook(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.ISBN;
    context.Title = req.query.Title;

    const rows = await getCompleteBookDB(context);

    if (rows.length >= 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

/// ////////////////////////

export async function getBookshelves(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    jwt.verify(token, secret, async (err, decoded) => {
      let bookshelves = {
        PERSON_ID: decoded.PERSON_ID,
      };
      if (req.query.BOOKSHELF_ID) {
        bookshelves.BOOKSHELF_ID = req.query.BOOKSHELF_ID;
      }
      try {
        bookshelves = await getBookshelvesDB(bookshelves);
        if (bookshelves.length > 0) {
          res.status(201).json(bookshelves);
        } else {
          res.status(404).end();
        }
      } catch (error) {
        res.status(501).json(error);
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getBooksFromBookshelf(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    jwt.verify(token, secret, async (err, decoded) => {
      let book = {
        PERSON_ID: decoded.PERSON_ID,
        BOOKSHELF_ID: req.query.BOOKSHELF_ID,
      };

      try {
        book = await getBookFromBookshelfDB(book);
        if (book.length > 0) {
          res.status(201).json(book);
        } else {
          res.status(404).end();
        }
      } catch (error) {
        res.status(501).json(error);
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllAwards(req, res, next) {
  try {
    const rows = await getAllAwardsDB();

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllBinds(req, res, next) {
  try {
    const rows = await getAllBindsDB();

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

// export async function getAuthor(req, res, next){
//     try {
//         const context = {};
//         context.ID = Number(req.query.ID);

//         const rows = await getAuthorDB(context);

//         if (req.query.ID) {
//           if (rows.length === 1) {
//             res.status(200).json(rows[0]);
//           } else {
//             res.status(404).end();
//           }
//         } else {
//           res.status(200).json(rows);
//         }
//       } catch (err) {
//         next(err);
//       }
// }

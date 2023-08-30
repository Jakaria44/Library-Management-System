import jwt from 'jsonwebtoken';
import {secret} from '../Database/databaseConfiguration.js';
import {
  addAuthorDB,
  addBookAwardDB,
  addBookDB,
  addBookGenreDB,
  addGenreDB,
  addPublisherDB,
  addWrittenByDB,
  postFavouriteDB,
  createBookDB,
  getFavouriteDB,
  getAdvancedSearchedBookDB,
  getSearchedBookDB,
  rateBookDB,
  ratrevBookDB,
  getAvgRatingDB,
  addRequestDB,
  getOwnRatRevDB,
  getMyFineHistoryDB,
  updateEditionDB,
  getMyRequestsDB,
  addRentHistoryDB,
  getEditionDB,
  sendMessageDB,
  publishNewsDB
} from '../Database/queryFunctions.js';
import {getMyRequests} from "./getController.js";


export async function updateUserDetails(req, res, next) {
  try {
    let user = {
      PERSON_ID: req.body.PERSON_ID,
      FIRST_NAME: req.body.FIRST_NAME,
      LAST_NAME: req.body.LAST_NAME,
      ADDRESS: req.body.ADDRESS,
      EMAIL: req.body.EMAIL,
      PHONE_NUMBER: req.body.PHONE_NUMBER,
      DETAILS: req.body.DETAILS,
      WEB_ADDRESS: req.body.WEB_ADDRESS
    };

    user = await updateUserDB(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function postFavBook(req, res, next) {

  if (req.USER_ID) {
    let fav = {
      ISBN: req.query.id,
      USER_ID: req.USER_ID
    };
    console.log(fav);
    try {
      const favBook = await getFavouriteDB(fav);
      if (!favBook) {
        res.status(404).json({message: "Not Found"});
        return;
      }
      await postFavouriteDB(fav);
      res.status(201).json({IS_FAVOURITE: favBook.length === 0});
    } catch (error) {
      res.status(501).json(error);
    }
  } else {
    res.status(501).json('Not an User/Employee');
  }
}

export async function advanceSearch(req, res, next) {
  try {
    const context = {};

    if (req.body.TITLE) {
      context.TITLE = req.body.TITLE;
    }
    if (req.body.AUTHOR) {
      context.AUTHOR = req.body.AUTHOR;
    }
    if (req.body.PUBLISHER) {
      context.PUBLISHER = req.body.PUBLISHER;
    }
    if (req.body.GENRE_ID) {
      context.GENRE_ID = req.body.GENRE_ID;
    }
    if (req.body.AWARD) {
      context.AWARD = req.body.AWARD;
    }
    if (req.body.YEAR_START) {
      context.YEAR_START = req.body.YEAR_START;
    }
    if (req.body.YEAR_END) {
      context.YEAR_END = req.body.YEAR_END;
    }

    if (req.body.RATING_START) {
      context.RATING_START = req.body.RATING_START;
    }
    if (req.body.RATING_END) {
      context.RATING_END = req.body.RATING_END;
    }

    if (req.body.PAGE_START) {
      context.PAGE_START = req.body.PAGE_START;
    }
    if (req.body.PAGE_END) {
      context.PAGE_END = req.body.PAGE_END;
    }
    if (req.body.LANGUAGE) {
      context.LANGUAGE = req.body.LANGUAGE;
    }
    if (req.body.BINDING) {
      context.BINDING = req.body.BINDING;
    }
    if (req.body.SORT) {
      context.SORT = req.body.SORT;
    }
    if (req.body.SORT_TYPE) {
      context.SORT_TYPE = req.body.SORT_TYPE;
    }


    const rows = await getAdvancedSearchedBookDB(context);

    if (rows.length >= 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}


export async function searchedBook(req, res, next) {
  try {
    const context = {};
    context.SEARCH_TEXT = req.body.SEARCH_TEXT;
    context.CONSTRAINT = req.body.CONSTRAINT;

    const rows = await getSearchedBookDB(context);

    if (rows.length >= 1) {
      res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function rateBook(req, res, next) {
  try {
    console.log(req.headers['x-access-token']);
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function (err, decoded) {
      console.log(decoded);

      let rate = {
        ISBN: req.body.ISBN,
        PERSON_ID: decoded.PERSON_ID,
        VALUE: Number(req.body.VALUE)
      };

      try {
        rate = await rateBookDB(rate);
        res.status(201).json(rate);
      } catch (error) {
        res.status(501).json(error);
      }

    });

  } catch (err) {
    res.status(501).json(err);
  }
}

export async function ratrevBook(req, res, next) {
  try {
    let ratrev = {
      ISBN: req.query.id,
      USER_ID: req.USER_ID,
      RATING: req.body.RATING,
      REVIEW: req.body.REVIEW,
    };


    try {
      let my = await ratrevBookDB(ratrev);
      console.log(my);
      my = await getOwnRatRevDB(my);
      console.log(my[0]);
      const avg = await getAvgRatingDB(ratrev);
      console.log(avg);
      res.status(201).json({my: my[0], avg});
    } catch (error) {
      res.status(501).json(error);
    }

  } catch (err) {
    res.status(501).json(err);
  }
}

export async function addRequest(req, res, next) {
  try {
    let request = {
      USER_ID: req.USER_ID,
      EDITION_ID: req.body.EDITION_ID,
      CHECK: true
    };
    let result = await getMyFineHistoryDB(request);
    if (result.length > 0) {
      res.status(402).json({message: "PAY FIRST"})
      return;
    }
    result = await getMyRequestsDB(request);
    if (result.length >= 5) {
      res.status(403).json({message: "MAXIMUM LIMIT REACHED"});
      return;
    }
    request = await addRequestDB(request);
    if (request) {
      res.status(200).json({message: "Successful"})
    } else {
      res.status(404).json({message: "Already Exists"})
    }
  } catch (e) {
    next(e);
  }
}

export async function sendMessage(req, res, next) {
  try {
    if (req.body.USER_ID === req.USER_ID) {
      res.status(402).json({message: "Can't send message to self"})
    }
    let request = {
      USER_ID: req.body.USER_ID,
      MESSAGE: req.body.MESSAGE
    };
    request = await sendMessageDB(request);
    if (request) {
      res.status(200).json({message: "Successful"})
    } else {
      res.status(404).json({message: "Message send Failed"})
    }
  } catch (e) {
    next(e);
  }
}

export async function publishNews(req, res, next) {
  try {
    let request = {
      NEWS: req.body.NEWS
    };
    request = await publishNewsDB(request);
    if (request) {
      res.status(200).json({message: "Successful"})
    } else {
      res.status(404).json({message: "Message send Failed"})
    }
  } catch (e) {
    next(e);
  }
}


export async function acceptRequest(req, res, next) {
  try {
    if (req.body.USER_ID === req.USER_ID) {
      res.status(402).json({message: "Can't accept own request"})
    }
    let context = {
      USER_ID: req.body.USER_ID,
      EDITION_ID: req.body.EDITION_ID,
      RETURN_DATE: req.body.RETURN_DATE ? new Date(req.body.RETURN_DATE) : null
    };
    let days = context.RETURN_DATE ? Math.floor((context.RETURN_DATE - (new Date())) / (1000 * 60 * 60 * 24)) : 7;
    console.log(context);
    let request = await addRentHistoryDB(context);
    if (request) {
      const result = await getEditionDB(context);
      console.log(result);
      const isbn = (result[0] ? result[0].ISBN : 'UNKNOWN');
      const edition = (result[0] ? result[0].EDITION_NUM : 'UNKNOWN');
      context.MESSAGE = `Your request for the book, ISBN : {${isbn}} and EDITION_NUM = {${edition}} has been accepted. Please collect the book. You need to return the book by {${days}} to avoid fine.`;
      console.log(context);
      request = await sendMessageDB(context);
      if (!request) {
        res.status(201).json({message: 'Successful but message not send'})
      } else {
        res.status(200).json({message: 'Successful'})
      }
    } else {
      res.status(404).json({message: "Not Enough Copies"})
    }
  } catch (e) {
    next(e);
  }
}

export async function bookToBookshelf(req, res, next) {
  try {
    let bookshelf = {
      BOOKSHELF_ID: req.body.BOOKSHELF_ID,
      ISBN: req.body.ISBN
    };

    bookshelf = await addBookToBookshelfDB(bookshelf);
    res.status(201).json(bookshelf);
  } catch (err) {
    next(err);
  }
}


export async function postBook(req, res, next) {
  try {
    let book = {
      ISBN: req.body.ISBN,
      TITLE: req.body.TITLE,
      COVER_IMAGE: req.body.COVER_IMAGE,
      BINDING: req.body.BINDING,
      NUMBER_OF_PAGES: Number(req.body.NUMBER_OF_PAGES),
      ORIGINAL_PUBLICATION_YEAR: Number(req.body.ORIGINAL_PUBLICATION_YEAR),
      LANGUAGE: req.body.LANGUAGE,
      DESCRIPTION: req.body.DESCRIPTION,
      SUMMARY: req.body.SUMMARY,
      PUBLISHER_ID: req.body.PUBLISHER_ID,
      PUBLICATION_DATE: req.body.PUBLICATION_DATE
    }

    book = await createBookDB(book);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

export async function addBook(req, res, next) {
  try {
    let book = {
      ISBN: req.body.ISBN,
      TITLE: req.body.TITLE,
      COVER_IMAGE: req.body.COVER_IMAGE,
      BINDING: req.body.BINDING,
      NUMBER_OF_PAGES: Number(req.body.NUMBER_OF_PAGES),
      ORIGINAL_PUBLICATION_YEAR: Number(req.body.PUBLICATION_YEAR),
      LANGUAGE: req.body.LANGUAGE,
      DESCRIPTION: req.body.DESCRIPTION,
      SUMMARY: req.body.SUMMARY,
      PUBLISHER_ID: req.body.PUBLISHER_ID,
      PUBLICATION_DATE: req.body.PUBLICATION_DATE
    };

    book = await addBookDB(book);

    console.log(book);
    if (req.body.AWARDS) {
      for (var i = 0; i < req.body.AWARDS.length; i++) {
        let bookAward = {
          ISBN: req.body.ISBN,
          AWARDS: req.body.AWARDS[i]
        };
        bookAward = await addBookAwardDB(bookAward);

      }
    }

    if (req.body.AUTHORS) {
      for (var i = 0; i < req.body.AUTHORS.length; i++) {
        let bookAuthor = {
          ISBN: req.body.ISBN,
          AUTHOR_ID: req.body.AUTHORS[i]
        };
        bookAuthor = await addWrittenByDB(bookAuthor);

      }
    }

    if (req.body.GENRES) {
      for (var i = 0; i < req.body.GENRES.length; i++) {
        let bookGenre = {
          ISBN: req.body.ISBN,
          GENRE_ID: req.body.GENRES[i]
        };
        bookGenre = await addBookGenreDB(bookGenre);
      }
    }


    res.status(201).json("Done Properly");


  } catch (err) {
    res.status(501).json(err);
    next(err);
  }
}

export async function addAuthor(req, res, next) {
  try {
    let author = {
      FIRST_NAME: req.body.FIRST_NAME,
      LAST_NAME: req.body.LAST_NAME,
      ADDRESS: req.body.ADDRESS,
      EMAIL: req.body.EMAIL,
      PHONE_NUMBER: req.body.PHONE_NUMBER,
      DETAILS: req.body.DETAILS,
      WEB_ADDRESS: req.body.WEB_ADDRESS
    };
    author = await addAuthorDB(author);

    res.status(201).json("Done Properly");


  } catch (err) {
    res.status(501).json(err);
    next(err);
  }
}

export async function addPublisher(req, res, next) {
  try {
    let publisher = {
      NAME: req.body.NAME,
      ADDRESS: req.body.ADDRESS,
      EMAIL_ID: req.body.EMAIL_ID,
      WEB_ADDRESS: req.body.WEB_ADDRESS
    };
    publisher = await addPublisherDB(publisher);

    res.status(201).json("Done Properly");


  } catch (err) {
    res.status(501).json(err);
    next(err);
  }
}

export async function addGenre(req, res, next) {
  try {
    let genre = {
      GENRE_NAME: req.body.GENRE_NAME,
    };
    genre = await addGenreDB(genre);

    res.status(201).json("Done Properly");


  } catch (err) {
    res.status(501).json(err);
    next(err);
  }
}

export async function reviewRateBook(req, res, next) {
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function (err, decoded) {
      let review = {
        ISBN: req.body.id,
        USER_ID: decoded.USER_ID,
        REVIEW: req.body.review,
        RATING: req.body.rating
      };

      try {
        review = await reviewBookDB(review);
        res.status(201).json(review);
      } catch (error) {
        res.status(501).json(error);
      }

    });

  } catch (err) {
    res.status(501).json(err);
  }
}
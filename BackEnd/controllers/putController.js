import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';
import {
  updateAuthorDB,
  updateBookDB,
  updateEditionDB,
  updateGenreDB,
  updateHistoryDB,
  updateJobDB,
  updateMessageDB,
  updatePublisherDB,
  updateUserDB
} from '../Database/queryFunctions.js';

export async function updateBook(req, res, next) {
  try {
    let book = {
      ISBN: req.body.ISBN,
      TITLE: req.body.TITLE?.replace(/'/g, `''`),
      IMAGE: req.body?.IMAGE,
      NUMBER_OF_PAGES: Number(req.body.NUMBER_OF_PAGES),
      LANGUAGE: req.body.LANGUAGE?.replace(/'/g, `''`),
      DESCRIPTION: req.body.DESCRIPTION?.replace(/'/g, `''`),
      PUBLISHER_ID: req.body.PUBLISHER_ID,
      PREVIEWLINK: req.body.PREVIEWLINK?.replace(/'/g, `''`),
      AUTHORS: req.body.Authors,
      GENRES: req.body.Genres,
      EDITIONS: req.body.Editions
    };
    if(book.ISBN.length !== 13){
      res.status(404).json({message: "ISBN must be 13 characters long"});
      return;
    }
    if(book.AUTHORS.length === 0 || book.GENRES.length === 0){
      res.status(404).json({message: "Authors and Genres can't be empty"});
      return;
    }
    console.log(book);
    book = await updateBookDB(book);
    if (book) {
      res.status(201).json({message: "Successfully updated"});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  } catch (err) {
    next(err);
  }
}


export async function updateAuthor(req, res, next) {
  try {
    let author = {
      AUTHOR_ID: req.body.AUTHOR_ID,
      NAME: req.body.NAME?.replace(/'/g, `''`),
      DoB: new Date(req.body.DoB),
      DoD: req.body.DoD ? new Date(req.body.DoD) : null,
      NATIONALITY: req.body.NATIONALITY,
      BIO: req.body.BIO?.replace(/'/g, `''`),
      IMAGE: req.body.IMAGE
    };
    author = await updateAuthorDB(author);
    if (author) {
      res.status(201).json({message: "Successfully updated", author});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  } catch (err) {
    next(err);
  }
}


export async function updatePublisher(req, res, next) {
  let emailToLow = req.body.EMAIL?.toLowerCase();
  try {
    let publisher = {
      PUBLISHER_ID: req.body.PUBLISHER_ID,
      NAME: req.body.NAME?.replace(/'/g, `''`),
      IMAGE: req.body.IMAGE,
      CITY: req.body.CITY,
      COUNTRY: req.body.COUNTRY,
      POSTAL_CODE: req.body.POSTAL_CODE,
      CONTACT_NO: req.body.CONTACT_NO,
      EMAIL: emailToLow?.replace(/'/g, `''`)
    };
    publisher = await updatePublisherDB(publisher);
    if (publisher) {
      res.status(201).json({message: "Successfully updated", publisher});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateGenre(req, res, next) {
  try {
    let genre = {
      GENRE_ID: req.body.GENRE_ID,
      GENRE_NAME: req.body.GENRE_NAME?.replace(/'/g, `''`)
    };
    genre = await updateGenreDB(genre);
    if (genre) {
      res.status(201).json({message: "Successfully updated", genre});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateJob(req, res, next) {
  try {
    let job = {
      JOB_ID: req.query.jid,
      JOB_TITLE: req.body.JOB_TITLE?.replace(/'/g, `''`),
      SALARY: Number(req.body.SALARY)
    };
    job = await updateJobDB(job);
    if (job) {
      res.status(201).json({message: "Successfully updated"});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateEdition(req, res, next) {
  try {
    let edition = {
      EDITION_NUM: req.body.EDITION_NUM,
      NUM_OF_COPIES: req.body.NUM_OF_COPIES,
      PUBLISH_YEAR: req.body?.PUBLISH_YEAR
    };
    edition.EDITION_ID = req.query.eid;
    edition = await updateEditionDB(edition);
    if (edition) {
      res.status(201).json({message: "Successfully updated", edition});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  } catch (err) {
    next(err);
  }
}


export async function updateHistory(req, res, next) {
  try {
    var history = {
      USER_ID: req.USER_ID,
      RENT_HISTORY_ID: req.body.RENT_HISTORY_ID,
      PAY: req.body.PAY ? req.body.PAY : false
    };
    console.log(history)
    history = await updateHistoryDB(history);
    if (history) {
      res.status(200).json({message: 'Successfully updated'});
    } else {
      res.status(404).json({message: 'You have to pay fine first'});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateMessage(req, res, next) {
  try {
    let context = {
      USER_ID: req.USER_ID,
      MESSAGE_ID: req.query.mid
    };
    context = await updateMessageDB(context);
    if (context) {
      res.status(200).json({message: 'Successfully updated'});
    } else {
      res.status(404).json({message: 'Failed to update'});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  let emailToLow = req.body.EMAIL?.toLowerCase();
  var token = req.headers['x-access-token'];
  if (token) {
    try {
      jwt.verify(token, secret, async function (err, decoded) {
        let user = {
// ADDRESS, CONTACT_NO, EMAIL, FIRST_NAME, GENDER, IMAGE, LAST_NAME, PASSWORD, USER_ID,
          USER_ID: decoded.USER_ID,
          FIRST_NAME: req.body.FIRST_NAME?.replace(/'/g, `''`),
          LAST_NAME: req.body.LAST_NAME?.replace(/'/g, `''`),
          ADDRESS: req.body.ADDRESS?.replace(/'/g, `''`),
          EMAIL: emailToLow?.replace(/'/g, `''`),
          CONTACT_NO: req.body.CONTACT_NO,
          IMAGE: req.body.IMAGE,
          GENDER: req.body.GENDER,
          PASSWORD: req.body.PASSWORD,
        };
        console.log(user);
        try {
          user = await updateUserDB(user);
          if (user) res.status(201).json(user);
          else res.status(409).json({message: "Email already exists"});
        } catch (error) {
          res.status(501).json(error);
        }
      });
    } catch
      (err) {
      next(err);
    }
  } else {
    res.status(401).json({message: "No token provided"});
  }
}
import jwt from 'jsonwebtoken';
import {secret} from '../Database/databaseConfiguration.js';
import {
  updateAdminDB,
  updateAuthorDB,
  updateBookDB,
  updateGenreDB,
  updatePublisherDB,
  updateUserDB,
  updateHistoryDB,
  updateMessageDB
} from '../Database/queryFunctions.js';
import bcrypt from "bcrypt";


export async function updateBook(req, res, next) {
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
      PUBLICATION_DATE: req.body.PUBLICATION_DATE
    };


    book = await updateBookDB(book);
    res.status(201).json(book);


  } catch (err) {
    next(err);
  }
}


export async function updateAuthor(req, res, next) {
  try {
    let author = {
      AUTHOR_ID: req.body.AUTHOR_ID,
      NAME: req.body.NAME,
      DoB: new Date(req.body.DoB),
      DoD: req.body.DoD? new Date(req.body.DoD): null,
      NATIONALITY: req.body.NATIONALITY,
      BIO: req.body.BIO,
      IMAGE: req.body.IMAGE
    };
    author = await updateAuthorDB(author);
    if (author) {
      res.status(201).json({message: "Successful", author});
    } else {
      res.status(404).json({message: "Not successful"});
    }
  } catch (err) {
    next(err);
  }
}


export async function updatePublisher(req, res, next) {
  try {
    let publisher = {
      PUBLISHER_ID: req.body.PUBLISHER_ID,
      NAME: req.body.NAME,
      IMAGE: req.body.IMAGE,
      CITY: req.body.CITY,
      COUNTRY: req.body.COUNTRY,
      POSTAL_CODE: req.body.POSTAL_CODE,
      CONTACT_NO: req.body.CONTACT_NO,
      EMAIL: req.body.EMAIL
    };
    publisher = await updatePublisherDB(publisher);
    if (publisher) {
      res.status(201).json({message: "Successful", publisher});
    } else {
      res.status(404).json({message: "Not successful"});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateGenre(req, res, next) {
  try {
    let genre = {
      GENRE_ID: req.body.GENRE_ID,
      GENRE_NAME: req.body.GENRE_NAME
    };
    genre = await updateGenreDB(genre);
    if (genre) {
      res.status(201).json({message: "Successful", genre});
    } else {
      res.status(404).json({message: "Not successful"});
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
      res.status(404).json({message: 'Failed to update'});
    }
  } catch (err) {
    next(err);
  }
}

export async function updateMessage(req, res, next) {
  try {
    var context = {
      USER_ID: req.USER_ID
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
  try {
    let emailToLow = null;
    if (req.body.EMAIL) {
      emailToLow = req.body.EMAIL.toLowerCase();
    }
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function (err, decoded) {
      let user = {
// ADDRESS, CONTACT_NO, EMAIL, FIRST_NAME, GENDER, IMAGE, LAST_NAME, PASSWORD, USER_ID,
        USER_ID: decoded.USER_ID,
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,
        ADDRESS: req.body.ADDRESS,
        EMAIL: emailToLow,
        CONTACT_NO: req.body.CONTACT_NO,
        IMAGE: req.body.IMAGE,
        GENDER: req.body.GENDER,
        PASSWORD: req.body.PASSWORD,
      };
      console.log(user);
      try {

        user = await updateUserDB(user);
      } catch (error) {
        res.status(501).json(error);
      }
      if (user) res.status(201).json(user);
      else res.status(409).json({message: "Email already exists"});
    });

  } catch (err) {
    next(err);
  }
}


export async function updateAdmin(req, res, next) {
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function (err, decoded) {
      let admin = {
        PERSON_ID: decoded.PERSON_ID,
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,
        ADDRESS: req.body.ADDRESS,
        EMAIL: req.body.EMAIL,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        DETAILS: req.body.DETAILS
      };

      try {
        admin = await updateAdminDB(admin);
        res.status(201).json(admin);
      } catch (error) {
        res.status(501).json(error);
      }
    });

  } catch (err) {
    next(err);
  }
}

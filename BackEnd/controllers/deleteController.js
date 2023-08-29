import {
  deleteAllBooksBookshelfDB,
  deleteAuthorDB,
  deleteBookDB,
  deleteBookOfBookshelfDB,
  deleteBookshelfDB,
  deleteGenreDB,
  deletePublisherDB,
  deleteRatRevBookDB,
  deleteRequestDB,
  getEditionDB,
  sendMessageDB,
  deleteMessageDB
} from "../Database/queryFunctions.js";

export async function deleteBookOfBookshelf(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.ISBN;
    context.BOOKSHELF_ID = req.query.BOOKSHELF_ID;

    const deleted = await deleteBookOfBookshelfDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

export async function deleteRatRevBook(req, res, next) {
  const context = {};

  context.ISBN = req.query.id;
  context.USER_ID = req.USER_ID;
  try {
    const deleted = await deleteRatRevBookDB(context);
    if (deleted) {
      res.status(201).json({message: 'Successful'});
    } else {
      res.status(404).json({message: "Does not Exist"});
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteRequests(req, res, next) {
  const context = {};
  context.USER_ID = req.USER_ID;
  let success = true; // Flag to track success of all deletions
  for (const EID of req.body.Editions) {
    console.log('Processing EID:', EID);
    context.EDITION_ID = EID;

    try {
      const deleted = await deleteRequestDB(context);
      if (!deleted) {
        success = false;
      }
    } catch (err) {
      next(err);
    }
  }

  if (success) {
    res.status(201).json({message: 'All Successful'});
  } else {
    res.status(404).json({message: 'Does not Exist'});
  }
}

export async function deleteRequest(req, res, next) {
  try {
    if (req.body.USER_ID === req.USER_ID) {
      res.status(402).json({message: "Can't accept own request"})
    }
    let context = {};
    context.USER_ID = req.body.USER_ID;
    context.EDITION_ID = req.body.EDITION_ID;
    let deleted = await deleteRequestDB(context);
    if (deleted) {
      const result = await getEditionDB(context);
      console.log(result);
      const isbn = (result[0] ? result[0].ISBN : 'UNKNOWN');
      const edition = (result[0] ? result[0].EDITION_NUM : 'UNKNOWN');
      context.MESSAGE = `Your request for the book, ISBN : {${isbn}} and EDITION_NUM = {${edition}} has been rejected. Please communicate with the manager for further query.`;
      deleted = await sendMessageDB(context);
      if (!deleted) {
        res.status(201).json({message: 'Successful but message not send'})
      } else {
        res.status(200).json({message: 'Successful'})
      }
    } else {
      res.status(404).json({message: 'Does not Exist'});
    }
  } catch (err) {
    next(err);
  }
}


export async function deleteMessage(req, res, next) {
  try {
    var context = {
      USER_ID: req.USER_ID
    };
    context = await deleteMessageDB(context);
    if (context) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}


export async function deleteAllBooksBookshelf(req, res, next) {
  try {
    const context = {};

    context.BOOKSHELF_ID = req.query.BOOKSHELF_ID;

    const deleted = await deleteAllBooksBookshelfDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

export async function deleteBookshelf(req, res, next) {
  try {
    const context = {};

    context.BOOKSHELF_ID = req.query.BOOKSHELF_ID;

    let deleted = await deleteAllBooksBookshelfDB(context);

    deleted = await deleteBookshelfDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const context = {};

    context.ISBN = req.query.ISBN;

    let deleted = await deleteBookDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

export async function deleteAuthor(req, res, next) {
  try {
    const context = {};

    context.PERSON_ID = req.query.PERSON_ID;

    let deleted = await deleteAuthorDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

export async function deletePublisher(req, res, next) {
  try {
    const context = {};

    context.PUBLISHER_ID = req.query.PUBLISHER_ID;

    let deleted = await deletePublisherDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

export async function deleteGenre(req, res, next) {
  try {
    const context = {};

    context.GENRE_ID = req.query.GENRE_ID;

    let deleted = await deleteGenreDB(context);

    res.status(201).json(deleted);
  } catch (err) {
    next(err);
  }
}

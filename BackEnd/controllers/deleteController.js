import {
  deleteAllBooksBookshelfDB,
  deleteAuthorDB,
  deleteBookDB,
  deleteBookOfBookshelfDB,
  deleteBookshelfDB,
  deleteGenreDB,
  deletePublisherDB,
  deleteRatRevBookDB,
  deleteRequestDB
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
  const context = {};
  context.USER_ID = req.body.USER_ID;
  context.EDITION_ID = req.body.EDITION_ID;

  try {
    const deleted = await deleteRequestDB(context);
    if (deleted) {
      res.status(201).json({message: 'Successful'})
    } else {
      res.status(404).json({message: 'Does not Exist'});
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

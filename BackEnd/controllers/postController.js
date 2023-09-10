import {
  addAuthorDB,
  addBookGenreDB,
  addGenreDB,
  addPublisherDB,
  addWrittenByDB,
  postFavouriteDB,
  createBookDB,
  getFavouriteDB,
  ratrevBookDB,
  getAvgRatingDB,
  addRequestDB,
  getOwnRatRevDB,
  getMyFineHistoryDB,
  getMyRequestsDB,
  addRentHistoryDB,
  getEditionDB,
  sendMessageDB,
  publishNewsDB,
  addEditionDB,
  deleteBookGenreDB,
  deleteWittenByDB,
  addJobDB,
  applyForJobDB,
  addEmployeeDB,
  getEmployeeDB,
  getApplicationDB,
} from '../Database/queryFunctions.js';

export async function postFavBook(req, res, next) {
  let fav = {
    ISBN: req.query.id,
    USER_ID: req.USER_ID
  };
  console.log(fav);
  try {
    const favBook = await getFavouriteDB(fav);
    fav = await postFavouriteDB(fav);
    if (fav) {
      res.status(201).json({IS_FAVOURITE: favBook.length === 0});
    } else {
      res.status(404).json({message: 'Failed to edit'})
    }
  } catch (e) {
    next(e);
  }
}

export async function ratrevBook(req, res, next) {
  let ratrev = {
    ISBN: req.query.id,
    USER_ID: req.USER_ID,
    RATING: req.body.RATING,
    REVIEW: req.body.REVIEW?.replace(/'/g, `''`),
  };

  try {
    let my = await ratrevBookDB(ratrev);
    console.log(my);
    my = await getOwnRatRevDB(my);
    console.log(my[0]);
    const avg = await getAvgRatingDB(ratrev);
    console.log(avg);
    res.status(201).json({my: my[0], avg});
  } catch (e) {
    next(e);
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
      res.status(402).json({message: "Please Clear your fine first"})
      return;
    }
    result = await getMyRequestsDB(request);
    if (result.length >= 20) {
      res.status(403).json({message: "Maximum Limit Reached"});
      return;
    }
    request = await addRequestDB(request);
    if (request) {
      res.status(200).json({message: "Successfully added"})
    } else {
      res.status(404).json({message: "Already Exists Data"})
    }
  } catch (e) {
    next(e);
  }
}

export async function applyForJob(req, res, next) {
  try {
    let request = {
      USER_ID: req.USER_ID,
      JOB_ID: req.query.jid
    };
    let result = await getApplicationDB(request);
    if (result.length >= 3) {
      res.status(403).json({message: "Maximum Limit Reached"});
      return;
    }
    request = await applyForJobDB(request);
    if (request) {
      res.status(200).json({message: "Successfully applied"})
    } else {
      res.status(404).json({message: "Already Exists Data"})
    }
  } catch (e) {
    next(e);
  }
}

export async function sendMessage(req, res, next) {
  try {
    if (req.body.USER_ID === req.USER_ID) {
      res.status(402).json({message: "Can't send message to self"})
      return;
    }
    let request = {
      USER_ID: req.body.USER_ID,
      MESSAGE: req.body.MESSAGE?.replace(/'/g, `''`)
    };
    request = await sendMessageDB(request);
    if (request) {
      res.status(200).json({message: "Successfully send"})
    } else {
      res.status(404).json({message: "Failed to send"})
    }
  } catch (e) {
    next(e);
  }
}

export async function publishNews(req, res, next) {
  try {
    let request = {
      NEWS: req.body.NEWS?.replace(/'/g, `''`)
    };
    request = await publishNewsDB(request);
    if (request) {
      res.status(200).json({message: "Successfully published"})
    } else {
      res.status(404).json({message: "Failed to publish"})
    }
  } catch (e) {
    next(e);
  }
}


export async function acceptRequest(req, res, next) {
  try {
    if (req.body.USER_ID === req.USER_ID) {
      res.status(402).json({message: "Can't accept own request"})
      return
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
        res.status(201).json({message: 'Successfully accepted but message not send'})
      } else {
        res.status(200).json({message: 'Successfully accepted'})
      }
    } else {
      res.status(404).json({message: "Failed to accept"})
    }
  } catch (e) {
    next(e);
  }
}

export async function acceptApplication(req, res, next) {
  try {
    let context = {
      USER_ID: req.body.USER_ID,
      JOB_ID: req.body.JOB_ID
    };
    console.log(context);
    let request = await addEmployeeDB(context);
    if (request) {
      const result = await getEmployeeDB(context);
      console.log(result);
      const jobTitle = (result[0] ? result[0].JOB_TITLE : 'UNKNOWN');
      context.MESSAGE = `Congratulations!!! Your application for the JOB: {${jobTitle}} is accepted. From now, you are an Employee of the library. Please communicate with the admin for further query.`;
      request = await sendMessageDB(context);
      if (!request) {
        res.status(201).json({message: 'Successfully accepted but message not send'})
      } else {
        res.status(200).json({message: 'Successfully accepted'})
      }
    } else {
      res.status(404).json({message: "Failed to accept"})
    }
  } catch (e) {
    next(e);
  }
}


export async function postBook(req, res, next) {
  try {
    let book = {
      ISBN: req.body.ISBN,
      TITLE: req.body.TITLE?.replace(/'/g, `''`),
      IMAGE: req.body?.IMAGE?.replace(/'/g, `''`),
      NUMBER_OF_PAGES: Number(req.body.NUMBER_OF_PAGES),
      LANGUAGE: req.body.LANGUAGE?.replace(/'/g, `''`),
      DESCRIPTION: req.body.DESCRIPTION?.replace(/'/g, `''`),
      PUBLISHER_ID: req.body.PUBLISHER_ID,
      AUTHORS: req.body.Authors,
      GENRES: req.body.Genres,
      EDITIONS: req.body.Editions
    }
    if (book.ISBN.length !== 13) {
      res.status(404).json({message: "ISBN must be 13 characters long"});
      return;
    }
    if (book.AUTHORS.length === 0 || book.GENRES.length === 0 || book.EDITIONS.length === 0) {
      res.status(404).json({message: "Authors, Genres and Editions can't be empty"});
      return;
    }
    console.log(book);
    book = await createBookDB(book);
    if (book) {
      res.status(201).json({message: "Successfully added"});
    } else {
      res.status(404).json({message: "Failed to add"});
    }
  } catch (err) {
    next(err);
  }
}


export async function addAuthor(req, res, next) {
  try {
    let author = {
      NAME: req.body.NAME,
      DoB: new Date(req.body.DoB),
      DoD: req.body.DoD ? new Date(req.body.DoD) : null,
      NATIONALITY: req.body.NATIONALITY?.replace(/'/g, `''`),
      BIO: req.body.BIO,
      IMAGE: req.body.IMAGE
    };
    author = await addAuthorDB(author);
    if (author) {
      res.status(201).json({message: "Successfully added", author});
    } else {
      res.status(404).json({message: "Failed to add"});
    }
  } catch (err) {
    next(err);
  }
}

export async function addPublisher(req, res, next) {
  let emailToLow = req.body.EMAIL?.toLowerCase();
  try {
    let publisher = {
      NAME: req.body.NAME?.replace(/'/g, `''`),
      IMAGE: req.body.IMAGE?.replace(/'/g, `''`),
      CITY: req.body.CITY?.replace(/'/g, `''`),
      COUNTRY: req.body.COUNTRY?.replace(/'/g, `''`),
      POSTAL_CODE: req.body.POSTAL_CODE?.replace(/'/g, `''`),
      CONTACT_NO: req.body.CONTACT_NO,
      EMAIL: emailToLow?.replace(/'/g, `''`)
    };
    publisher = await addPublisherDB(publisher);
    if (publisher) {
      res.status(201).json({message: "Successfully added", publisher});
    } else {
      res.status(404).json({message: "Failed to add"});
    }
  } catch (err) {
    next(err);
  }
}

export async function addGenre(req, res, next) {
  try {
    let genre = {
      GENRE_NAME: req.body.GENRE_NAME?.replace(/'/g, `''`)
    };
    console.log(genre);
    genre = await addGenreDB(genre);
    if (genre) {
      res.status(201).json({message: "Successfully added", genre});
    } else {
      res.status(404).json({message: "Failed to add"});
    }
  } catch (err) {
    next(err);
  }
}

export async function addJob(req, res, next) {
  try {
    let job = {
      JOB_TITLE: req.body.JOB_TITLE?.replace(/'/g, `''`),
      SALARY: req.body.SALARY
    };
    console.log(job);
    job = await addJobDB(job);
    if (job) {
      res.status(201).json({message: "Successfully added", job});
    } else {
      res.status(404).json({message: "Failed to add"});
    }
  } catch (err) {
    next(err);
  }
}

export async function addEdition(req, res, next) {
  let edition = {
    ISBN: req.body.ISBN
  };
  let success = true; // Flag to track success of all deletions

  for (const edi of req.body.Editions) {
    edition.EDITION_NUM = edi.EDITION_NUM;
    edition.NUM_OF_COPIES = edi.NUM_OF_COPIES;
    edition.PUBLISH_YEAR = edi.PUBLISH_YEAR;
    console.log(edition);
    try {
      const added = await addEditionDB(edition);
      if (!added) {
        success = false;
      }
    } catch (err) {
      next(err);
    }
  }
  if (success) {
    res.status(201).json({message: 'All Editions successfully added'});
  } else {
    res.status(404).json({message: 'Failed to add all Editions'});
  }
}


export async function addWrittenBy(req, res, next) {
  let written = {
    ISBN: req.body.ISBN
  };
  written = await deleteWittenByDB(written)
  let success = true; // Flag to track success of all deletions

  for (const edi of req.body.Authors) {
    written.AUTHOR_ID = edi.AUTHOR_ID;
    console.log(written);
    try {
      const added = await addWrittenByDB(written);
      if (!added) {
        success = false;
      }
    } catch (err) {
      next(err);
    }
  }
  if (success) {
    res.status(201).json({message: 'All Authors Successfully added'});
  } else {
    res.status(404).json({message: 'Failed to add all Authors'});
  }
}

export async function addBookGenre(req, res, next) {
  let genre = {
    ISBN: req.body.ISBN
  };
  genre = await deleteBookGenreDB(genre);
  let success = true; // Flag to track success of all deletions

  for (const edi of req.body.Genres) {
    genre.GENRE_ID = edi.GENRE_ID;
    console.log(genre);
    try {
      const added = await addBookGenreDB(genre);
      if (!added) {
        success = false;
      }
    } catch (err) {
      next(err);
    }
  }
  if (success) {
    res.status(201).json({message: 'All Genres Successfully added'});
  } else {
    res.status(404).json({message: 'Failed to add all Genres'});
  }
}
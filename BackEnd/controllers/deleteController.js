import {
  deleteAuthorDB,
  deleteBookDB,
  deleteGenreDB,
  deletePublisherDB,
  deleteRatRevBookDB,
  deleteRequestDB,
  getEditionDB,
  sendMessageDB,
  deleteMessageDB,
  deleteEditionDB,
  resignAdminDB,
  deleteEmployeeDB,
  getEmployeeDB,
  deleteJobDB,
  deleteApplyDB,
  getJobDB
} from "../Database/queryFunctions.js";

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
      res.status(402).json({message: "Can't reject own request"})
      return
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
      USER_ID: req.USER_ID,
      MESSAGE_ID: req.query.mid
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


export async function deleteBook(req, res, next) {
  try {
    let context = {};
    context.ISBN = req.query.id;
    let deleted = await deleteBookDB(context);

    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}


export async function deleteAuthor(req, res, next) {
  try {
    let deleted = {};
    deleted.AUTHOR_ID = req.query.aid;

    deleted = await deleteAuthorDB(deleted);
    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}

export async function resignAdmin(req, res, next) {
  try {
    let context = {};
    context.USER_ID = req.USER_ID;

    let deleted = await resignAdminDB(context);
    if (deleted) {
      context.MESSAGE = `You have successfully resigned from the ADMIN. You are still a user of the library. Thank you for your service to the library.`;
      deleted = await sendMessageDB(context);
      if (!deleted) {
        res.status(201).json({message: 'Successful but message not send'})
      } else {
        res.status(200).json({message: 'Successful'})
      }
    } else {
      res.status(404).json({message: 'Failed to resign'});
    }
  } catch (err) {
    next(err);
  }
}

export async function deletePublisher(req, res, next) {
  try {
    let deleted = {};

    deleted.PUBLISHER_ID = req.query.pid;

    deleted = await deletePublisherDB(deleted);
    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    let context = {};

    context.USER_ID = req.query.uid;
    const result = await getEmployeeDB(context);
    if(result.length > 0) {
      let deleted = await deleteEmployeeDB(context);
      if (deleted) {
        console.log(result);
        const jobTitle = (result[0] ? result[0].JOB_TITLE : 'UNKNOWN');
        const joinDate = (result[0] ? result[0].JOIN_DATE : 'UNKNOWN');
        context.MESSAGE = `You are fired from the JOB: {${jobTitle}}. You have worked at the Job since JOIN_DATE: {${joinDate}}. Please communicate with the admin for further query.`;
        deleted = await sendMessageDB(context);
        if (!deleted) {
          res.status(201).json({message: 'Successful but message not send'})
        } else {
          res.status(200).json({message: 'Successful'})
        }
      } else {
        res.status(404).json({message: 'Failed to delete'});
      }
    } else {
      res.status(404).json({message: 'No employee found'});
    }
  } catch (err) {
    next(err);
  }
}

export async function resignEmployee(req, res, next) {
  try {
    let context = {};

    context.USER_ID = req.USER_ID;
    const result = await getEmployeeDB(context);
    if(result.length > 0) {
      let deleted = await deleteEmployeeDB(context);
      if (deleted) {
        console.log(result);
        const jobTitle = (result[0] ? result[0].JOB_TITLE : 'UNKNOWN');
        const joinDate = (result[0] ? result[0].JOIN_DATE : 'UNKNOWN');
        context.MESSAGE = `You have successfully resigned from the JOB: {${jobTitle}}. You have worked at the Job since JOIN_DATE: {${joinDate}}. Thank you for your service to the library.`;
        deleted = await sendMessageDB(context);
        if (!deleted) {
          res.status(201).json({message: 'Successful but message not send'})
        } else {
          res.status(200).json({message: 'Successful'})
        }
      } else {
        res.status(404).json({message: 'Failed to delete'});
      }
    } else {
      res.status(404).json({message: 'No employee found'});
    }
  } catch (err) {
    next(err);
  }
}


export async function deleteGenre(req, res, next) {
  try {
    let deleted = {};

    deleted.GENRE_ID = req.query.gid;

    deleted = await deleteGenreDB(deleted);

    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteApply(req, res, next) {
  try {
    let deleted = {};

    deleted.USER_ID = req.USER_ID;
    deleted.JOB_ID = req.query.jid;

    deleted = await deleteApplyDB(deleted);

    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteApplication(req, res, next) {
  try {
    let deleted = {};

    deleted.USER_ID = req.body.USER_ID;
    deleted.JOB_ID = req.body.JOB_ID;

    deleted = await deleteApplyDB(deleted);
    if (deleted) {
      const result = await getJobDB(deleted);
      console.log(result);
      const jobTitle = (result[0] ? result[0].JOB_TITLE : 'UNKNOWN');
      deleted.MESSAGE = `Your application for the JOB: {${jobTitle}} is rejected. You can try again after sometime or can communicate with the admin. Please stay tuned with our library.`;
      deleted = await sendMessageDB(deleted);
      if (!deleted) {
        res.status(201).json({message: 'Successful but message not send'})
      } else {
        res.status(200).json({message: 'Successful'})
      }
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}


export async function deleteJob(req, res, next) {
  try {
    let deleted = {};

    deleted.JOB_ID = req.query.jid;

    deleted = await deleteJobDB(deleted);

    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteEdition(req, res, next) {
  try {
    let deleted = {};

    deleted.EDITION_ID = req.query.eid;

    deleted = await deleteEditionDB(deleted);

    if (deleted) {
      res.status(200).json({message: 'Successfully deleted'});
    } else {
      res.status(404).json({message: 'Failed to delete'});
    }
  } catch (err) {
    next(err);
  }
}

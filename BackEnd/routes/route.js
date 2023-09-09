import bodyParser from 'body-parser';
import Express from 'express';
import {verifyAdminToken, verifyGeneralToken, verifyUserToken, verifyEmployeeToken, verifyEmpAdmToken} from '../authentication/auth.js';
import {
  deleteAuthor,
  deleteBook,
  deleteGenre,
  deletePublisher,
  deleteRatRevBook,
  deleteRequests,
  deleteRequest,
  deleteMessage,
  deleteEdition,
  resignAdmin,
  deleteEmployee,
  resignEmployee,
  deleteJob,
  deleteApply,
  deleteApplication
} from '../controllers/deleteController.js';
import {
  getAllBookSum,
  getAllLanguages,
  getAllRatRevOfBook,
  getAuthor,
  getBookDetailsByID,
  getGenre,
  getOwnRatRev,
  getPublisher,
  getUserDetails,
  getMyRequests,
  getMyRentHistory,
  getMyFineHistory,
  getAllRequests,
  getRunningFine,
  getMyMessages,
  getAllNews,
  getAllUsers,
  getEdition,
  getAllBook,
  getEmployee,
  getJob,
  getApplication,
  getSearchBar,
  getNews,
  getRentHistory
} from '../controllers/getController.js';
import {loginGeneral, logout, postAdmin, postUser} from '../controllers/loginController.js';
import {
  addAuthor,
  addGenre,
  addPublisher,
  ratrevBook,
  postFavBook,
  addRequest,
  acceptRequest,
  sendMessage,
  publishNews,
  postBook,
  addEdition,
  addWrittenBy,
  addBookGenre,
  addJob,
  applyForJob,
  acceptApplication
} from '../controllers/postController.js';
import {
  updateAuthor,
  updateBook,
  updateGenre,
  updatePublisher,
  updateUser,
  updateHistory,
  updateMessage,
  updateEdition,
  updateJob
} from '../controllers/putController.js';

const router = Express.Router();
router.use(Express.json());
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.route('/book')
  .get(verifyGeneralToken, getBookDetailsByID)
  .post(verifyEmployeeToken, urlencodedParser, postBook)
  .put(verifyEmployeeToken, urlencodedParser, updateBook)
  .delete(verifyEmployeeToken, deleteBook);
router.route('/getEdition')
  .get(verifyGeneralToken, getEdition)
  .post(verifyEmployeeToken, urlencodedParser, addEdition)
  .put(verifyEmployeeToken, urlencodedParser, updateEdition)
  .delete(verifyEmployeeToken, deleteEdition)
router.route('/writtenBy')
  .post(verifyEmployeeToken, urlencodedParser, addWrittenBy)
router.route('/book-genre')
  .post(verifyEmployeeToken, urlencodedParser, addBookGenre)

router.route('/getPublisher')
  .get(verifyGeneralToken, getPublisher)
  .post(verifyEmployeeToken, urlencodedParser, addPublisher)
  .put(verifyEmployeeToken, urlencodedParser, updatePublisher)
  .delete(verifyEmployeeToken, deletePublisher)
router.route('/getAuthor')
  .get(verifyGeneralToken, getAuthor)
  .post(verifyEmployeeToken, urlencodedParser, addAuthor)
  .put(verifyEmployeeToken, urlencodedParser, updateAuthor)
  .delete(verifyEmployeeToken, deleteAuthor)
router.route('/getGenre')
  .get(verifyGeneralToken, getGenre)
  .post(verifyEmployeeToken, urlencodedParser, addGenre)
  .put(verifyEmployeeToken, urlencodedParser, updateGenre)
  .delete(verifyEmployeeToken, deleteGenre)
router.route('/getLanguage').get(verifyGeneralToken, getAllLanguages);

router.route('/user/signup').post(urlencodedParser, postUser);
router.route('/user/login').post(urlencodedParser, loginGeneral);
router.route('/user/update').put(verifyUserToken, urlencodedParser, updateUser);
router.route('/user/details').get(verifyUserToken, getUserDetails);
router.route('/all-users').get(verifyEmpAdmToken, getAllUsers);
router.route('/admin/signup').post(verifyAdminToken, urlencodedParser, postAdmin);
router.route('/admin/resign').delete(verifyAdminToken, resignAdmin);

router.route('/employee/resign').delete(verifyEmployeeToken, resignEmployee);
router.route('/employee')
  .get(verifyAdminToken, getEmployee)
  .delete(verifyAdminToken, deleteEmployee);
router.route('/apply')
  .post(verifyUserToken, urlencodedParser, applyForJob)
  .delete(verifyUserToken, deleteApply);
router.route('/application')
  .get(verifyAdminToken, getApplication)
  .post(verifyAdminToken, urlencodedParser, acceptApplication)
  .delete(verifyAdminToken, deleteApplication);
router.route('/getJob')
  .get(verifyUserToken, getJob)
  .post(verifyAdminToken, urlencodedParser, addJob)
  .put(verifyAdminToken, urlencodedParser, updateJob)
  .delete(verifyAdminToken, deleteJob);

router.route('/all-book').get(verifyGeneralToken, getAllBook);
router.route('/all-books-sum').get(verifyGeneralToken, urlencodedParser, getAllBookSum);
router.route('/search-bar').get(verifyGeneralToken, urlencodedParser, getSearchBar);
router.route('/all-rat-rev').get(verifyGeneralToken, getAllRatRevOfBook);
router.route('/edit-favourite').post(verifyUserToken, urlencodedParser, postFavBook);
router.route('/rate-review').post(verifyUserToken, urlencodedParser, ratrevBook).get(verifyUserToken, getOwnRatRev);
router.route('/del-rate-review').delete(verifyUserToken, deleteRatRevBook)
router.route('/my-requests').get(verifyUserToken, getMyRequests);
router.route('/request').post(verifyUserToken, urlencodedParser, addRequest);
router.route('/del-requests').delete(verifyUserToken, deleteRequests);
router.route('/my-rent-history').get(verifyUserToken, getMyRentHistory);
router.route('/my-fine-history').get(verifyUserToken, getMyFineHistory);
router.route('/return-book').put(verifyUserToken, urlencodedParser, updateHistory);
router.route('/all-requests').get(verifyEmpAdmToken, getAllRequests);
router.route('/handle-request').post(verifyEmployeeToken, urlencodedParser, acceptRequest).delete(verifyEmployeeToken, deleteRequest);
router.route('/message').post(verifyEmpAdmToken, urlencodedParser, sendMessage).get(verifyUserToken, getMyMessages)
router.route('/edit-message').put(verifyUserToken, updateMessage).delete(verifyUserToken, deleteMessage);
router.route('/publish-news').post(verifyEmployeeToken, urlencodedParser, publishNews).get(verifyUserToken, getAllNews)
router.route('/show-news').get(verifyGeneralToken, getNews);
router.route('/all-fine').get(verifyEmpAdmToken, getRunningFine);
router.route('/all-rent').get(verifyEmpAdmToken, getRentHistory);
router.route('/logout').get(verifyUserToken, logout);

export default router;
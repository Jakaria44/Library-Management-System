import bodyParser from 'body-parser';
import Express from 'express';
import { verifyAdminToken, verifyEmpAdmToken, verifyGeneralToken, verifyUserToken } from '../authentication/auth.js';
import {
  deleteApplication,
  deleteApply,
  deleteAuthor,
  deleteBook,
  deleteEdition,
  deleteEmployee,
  deleteGenre,
  deleteJob,
  deleteMessage,
  deletePublisher,
  deleteRatRevBook,
  deleteRequest,
  deleteRequests,
  resignAdmin,
  resignEmployee
} from '../controllers/deleteController.js';
import {
  getAllBook,
  getAllBookSum,
  getAllLanguages,
  getAllNews,
  getAllRatRevOfBook,
  getAllRequests,
  getAllUsers,
  getApplication,
  getAuthor,
  getBookDetailsByID,
  getEdition,
  getEmployee,
  getFineData,
  getGenre,
  getJob,
  getMyFineHistory,
  getMyMessages,
  getMyRentHistory,
  getMyRequests,
  getNews,
  getOwnRatRev,
  getPublisher,
  getRentData,
  getRentHistory,
  getRunningFine,
  getSearchBar,
  getUserDetails
} from '../controllers/getController.js';
import { loginGeneral, logout, postAdmin, postUser } from '../controllers/loginController.js';
import {
  acceptApplication,
  acceptRequest,
  addAuthor,
  addBookGenre,
  addEdition,
  addGenre,
  addJob,
  addPublisher,
  addRequest,
  addWrittenBy,
  applyForJob,
  postBook,
  postFavBook,
  publishNews,
  ratrevBook,
  sendMessage
} from '../controllers/postController.js';
import {
  updateAuthor,
  updateBook,
  updateEdition,
  updateGenre,
  updateHistory,
  updateJob,
  updateMessage,
  updatePublisher,
  updateUser
} from '../controllers/putController.js';

const router = Express.Router();
router.use(Express.json());
let urlencodedParser = bodyParser.urlencoded({extended: true});

router.route('/book')
  .get(verifyGeneralToken, getBookDetailsByID)
  .post(verifyEmpAdmToken, urlencodedParser, postBook)
  .put(verifyEmpAdmToken, urlencodedParser, updateBook)
  .delete(verifyEmpAdmToken, deleteBook);
router.route('/getEdition')
  .get(verifyGeneralToken, getEdition)
  .post(verifyEmpAdmToken, urlencodedParser, addEdition)
  .put(verifyEmpAdmToken, urlencodedParser, updateEdition)
  .delete(verifyEmpAdmToken, deleteEdition)
router.route('/writtenBy')
  .post(verifyEmpAdmToken, urlencodedParser, addWrittenBy)
router.route('/book-genre')
  .post(verifyEmpAdmToken, urlencodedParser, addBookGenre)

router.route('/getPublisher')
  .get(verifyGeneralToken, getPublisher)
  .post(verifyEmpAdmToken, urlencodedParser, addPublisher)
  .put(verifyEmpAdmToken, urlencodedParser, updatePublisher)
  .delete(verifyEmpAdmToken, deletePublisher)
router.route('/getAuthor')
  .get(verifyGeneralToken, getAuthor)
  .post(verifyEmpAdmToken, urlencodedParser, addAuthor)
  .put(verifyEmpAdmToken, urlencodedParser, updateAuthor)
  .delete(verifyEmpAdmToken, deleteAuthor)
router.route('/getGenre')
  .get(verifyGeneralToken, getGenre)
  .post(verifyEmpAdmToken, urlencodedParser, addGenre)
  .put(verifyEmpAdmToken, urlencodedParser, updateGenre)
  .delete(verifyEmpAdmToken, deleteGenre)
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
router.route('/handle-request').post(verifyEmpAdmToken, urlencodedParser, acceptRequest).delete(verifyEmpAdmToken, deleteRequest);
router.route('/message').post(verifyEmpAdmToken, urlencodedParser, sendMessage).get(verifyUserToken, getMyMessages)
router.route('/edit-message').put(verifyUserToken, updateMessage).delete(verifyUserToken, deleteMessage);
router.route('/publish-news').post(verifyEmpAdmToken, urlencodedParser, publishNews).get(verifyUserToken, getAllNews)
router.route('/show-news').get(verifyGeneralToken, getNews);
router.route('/all-fine').get(verifyEmpAdmToken, getRunningFine);
router.route('/all-rent').get(verifyEmpAdmToken, getRentHistory);
router.route('/rent-data').get(verifyAdminToken, getRentData);
router.route('/fine-data').get(verifyAdminToken, getFineData);
router.route('/logout').get(verifyUserToken, logout);

export default router;
import bodyParser from 'body-parser';
import Express from 'express';
import { verifyAdminToken, verifyGeneralToken, verifyUserToken } from '../authentication/auth.js';
import {
  deleteAllBooksBookshelf,
  deleteAuthor,
  deleteBook,
  deleteBookOfBookshelf,
  deleteBookshelf,
  deleteGenre,
  deletePublisher
} from '../controllers/deleteController.js';
import {
  getAllAuthors,
  getAllAwards,
  getAllBinds,
  getAllBookSum,
  getAllGenre,
  getAllLanguages,
  getAllPublishers,
  getAllRatRevOfBook,
  getAuthor,
  getAuthorBooks,
  getAvgRating,
  getBookByTitle,
  getBookDetailsByID,
  getBooksFromBookshelf,
  getBookshelves,
  getCompleteBook,
  getGenre,
  getGenreBook,
  getOwnReview,
  getPublisher,
  getPublisherBooks,
  getRating,
  getRecentBook,
  getTopBook,
  getUserDetails,
  getUserRatedBooks,
  getUserReviewedBooks
} from '../controllers/getController.js';
import { decodeToken, loginGeneral, logout, postAdmin, postUser } from '../controllers/loginController.js';
import {
  addAuthor,
  addBook,
  addGenre,
  addPublisher,
  advanceSearch,
  bookToBookshelf,
  rateBook,
  reviewBook,
  searchedBook,
  postFavBook,
  updateUserDetails
} from '../controllers/postController.js';
import {
  updateAdmin,
  updateAuthor,
  updateBook,
  updateGenre,
  updatePublisher,
  updateUser
} from '../controllers/putController.js';

const router = Express.Router();
router.use(Express.json());
let urlencodedParser = bodyParser.urlencoded({extended: true});


router.route('/book').get(verifyGeneralToken,getBookDetailsByID);
router.route('/all-books-sum').get(verifyGeneralToken,getAllBookSum);
router.route('/user/signup').post(urlencodedParser,postUser);
router.route('/user/login').post(urlencodedParser, loginGeneral);
router.route('/user/update').put(verifyUserToken, urlencodedParser, updateUser);

router.route('/admin/signup').post(urlencodedParser, postAdmin);
router.route('/all-rat-rev').get(verifyGeneralToken, getAllRatRevOfBook);
router.route('/edit-favourite').post(verifyGeneralToken, urlencodedParser, postFavBook);
router.route('/getPublisher').get(getPublisher);
router.route('/getAuthor').get(getAuthor);


router.route('/book/title').get(getBookByTitle);
router.route('/topBooks').get(getTopBook);
router.route('/recentBooks').get(getRecentBook);
router.route('/avg-rating').get(getAvgRating);


router.route('/user/details').get(verifyUserToken, getUserDetails).post(verifyUserToken, urlencodedParser, updateUserDetails);
//??
// router.route('/book').get(verifyGeneralToken, getBook).post(verifyAdminToken, urlencodedParser, postBook);
router.route('/all-authors').get(getAllAuthors);
router.route('/all-publishers').get(getAllPublishers);
router.route('/get-all-genre').get(getAllGenre);

///////////////////////
router.route('/getGenre').get(verifyGeneralToken, getGenre);
router.route('/complete-book').get(verifyGeneralToken, getCompleteBook);
router.route('/search-book').post(verifyUserToken, urlencodedParser, searchedBook);
router.route('/getGenreBook/:name?').get(verifyUserToken, getGenreBook);
// router.route('/user/signup').post(urlencodedParser, postUser);
// router.route('/employee/signup').post(urlencodedParser, postEmployee);
// router.route('/general/login').post(urlencodedParser, loginGeneral);
// router.route('/user/login').post(urlencodedParser, loginUser);
// router.route('/admin/login').post(urlencodedParser, loginAdmin);
// router.route('/employee/login').post(urlencodedParser, loginEmployee);

router.route('/decode').get(verifyGeneralToken, decodeToken);
router.route('/logout').get(verifyGeneralToken, logout);
router.route('/bookshelves').get(verifyUserToken, getBookshelves);
router.route('/book-bookshelf').post(verifyUserToken, urlencodedParser, bookToBookshelf).get(verifyUserToken, getBooksFromBookshelf);
// router.route('/create-bookshelf').post(verifyUserToken, urlencodedParser, createBookshelf);
router.route('/rate').post(verifyUserToken, urlencodedParser, rateBook).get(verifyUserToken, getRating);
router.route('/review').post(verifyUserToken, urlencodedParser, reviewBook).get(verifyUserToken, getOwnReview);
router.route('/get-all-awards').get(verifyGeneralToken, getAllAwards);
router.route('/get-all-languages').get(verifyUserToken, getAllLanguages);
router.route('/get-all-binds').get(verifyUserToken, getAllBinds);
router.route('/advance-search').post(verifyUserToken, urlencodedParser, advanceSearch);
router.route('/del-book-bookshelf').delete(verifyUserToken, deleteBookOfBookshelf);
router.route('/del-all-books-bookshelf').delete(verifyUserToken, deleteAllBooksBookshelf);
router.route('/del-bookshelf').delete(verifyUserToken, deleteBookshelf);
// router.route('/rename-bookshelf').put(verifyUserToken, urlencodedParser, renameBookshelf);

router.route('/addBook').post(verifyAdminToken, urlencodedParser, addBook);
router.route('/updateBook').put(verifyAdminToken, urlencodedParser, updateBook);
router.route('/deleteBook').delete(verifyAdminToken, deleteBook);


router.route('/addAuthor').post(verifyAdminToken, urlencodedParser, addAuthor);
router.route('/addPublisher').post(verifyAdminToken, urlencodedParser, addPublisher);
router.route('/addGenre').post(verifyAdminToken, urlencodedParser, addGenre);

router.route('/updatePublisher').put(verifyAdminToken, urlencodedParser, updatePublisher);
router.route('/updateAuthor').put(verifyAdminToken, urlencodedParser, updateAuthor);
router.route('/updateGenre').put(verifyAdminToken, urlencodedParser, updateGenre);

router.route('/deleteGenre').delete(verifyAdminToken, deleteGenre);
router.route('/deletePublisher').delete(verifyAdminToken, deletePublisher);
router.route('/deleteAuthor').delete(verifyAdminToken, deleteAuthor);

router.route('/getAuthorBooks').get(verifyGeneralToken, getAuthorBooks);
router.route('/getPublisherBooks').get(verifyGeneralToken, getPublisherBooks);
router.route('/getUserRatedBooks').get(verifyUserToken, getUserRatedBooks);
router.route('/getUserReviewedBooks').get(verifyUserToken, getUserReviewedBooks);


router.route('/updateUser').put(verifyUserToken, urlencodedParser, updateUser);

router.route('/updateAdmin').put(verifyAdminToken, urlencodedParser, updateAdmin);


export default router;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {secret} from '../Database/databaseConfiguration.js';
import {
  findAdminDB,
  findEmployeeDB,
  findUserDB,
  postAdminDB,
  postUserDB,
  deleteEmployeeDB,
  sendMessageDB,
  getEmployeeDB
} from '../Database/queryFunctions.js';

export async function loginGeneral(req, res, next) {
  try {
    console.log(req.body);
    const user = {
      EMAIL: req.body.email,
      PASSWORD: req.body.password,
    };
    console.log(user);
    const foundUser = await findUserDB(user);
    console.log(foundUser);
    if (foundUser.length === 0) {
      return res.status(401).json({message: 'Email does not exist', auth: false, token: null, role: null});
    }
    let foundAdmin, foundEmployee;
    let passwordIsValid = false;
    try {
      foundAdmin = await findAdminDB(foundUser[0]);
      foundEmployee = await findEmployeeDB(foundUser[0]);
      passwordIsValid = await bcrypt.compare(user.PASSWORD, foundUser[0].PASSWORD);
    } catch (err) {
      return res.status(404).json({message: 'Something went wrong', auth: false, token: null, role: null});
    }
    // console.log(passwordIsValid)
    if (passwordIsValid) {
      const temp = {};
      temp.USER_ID = foundUser[0].USER_ID;

      if (foundAdmin.length > 0) temp.ROLE = 'admin';
      else if (foundEmployee.length > 0) temp.ROLE = 'employee';
      else temp.ROLE = 'user';

      const token = jwt.sign(temp, secret, {expiresIn: '20000h'});
      console.log("in login", temp.USER_ID, temp.ROLE, token);
      res.status(200).json({auth: true, token: token, role: temp.ROLE});
    } else {
      res.status(406).json({message: "Wrong Password", auth: false, token: null, role: null});
    }
  } catch (err) {
    return res.status(404).json({message: 'Something went wrong', auth: false, token: null, role: null});
  }
}

export async function postUser(req, res, next) {
  try {
    const emailToLow = req.body.email?.toLowerCase();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = {
      FIRST_NAME: req.body.firstName,
      LAST_NAME: req.body.lastName,
      IMAGE: req.body.image,
      ADDRESS: req.body.address,
      EMAIL: emailToLow,
      PASSWORD: hashedPassword,
      CONTACT_NO: req.body.contactNo,
      GENDER: req.body.gender,
    };
    // console.log(user);
    user = await postUserDB(user);

    if (user) {
      const foundUser = await findUserDB(user);
      if (foundUser.length > 0) {
        let welcome = {};
        welcome.USER_ID = foundUser[0].USER_ID;
        welcome.MESSAGE = `Hi!! ${foundUser[0].FIRST_NAME} ${foundUser[0].LAST_NAME}. Welcome to the library!!! Please explore the library and satisfy your thirst of knowledge.`;
        welcome = await sendMessageDB(welcome);
        if (!welcome) {
          console.log({message: 'Successfully created but message not send'})
        } else {
          console.log({message: 'Successfully created'})
        }
        const token = jwt.sign({USER_ID: foundUser[0].USER_ID, ROLE: 'user'}, secret, {expiresIn: '20000h'});
        res.status(200).json({auth: true, token, role: 'user'});
      } else {
        res.status(401).json({message: 'Failed to create user', auth: false, token: null, role: null,});
      }
    } else {
      res.status(402).json({message: 'Email already Exists or Input is incorrect', auth: false, token: null, role: null,});
    }
  } catch (err) {
    res.status(404).json({message: 'Something went wrong', auth: false, token: null, role: null});
  }
}

export async function postAdmin(req, res, next) {
  try {
    const user = {};
    user.USER_ID = req.query.uid;

    const result = await getEmployeeDB(user);
    if (result.length > 0) {
      let admin = await postAdminDB(user);
      if (admin) {
        admin = await deleteEmployeeDB(user);
        const jobTitle = (result[0] ? result[0].JOB_TITLE : 'UNKNOWN');
        const joinDate = (result[0] ? result[0].JOIN_DATE : 'UNKNOWN');
        user.MESSAGE = `Congratulations!!! You are promoted to ADMIN. You have worked at the JOB: {${jobTitle}} since JOIN_DATE: {${joinDate}}. Welcome to the Admin Panel.`;
        admin = await sendMessageDB(user);
        if (!admin) {
          res.status(201).json({message: 'Successfully promoted but message not send'})
        } else {
          res.status(200).json({message: 'Successfully promoted'})
        }
      } else {
        res.status(402).json({message: 'Failed to promote'});
      }
    } else {
      res.status(404).json({message: 'Only Employee can be promoted to Admin'});
    }
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.status(200).json({auth: false, token: null, role: null});
}

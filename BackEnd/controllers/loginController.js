import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';
import {
  findAdminDB,
  findEmployeeDB,
  findPersonDB,
  findUserDB,
  postAdminDB,
  postUserDB,
} from '../Database/queryFunctions.js';

export async function loginGeneral(req, res, next) {
  try {
    console.log(req.body);
    const user = {
      EMAIL: req.body.email,
      PASSWORD: req.body.password,
    };
    // console.log(user);

    let foundAdmin, foundEmployee;
    const foundUser = await findUserDB(user);
    console.log(foundUser);
    if (foundUser.length === 0) {
      return res.status(404).json({message: 'Cannot find user', auth: false, token: null, role: null});
    }
    if (foundUser.length) {
      try {
        foundAdmin = await findAdminDB(foundUser[0]);
        foundEmployee = await findEmployeeDB(foundUser[0]);

      } catch (err) {
        res.status(500).send(err.message);
      }
    }
    let passwordIsValid = false;
    console.log(foundAdmin);
    try {

      passwordIsValid = await bcrypt.compare(user.PASSWORD, foundUser[0].PASSWORD);
    } catch (err) {
      res.status(500).send(err.message);
    }

    console.log(passwordIsValid)
    if (passwordIsValid) {
      const temp = {};
      temp.USER_ID = foundUser[0].USER_ID;
      temp.ROLE = 'user';
      if (foundEmployee.length > 0) temp.ROLE = 'employee';
      if (foundAdmin.length > 0) temp.ROLE = 'admin';
      const token = jwt.sign(temp, secret, {expiresIn: '24h'}); // expires in 24 hours
      console.log("in login", temp.USER_ID, temp.ROLE, token);
      res.status(200).json({auth: true, token: token, role: temp.ROLE});
    } else {

      res.status(401).json({message: "Wrong Password", auth: false, token: null, role: null});
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
}

// export async function loginUser(req, res, next) {
//     try {
//         var user = {
//             USER_NAME: req.body.USER_NAME,
//             PASSWORD: req.body.PASSWORD
//         };

//         const foundUser = await findUserDB(user);

//         if (foundUser.length === 0) {
//             return res.status(400).send('Cannot find user');
//         } else {
//             try {
//                 var passwordIsValid = bcrypt.compareSync(
//                     req.body.PASSWORD,
//                     foundUser[0].PASSWORD
//                 );

//                 if (passwordIsValid) {
//                     var token = jwt.sign({
//                         PERSON_ID: foundUser[0].PERSON_ID,
//                         USER_NAME: foundUser[0].USER_NAME,
//                         ROLE: 'user'
//                     }, secret, {
//                         expiresIn: 86400 // expires in 24 hours
//                     });
//                     res.status(200).json({auth: true, token: token});
//                 } else {
//                     res.status(401).json({auth: false, token: null});
//                 }
//             } catch (err) {
//                 res.status(500).send(err.message);
//             }
//         }

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }

// export async function loginAdmin(req, res, next) {
//     try {
//         var admin = {
//             ADMIN_NAME: req.body.ADMIN_NAME,
//             PASSWORD: req.body.PASSWORD
//         };

//         const foundAdmin = await findAdminDB(admin);

//         if (foundAdmin.length === 0) {
//             return res.status(400).send('Cannot find admin');
//         } else {
//             try {
//                 var passwordIsValid = bcrypt.compareSync(
//                     req.body.PASSWORD,
//                     foundAdmin[0].PASSWORD
//                 );
//                 if (passwordIsValid) {
//                     var token = jwt.sign({
//                         PERSON_ID: foundAdmin[0].PERSON_ID,
//                         ADMIN_NAME: foundAdmin[0].ADMIN_NAME,
//                         ROLE: 'admin'
//                     }, secret, {
//                         expiresIn: 86400 // expires in 24 hours
//                     });
//                     res.status(200).json({auth: true, token: token});
//                 } else {
//                     res.status(401).json({auth: false, token: null});
//                 }
//             } catch (err) {
//                 res.status(500).send(err.message);
//             }
//         }

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }

export async function postUser(req, res, next) {
  try {
    // console.log(req.body);
    let emailToLow = null;
    if (req.body.email) {
      emailToLow = req.body.email.toLowerCase();
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // :FIRST_NAME,:LAST_NAME,:IMAGE,:ADDRESS,:EMAIL,:PASSWORD,:CONTACT_NO,:GENDER
    const user = {
      FIRST_NAME: req.body.firstName,
      LAST_NAME: req.body.lastName,
      IMAGE: req.body.image,
      ADDRESS: req.body.address,
      EMAIL: emailToLow,
      PASSWORD: hashedPassword,
      CONTACT_NO: req.body.contactNo,
      GENDER: req.body.gender,
    };
    let foundUser = null;

    try {

    } catch (err) {
      res.status(500).send(err.message);
    }
    const result = await postUserDB(user);
    if (user !== result) {
      throw new Error(result);
    }

    foundUser = await findUserDB(user);

    const token = jwt.sign(
      {
        USER_ID: foundUser[0].USER_ID,
        ROLE: 'user',
      },
      secret,
      {
        expiresIn: 86400, // expires in 24 hours
      },
    );
    res.status(200).json({auth: true, token, role: 'user'});
  } catch (err) {
    res.status(500).json({
      message: 'Email already Exists.',
      auth: false,
      token: null,
      role: null,
    });
  }
}

export async function postAdmin(req, res, next) {
  try {
    let emailToLow = null;
    if (req.body.email) {
      emailToLow = req.body.email.toLowerCase();
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // :FIRST_NAME,:LAST_NAME,:IMAGE,:ADDRESS,:EMAIL,:PASSWORD,:CONTACT_NO,:GENDER
    const user = {
      FIRST_NAME: req.body.firstName,
      LAST_NAME: req.body.lastName,
      IMAGE: req.body.image,
      ADDRESS: req.body.address,
      EMAIL: emailToLow,
      PASSWORD: hashedPassword,
      CONTACT_NO: req.body.contactNo,
      GENDER: req.body.gender,
    };

    const admin = await postAdminDB(user);
    const foundUser = await findUserDB(admin);
    const foundAdmin = await findAdminDB(foundUser[0]);

    const token = jwt.sign(
      {
        USER_ID: foundAdmin[0].USER_ID,
        ROLE: 'admin',
      },
      secret,
      {
        expiresIn: 86400, // expires in 24 hours
      },
    );
    res.status(200).json({auth: true, token, role: 'admin'});
  } catch (err) {
    res.status(500).json({
      message: 'Email already Exists.',
      auth: false,
      token: null,
      role: null,
    });
  }
}

export async function decodeToken(req, res) {
  try {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({auth: false, message: 'No token provided.'});

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(500).json({auth: false, message: 'Failed to authenticate token.'});
      }
      if (decoded.ROLE === 'user') {
        const user = {
          USER_NAME: decoded.USER_NAME,
        };

        const foundUser = await findUserDB(user);
        foundUser[0].PASSWORD = null;

        if (foundUser.length === 0) {
          return res.status(400).send('Cannot find user');
        }

        const foundPerson = await findPersonDB(foundUser[0].PERSON_ID);

        if (foundPerson.length === 0) {
          return res.status(400).send('Cannot find user');
        }

        foundPerson[0].USER_NAME = foundUser[0].USER_NAME;

        res.status(200).json(foundPerson);
      } else {
        const admin = {
          ADMIN_NAME: decoded.ADMIN_NAME,
        };

        const foundAdmin = await findAdminDB(admin);
        foundAdmin[0].PASSWORD = null;

        if (foundAdmin.length === 0) {
          return res.status(400).send('Cannot find admin');
        }

        const foundPerson = await findPersonDB(foundAdmin[0].PERSON_ID);

        if (foundPerson.length === 0) {
          return res.status(400).send('Cannot find admin');
        }

        foundPerson[0].ADMIN_NAME = foundAdmin[0].ADMIN_NAME;

        res.status(200).json(foundPerson);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export function logout(req, res) {
  res.status(200).json({auth: false, token: null});
}

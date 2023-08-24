import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {secret} from '../Database/databaseConfiguration.js';
import {
    findAdminDB,
    findEmployeeDB,
    findPersonDB,
    findUserDB,
    postAdminDB,
    postUserDB
} from '../Database/queryFunctions.js';


export async function loginGeneral(req, res, next) {
    try {
        console.log(req.body);
        var user = {
            EMAIL: req.body.EMAIL,
            PASSWORD: req.body.PASSWORD
        };

        const foundUser = await findUserDB(user);
        const foundAdmin = await findAdminDB(foundUser[0]);
        const foundEmployee = await findEmployeeDB(foundUser[0]);
        console.log(foundAdmin);
        if (foundUser.length === 0) {
            return res.status(400).send('Cannot find user');
        } else {
            try {
                var passwordIsValid = bcrypt.compareSync(
                    req.body.PASSWORD,
                    foundUser[0].PASSWORD
                );

                if (passwordIsValid) {
                    let temp = {};
                    temp.USER_ID = foundUser[0].USER_ID;
                    temp.ROLE = 'user';
                    if (foundEmployee.length > 0) temp.ROLE = 'employee';
                    if (foundAdmin.length > 0) temp.ROLE = 'admin';
                    var token = jwt.sign(temp, secret, { expiresIn: '24h' }); // expires in 24 hours
                    res.status(200).json({auth: true, token: token, rule: temp.ROLE});
                } else {
                    res.status(401).json({auth: false, token: null, rule: null});
                }
            } catch (err) {
                res.status(500).send(err.message);
            }
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

//         if (foundUser.length == 0) {
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

//         if (foundAdmin.length == 0) {
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
        if (req.body.EMAIL) {
            emailToLow = req.body.EMAIL.toLowerCase();
        }
        const hashedPassword = await bcrypt.hashSync(req.body.PASSWORD, 10)
        // :FIRST_NAME,:LAST_NAME,:IMAGE,:ADDRESS,:EMAIL,:PASSWORD,:CONTACT_NO,:GENDER
        var user = {
            FIRST_NAME: req.body.FIRST_NAME,
            LAST_NAME: req.body.LAST_NAME,
            IMAGE: req.body.IMAGE,
            ADDRESS: req.body.ADDRESS,
            EMAIL: emailToLow,
            PASSWORD: hashedPassword,
            CONTACT_NO: req.body.CONTACT_NO,
            GENDER: req.body.GENDER
        };

        user = await postUserDB(user);
        const foundUser = await findUserDB(user);

        var token = jwt.sign({
            USER_ID: foundUser[0].USER_ID,
            ROLE: 'user'
        }, secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({auth: true, token: token, rule: 'user'});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postAdmin(req, res, next) {
    try {
        console.log(1)
        console.log(req.body);
        let emailToLow = null;
        if (req.body.EMAIL) {
            emailToLow = req.body.EMAIL.toLowerCase();
        }
        const hashedPassword = await bcrypt.hashSync(req.body.PASSWORD, 10)
        // :FIRST_NAME,:LAST_NAME,:IMAGE,:ADDRESS,:EMAIL,:PASSWORD,:CONTACT_NO,:GENDER
        var user = {
            FIRST_NAME: req.body.FIRST_NAME,
            LAST_NAME: req.body.LAST_NAME,
            IMAGE: req.body.IMAGE,
            ADDRESS: req.body.ADDRESS,
            EMAIL: emailToLow,
            PASSWORD: hashedPassword,
            CONTACT_NO: req.body.CONTACT_NO,
            GENDER: req.body.GENDER
        };

        user = await postAdminDB(user);
        const foundUser = await findUserDB(user);
        const foundAdmin = await findAdminDB(foundUser[0]);

        var token = jwt.sign({
            USER_ID: foundAdmin[0].USER_ID,
            ROLE: 'admin'
        }, secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({auth: true, token: token, rule: 'admin'});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function decodeToken(req, res) {
    try {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({auth: false, message: 'No token provided.'});

        jwt.verify(token, secret, async function (err, decoded) {
            if (err) return res.status(500).json({auth: false, message: 'Failed to authenticate token.'});
            if (decoded.ROLE === 'user') {
                var user = {
                    USER_NAME: decoded.USER_NAME
                };

                const foundUser = await findUserDB(user);
                foundUser[0].PASSWORD = null;

                if (foundUser.length == 0) {
                    return res.status(400).send('Cannot find user');
                }

                const foundPerson = await findPersonDB(foundUser[0].PERSON_ID);

                if (foundPerson.length == 0) {
                    return res.status(400).send('Cannot find user');
                }

                foundPerson[0].USER_NAME = foundUser[0].USER_NAME;

                res.status(200).json(foundPerson);
            } else {
                var admin = {
                    ADMIN_NAME: decoded.ADMIN_NAME
                };

                const foundAdmin = await findAdminDB(admin);
                foundAdmin[0].PASSWORD = null;

                if (foundAdmin.length == 0) {
                    return res.status(400).send('Cannot find admin');
                }

                const foundPerson = await findPersonDB(foundAdmin[0].PERSON_ID);

                if (foundPerson.length == 0) {
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
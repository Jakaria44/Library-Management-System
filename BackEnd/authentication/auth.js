import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';

export function verifyUserToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    if (decoded.ROLE === 'user') {
      req.USER_ID = decoded.USER_ID;
      next();
    } else {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
  });
}

export function verifyAdminToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    if (decoded.ROLE === 'admin') {
      req.USER_ID = decoded.USER_ID;
      next();
    } else {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
  });
}

export function verifyEmployeeToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    if (decoded.ROLE === 'employee') {
      req.USER_ID = decoded.USER_ID;
      next();
    } else {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
  });
}

export function verifyGeneralToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }

      if (decoded.ROLE === 'user') {
        req.USER_ID = decoded.USER_ID;
        next();
      } else if (decoded.ROLE === 'admin') {
        req.USER_ID = decoded.USER_ID;
        next();
      } else if (decoded.ROLE === 'employee') {
        req.USER_ID = decoded.USER_ID;
        next();
      } else {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
    });
  }
}

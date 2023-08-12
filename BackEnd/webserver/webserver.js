import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import Router from '../routes/route.js';

dotenv.config();

let httpServer;

export function initialize() {
  return new Promise((resolve, reject) => {
    const app = Express();
    httpServer = http.createServer(app);
    app.use(morgan('combined'));
    app.use(cors());
    app.use('/db-api', Router);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({extended: true}));


    httpServer.listen(process.env.port, err => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Web server listening on localhost:${process.env.port}`);

      resolve();
    });
  });
}

export function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}



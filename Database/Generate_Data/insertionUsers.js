const fs = require('fs');
const oracledb = require('oracledb');

let count = 0;
// Read the JSON data from the file
const jsonData = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Database connection configuration
const dbConfig = {
  user: 'c##library',
  password: 'library',
  connectString: 'localhost:1521/orcl',
};

(async () => {
  let connection;

  try {
    // Establish a database connection
    connection = await oracledb.getConnection(dbConfig);

    async function getUserId(data) {
      let result = await connection.execute(`SELECT USER_ID
                                             FROM "USER"
                                             WHERE LOWER(EMAIL) = LOWER('${data.email}')`, {});
      if (result.rows.length === 0) {
        result = await connection.execute(
          `INSERT INTO "USER" (First_Name, Last_Name, Image, Email, Password, Contact_No, Gender)
           VALUES ('${data.firstName}', '${data.lastName}', '${data.image}', '${data.email}',
                   '$2b$10$e6uHakkTTg6GcieRru5kcu9Eh.DwBAdLqMPK/IG2LdNLntmN4EFk.', '${data.phone}',
                   UPPER(SUBSTR('${data.gender}', 0, 1)))`,
          {})
        result = await connection.execute(`SELECT USER_ID
                                           FROM "USER"
                                           WHERE LOWER(EMAIL) = LOWER('${data.email}')`, {});
        return result.rows[0][0];
      }
      return null;
    }

    async function updateUser(data) {
      let result = await connection.execute(`SELECT USER_ID
                                             FROM "USER"
                                             WHERE LOWER(EMAIL) = LOWER('${data.email}')`, {});
      if (result.rows.length > 0) {
        // const address = data.address.address?data.address.address:'address';
        // const city = data.address.city?data.address.city:'city';
        // const state = data.address.state?data.address.state:'state';
        // await connection.execute(
        //   `UPDATE "USER"
        //   SET ADDRESS = '${address}'||', '||'${city}'||', '||'${state}'|| ', USA'
        //   WHERE LOWER(EMAIL) = LOWER('${data.email}')`,
        //   {})
        return result.rows[0][0];
      }
      return null;
    }

    async function getIsbns() {
      let result = await connection.execute(
        'SELECT ISBN FROM BOOK',
        {}
      );
      return result.rows.map((row) => row[0]);
    }

    async function getJobs() {
      let result = await connection.execute(
        'SELECT JOB_ID FROM JOB',
        {}
      );
      return result.rows.map((row) => row[0]);
    }

    const isbns = await getIsbns();
    // console.log(isbns);

    const jobs = await getJobs();

    // console.log(jobs);

    async function getEditionsId(isbn) {
      let result = await connection.execute(
        'SELECT Edition_ID FROM EDITION WHERE ISBN = :isbn',
        {isbn}
      );
      return result.rows.map((row) => row[0]);
    }

    function getRandomIsbn() {
      return isbns[Math.floor(Math.random() * isbns.length)];
    }

    function getRandomJob() {
      return jobs[Math.floor(Math.random() * jobs.length)];
    }

    function getRandomDate() {
      const currentDate = new Date();
      const pastYear = 365 * 24 * 60 * 60 * 1000; // Milliseconds in a year
      const randomTime = Math.random() * pastYear;
      const randomDate = new Date(currentDate - randomTime)
      return randomDate;
    }

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    async function getRentId(uid, eid) {
      let result = await connection.execute(
        `SELECT Rent_History_ID
         FROM RENT_HISTORY
         WHERE User_ID = ${uid}
           AND Edition_ID = ${eid}`,
        {}
      );
      return result.rows[0][0];
    }

    // Iterate through the JSON data and insert records into the database
    for (const user of jsonData) {
      console.log(user.id, count);

      try {
        let uid = await updateUser(user);
        console.log(uid);
        if(!uid) continue;
        await connection.execute(
          `DELETE FROM EMPLOYEE WHERE User_ID = ${uid}`,
          {}
        );
        console.log(uid);

        await connection.execute(
          `DELETE FROM APPLY WHERE User_ID = ${uid}`,
          {}
        );
        console.log(uid);

        let n = Math.floor(Math.random() * 4);
        for (let i = 0; i < n; i++) {
          let job = getRandomJob();
          let date = formatDate(getRandomDate())
          console.log(uid, job, date)
          if (!(uid % job) && !i) {
            await connection.execute(
              `INSERT INTO EMPLOYEE (User_ID, Job_ID, Join_Date)
               VALUES (:user_id, :job, TO_DATE('${date}', 'YYYY-MM-DD'))`,
              {user_id: uid, job}
            );
          } else {
            await connection.execute(
              `INSERT INTO APPLY (User_ID, Job_ID, Apply_Date)
               VALUES (:user_id, :job, TO_DATE('${date}', 'YYYY-MM-DD'))`,
              {user_id: uid, job}
            );
          }
        }

        await connection.commit();

        // let uid = await getUserId(user);
        // if (uid === null) {
          continue;
        // }



        console.log('a', uid);

        // let n = Math.round(Math.random() * 5);
        for (let i = 0; i < n; i++) {
          let isbn = getRandomIsbn();
          let editions = await getEditionsId(isbn);
          console.log(isbn, editions);

          let a = {
            edition: editions[Math.floor(Math.random() * editions.length)],
            user_id: uid,
            date: formatDate(getRandomDate())
          };
          await connection.execute(
            `INSERT INTO REQUEST (Edition_ID, User_ID, Request_Date)
             VALUES (${a.edition}, ${a.user_id}, TO_DATE('${a.date}', 'YYYY-MM-DD'))`,
            {}
          );
        }
        console.log('b', uid);

        n = Math.round(Math.random() * 10);
        for (let i = 0; i < n; i++) {
          let isbn = getRandomIsbn();
          // let editions = await getEditionsId(isbn);
          await connection.execute(
            'INSERT INTO FAVOURITE (ISBN, User_ID) VALUES (:isbn, :user_id)',
            {isbn, user_id: uid}
          );
        }
        console.log('c', uid);

        n = Math.round(Math.random() * 10);
        for (let i = 0; i < n; i++) {
          let isbn = getRandomIsbn();
          // let editions = await getEditionsId(isbn);
          let date = formatDate(getRandomDate())
          await connection.execute(
            `INSERT INTO REVIEW_RATING (ISBN, User_ID, Rating, Review, Edit_Date)
             VALUES (:isbn, :user_id, :rating, :review, TO_DATE('${date}', 'YYYY-MM-DD'))`,
            {
              isbn,
              user_id: uid,
              rating: Math.random() * 5,
              review: 'I love this book'
            }
          );
        }
        console.log('d', uid);


        n = Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
          let job = getRandomJob();
          let date = formatDate(getRandomDate())
          if (!(uid % job) && !i) {
            await connection.execute(
              `INSERT INTO EMPLOYEE (User_ID, Job_ID, Join_Date)
               VALUES (:user_id, :job, TO_DATE('${date}', 'YYYY-MM-DD'))`,
              {user_id: uid, job}
            );
          } else {
            await connection.execute(
              `INSERT INTO APPLY (User_ID, Job_ID, Apply_Date)
               VALUES (:user_id, :job, TO_DATE('${date}', 'YYYY-MM-DD'))`,
              {user_id: uid, job}
            );
          }
        }
        console.log('e', uid);

        n = Math.round(Math.random() * 10);
        for (let i = 0; i < n; i++) {
          let isbn = getRandomIsbn();
          let editions = await getEditionsId(isbn);
          let eid = editions[Math.floor(Math.random() * editions.length)];
          let date = getRandomDate();
          
          let date2 = new Date(date + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30))
          console.log(i, date, date2);
          let status = Math.floor(Math.random() * 2 + 0.2);
          console.log(i, {
            edition: eid,
            user_id: uid,
            status: status
          })
          if (status < 2) {
            await connection.execute(
              `INSERT INTO RENT_HISTORY (Edition_ID, User_ID, Rent_Date, Return_Date, Status)
               VALUES (:edition, :user_id, TO_DATE('${formatDate(date)}', 'YYYY-MM-DD'),
                       TO_DATE('${formatDate(date2)}', 'YYYY-MM-DD'), :status)`,
              {
                edition: eid,
                user_id: uid,
                status: status
              }
            );
          } else {
            status = Math.floor(Math.random() * 2);
            await connection.execute(
              `INSERT INTO RENT_HISTORY (Edition_ID, User_ID, Rent_Date, Return_Date, Status)
               VALUES (:edition, :user_id, TO_DATE('${formatDate(date)}', 'YYYY-MM-DD'),
                       TO_DATE('${formatDate(date2)}', 'YYYY-MM-DD'), :status)`,
              {
                edition: eid,
                user_id: uid,
                status
              }
            );
            console.log('fine', i, date, date2);
            const rid = await getRentId(uid, eid);
            if (!status) {
              date = null;
            } else {
              date = new Date(date2 + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30))
            }
            console.log('fine', i, rid, date, date2);
            if (date) {
              await connection.execute(
                `INSERT INTO FINE_HISTORY (Rent_History_ID, Start_Date, Payment_Date, Fee_Amount)
                 VALUES (:rid, TO_DATE('${formatDate(date2)}', 'YYYY-MM-DD'),
                         TO_DATE('${formatDate(date)}', 'YYYY-MM-DD'), :fee)`,
                {rid, fee: Math.floor(Math.random() * 45 + 5)}
              );
            } else {
              `INSERT INTO FINE_HISTORY (Rent_History_ID, Start_Date, Fee_Amount)
               VALUES (:rid, TO_DATE('${formatDate(date2)}', 'YYYY-MM-DD'), :fee)`,
                {rid, fee: Math.floor(Math.random() * 45 + 5)}
            }
          }
        }
        console.log('f', uid);

        count += 1;
        await connection.commit();
      } catch (e) {
        console.log(e);
        await connection.rollback();
        continue;
      }
    }

    // Commit the transaction
    await connection.commit();

  } catch (error) {
    console.error('Error:', error);
    // Rollback the transaction in case of an error
    if (connection) {
      await connection.rollback();
    }
  } finally {
    // Close the cursor and connection
    if (connection) {
      await connection.close();
    }
  }
})();

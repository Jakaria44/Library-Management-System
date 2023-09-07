const fs = require('fs');
const oracledb = require('oracledb');

// Read the JSON data from the file
const jsonData = JSON.parse(fs.readFileSync('books.json', 'utf8'));

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

    // Helper function to insert a new publisher or get the existing one
    async function getPublisherId(publisherName) {
      let result = await connection.execute(
        'SELECT Publisher_ID FROM PUBLISHER WHERE Name = :name',
        { name: publisherName }
      );
      if (result.rows.length === 0) {
        await connection.execute(
          'INSERT INTO PUBLISHER (Name, Email) VALUES (:name, :email)',
          { name: publisherName, email: 'example@gmail.com' }
        );
        result = await connection.execute(
          'SELECT Publisher_ID FROM PUBLISHER WHERE Name = :name',
          { name: publisherName }
        );
      }
      return result.rows[0][0];
    }

    // Helper function to insert a new author or get the existing one
    async function getAuthorId(authorName) {
      let result = await connection.execute(
        'SELECT Author_ID FROM AUTHOR WHERE Name = :name',
        { name: authorName }
      );
      if (result.rows.length === 0) {
        await connection.execute(
          'INSERT INTO AUTHOR (Name, DoB) VALUES (:name, :dob)',
          { name: authorName, dob: '0001-01-01' }
        );
        result = await connection.execute(
          'SELECT Author_ID FROM AUTHOR WHERE Name = :name',
          { name: authorName }
        );
      }
      return result.rows[0][0];
    }

    // Helper function to insert a new genre or get the existing one
    async function getGenreId(genreName) {
      let result = await connection.execute(
        'SELECT Genre_ID FROM GENRE WHERE Genre_Name = :name',
        { name: genreName }
      );
      if (result.rows.length === 0) {
        await connection.execute(
          'INSERT INTO GENRE (Genre_Name) VALUES (:name)',
          { name: genreName }
        );
        result = await connection.execute(
          'SELECT Genre_ID FROM GENRE WHERE Genre_Name = :name',
          { name: genreName }
        );
      }
      return result.rows[0][0];
    }

    // Iterate through the JSON data and insert records into the database
    for (const bookData of jsonData) {
      console.log(bookData);

      // Get ISBN
      let isbn = null;
      for (const identifier of bookData.industryIdentifiers) {
        if (identifier.type === 'ISBN_13') {
          isbn = identifier.identifier;
          break;
        }
      }

      // Get Publisher ID
      const publisherId = await getPublisherId(bookData.publisher);

      // Get Author IDs
      const authorIds = await Promise.all(
        bookData.authors.map((authorName) => getAuthorId(authorName))
      );

      // Get Genre IDs (if available)
      let genreIds = [];
      if ('categories' in bookData) {
        genreIds = await Promise.all(
          bookData.categories.map((genreName) => getGenreId(genreName))
        );
      }

      // Insert book data
      await connection.execute(
        'INSERT INTO BOOK (ISBN, Title, Image, Number_of_Pages, Language, Description, Publisher_ID) ' +
          'VALUES (:isbn, :title, :image, :pages, :language, :description, :publisher)',
        {
          isbn,
          title: bookData.title,
          image: bookData.imageLinks.thumbnail,
          pages: bookData.pageCount,
          language: bookData.language,
          description: bookData.description,
          publisher: publisherId,
        }
      );

      // Insert edition
      await connection.execute(
        'INSERT INTO EDITION (ISBN, Edition_Num, Num_of_Copies, Publish_Year) VALUES (:edition_id, :isbn, 1, :copies, :year)',
        {
          isbn,
          copies: 1,
          year: parseInt(bookData.publishedDate.split('-')[0]),
        }
      );

      // Insert written_by relationships
      for (const authorId of authorIds) {
        await connection.execute(
          'INSERT INTO WRITTEN_BY (ISBN, Author_ID) VALUES (:isbn, :author_id)',
          { isbn, author_id: authorId }
        );
      }

      // Insert book_genre relationships (if available)
      for (const genreId of genreIds) {
        await connection.execute(
          'INSERT INTO BOOK_GENRE (ISBN, Genre_ID) VALUES (:isbn, :genre_id)',
          { isbn, genre_id: genreId }
        );
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

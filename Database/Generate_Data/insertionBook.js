const fs = require("fs");
const oracledb = require("oracledb");

let count = 0,
    count2 = 0;
// Read the JSON data from the file
const jsonData = JSON.parse(fs.readFileSync("books.json", "utf8"));

// Database connection configuration
const dbConfig = {
    user: "c##library",
    password: "library",
    connectString: "localhost:1521/orcl",
};

(async () => {
    let connection;

    try {
        // Establish a database connection
        connection = await oracledb.getConnection(dbConfig);

        // if already inserted
        async function check_isbn(isbn) {
            let result = await connection.execute("SELECT ISBN FROM BOOK WHERE ISBN = :isbn", { isbn: isbn });
            if (result.rows.length === 0) {
                return true;
            }
            return false;
        }

        async function update_book(isbn, previewLink) {
            let result = await connection.execute("SELECT ISBN FROM BOOK WHERE ISBN = :isbn", { isbn: isbn });
            if (result.rows.length > 0) {
                let result = await connection.execute("UPDATE BOOK SET PREVIEWLINK = :preview WHERE ISBN = :isbn", {
                    isbn: isbn,
                    preview: previewLink
                });
            }
        }

        // Helper function to insert a new publisher or get the existing one
        async function getPublisherId(publisherName) {
            let result = await connection.execute(
                "SELECT Publisher_ID FROM PUBLISHER WHERE UPPER(Name) = UPPER(:name)",
                { name: publisherName }
            );
            if (result.rows.length === 0) {
                await connection.execute("INSERT INTO PUBLISHER (Name, Email) VALUES (:name, :email)", {
                    name: publisherName,
                    email: "example@gmail.com",
                });
                result = await connection.execute(
                    "SELECT Publisher_ID FROM PUBLISHER WHERE UPPER(Name) = UPPER(:name)",
                    { name: publisherName }
                );
            }
            return result.rows[0][0];
        }

        // Helper function to insert a new author or get the existing one
        async function getAuthorId(authorName) {
            let result = await connection.execute("SELECT Author_ID FROM AUTHOR WHERE UPPER(Name) = UPPER(:name)", {
                name: authorName,
            });
            if (result.rows.length === 0) {
                const a = { name: authorName, dob: new Date(`${Math.floor(1800 + Math.random() * 200)}-01-01`) };
                console.log(a);
                await connection.execute("INSERT INTO AUTHOR (Name, DoB) VALUES (:name, :dob)", {
                    name: authorName,
                    dob: new Date(`${Math.floor(1800 + Math.random() * 200)}-01-01`),
                });
                result = await connection.execute("SELECT Author_ID FROM AUTHOR WHERE UPPER(Name) = UPPER(:name)", {
                    name: authorName,
                });
            }

            return result.rows[0][0];
        }

        // Helper function to insert a new genre or get the existing one
        async function getGenreId(genreName) {
            let result = await connection.execute("SELECT Genre_ID FROM GENRE WHERE UPPER(Genre_Name) = UPPER(:name)", {
                name: genreName,
            });
            if (result.rows.length === 0) {
                await connection.execute("INSERT INTO GENRE (Genre_Name) VALUES (INITCAP((LOWER(:name))))", {
                    name: genreName,
                });
                // console.log(result.rows);
                result = await connection.execute("SELECT Genre_ID FROM GENRE WHERE UPPER(Genre_Name) = UPPER(:name)", {
                    name: genreName,
                });
            }
            return result.rows[0][0];
        }

        // Iterate through the JSON data and insert records into the database

        for (const bookData of jsonData) {
            console.log(bookData.title, count, count2);

            try {
                connection = await oracledb.getConnection(dbConfig);
                let t = 0;
                if (bookData["industryIdentifiers"][0]["type"] === "ISBN_13") t = 0;
                else if (bookData["industryIdentifiers"][1]["type"] === "ISBN_13") t = 1;
                else continue;
                await update_book(String(bookData["industryIdentifiers"][t]["identifier"]),String(bookData['previewLink']));
                await connection.commit();
                count += 1;
                continue;
                if (
                    !(await check_isbn(String(bookData["industryIdentifiers"][t]["identifier"]))) ||
                    bookData.language === "ko"
                ) {
                    continue;
                }
                const isbn = String(bookData["industryIdentifiers"][t]["identifier"]);

                // Get Publisher ID
                const publisherId = await getPublisherId(bookData.publisher);

                // Get Author IDs
                const authorIds = await Promise.all(bookData.authors.map((authorName) => getAuthorId(authorName)));
                console.log(authorIds);

                // Get Genre IDs (if available)
                let genreIds = [];
                if ("categories" in bookData) {
                    genreIds = await Promise.all(bookData.categories.map((genreName) => getGenreId(genreName)));
                }

                console.log(genreIds);

                // Insert book data
                await connection.execute(
                    "INSERT INTO BOOK (ISBN, Title, Image, Number_of_Pages, Language, Description, Publisher_ID) " +
                        "VALUES (:isbn, :title, :image, :pages, :language, :description, :publisher)",
                    {
                        isbn,
                        title: bookData.title.slice(0, bookData.title.length<490?bookData.title.length:490),
                        image: bookData.imageLinks.thumbnail,
                        pages: bookData.pageCount,
                        language: bookData.language,
                        description: bookData.description.slice(0, bookData.description.length<2990?bookData.description.length:2990),
                        publisher: publisherId,
                    }
                );
                console.log("done");
                // Insert edition
                console.log(Number(parseInt(bookData.publishedDate.split("-")[0])));
                await connection.execute(
                    "INSERT INTO EDITION (ISBN, Edition_Num, Num_of_Copies, Publish_Year) VALUES (:isbn, 1, :copies, :year)",
                    {
                        isbn,
                        copies: 1,
                        year: Number(parseInt(bookData.publishedDate.split("-")[0])),
                    }
                );

                // Insert written_by relationships
                for (const authorId of authorIds) {
                    await connection.execute("INSERT INTO WRITTEN_BY (ISBN, Author_ID) VALUES (:isbn, :author_id)", {
                        isbn,
                        author_id: authorId,
                    });
                }

                // Insert book_genre relationships (if available)
                for (const genreId of genreIds) {
                    await connection.execute("INSERT INTO BOOK_GENRE (ISBN, Genre_ID) VALUES (:isbn, :genre_id)", {
                        isbn,
                        genre_id: genreId,
                    });
                }

                await connection.commit();
                count += 1;
            } catch (e) {
                console.log(e);
                await connection.rollback();
                count2 += 1;

                continue;
            }
        }

        // Commit the transaction
    } catch (error) {
        console.error("Error:", error);
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

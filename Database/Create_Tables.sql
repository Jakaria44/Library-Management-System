DROP TABLE REVIEW_RATING;
DROP TABLE WRITTEN_BY;
DROP TABLE AUTHOR;
DROP TABLE BOOK_GENRE;
DROP TABLE APPLY;
DROP TABLE EMPLOYEE;
DROP TABLE FINE_HISTORY;
DROP TABLE RENT_HISTORY;
DROP TABLE MESSAGE;
DROP TABLE NEWS;
DROP TABLE FAVOURITE;
DROP TABLE GENRE;
DROP TABLE JOB;
DROP TABLE ADMIN;
DROP TABLE REQUEST;
DROP TABLE EDITION;
DROP TABLE BOOK;
DROP TABLE PUBLISHER;
DROP TABLE "USER";

CREATE TABLE PUBLISHER
(
    Publisher_ID VARCHAR2(20) PRIMARY KEY,
    Name         VARCHAR2(50)  NOT NULL,
    Image        VARCHAR2(200) DEFAULT 'https://ds.rokomari.store/rokomari110/company/publisher.png',
    City         VARCHAR2(100),
    Country      VARCHAR2(100),
    Postal_Code  VARCHAR2(100),
    Contact_No   VARCHAR2(20),
    Email        VARCHAR2(100) NOT NULL
);

CREATE TABLE AUTHOR
(
    Author_ID   VARCHAR2(20) PRIMARY KEY,
    Name        VARCHAR2(50) NOT NULL,
    DoB         DATE         NOT NULL,
    DoD         DATE,
    Nationality VARCHAR2(20),
    Bio         VARCHAR2(2000),
    Image       VARCHAR2(200) DEFAULT 'https://previews.123rf.com/images/anatolir/anatolir1712/anatolir171201476/91832679-man-avatar-icon-flat-illustration-of-man-avatar-vector-icon-isolated-on-white-background.jpg'
);

CREATE TABLE BOOK
(
    ISBN            VARCHAR2(20) PRIMARY KEY,
    Title           VARCHAR2(100) NOT NULL,
    Image           VARCHAR2(200) DEFAULT 'https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg',
    Number_of_Pages NUMBER        NOT NULL,
    Language        VARCHAR2(10),
    Description     VARCHAR2(2000),
    Publisher_ID    VARCHAR2(20),
    PreviewLink     VARCHAR2(200),
    FOREIGN KEY (Publisher_ID) REFERENCES PUBLISHER (Publisher_ID)
);

CREATE TABLE EDITION
(
    Edition_ID    VARCHAR2(20) PRIMARY KEY,
    ISBN          VARCHAR2(20) NOT NULL,
    Edition_Num   NUMBER       NOT NULL,
    Num_of_Copies NUMBER       NOT NULL,
    Publish_Year  NUMBER(4)    NOT NULL,
    UNIQUE (ISBN, Edition_Num),
    FOREIGN KEY (ISBN) REFERENCES BOOK (ISBN)
        ON DELETE CASCADE
);

CREATE TABLE "USER"
(
    User_ID    VARCHAR2(20) PRIMARY KEY,
    First_Name VARCHAR2(20)  NOT NULL,
    Last_Name  VARCHAR2(20),
    Image      VARCHAR2(200) DEFAULT 'https://img.freepik.com/free-icon/user_318-159711.jpg',
    Address    VARCHAR2(100),
    Email      VARCHAR2(100) NOT NULL,
    Password   VARCHAR2(200) NOT NULL,
    Contact_No VARCHAR2(20),
    Gender     CHAR
);

CREATE TABLE REQUEST
(
    User_ID      VARCHAR2(20) NOT NULL,
    Edition_ID   VARCHAR2(20) NOT NULL,
    Request_Date DATE         NOT NULL,
    PRIMARY KEY (User_ID, Edition_ID),
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID),
    FOREIGN KEY (Edition_ID) REFERENCES EDITION (Edition_ID)
        ON DELETE CASCADE
);

CREATE TABLE WRITTEN_BY
(
    ISBN      VARCHAR2(20) NOT NULL,
    Author_ID VARCHAR2(20) NOT NULL,
    PRIMARY KEY (ISBN, Author_ID),
    FOREIGN KEY (ISBN) REFERENCES BOOK (ISBN)
        ON DELETE CASCADE,
    FOREIGN KEY (Author_ID) REFERENCES AUTHOR (Author_ID)
);

CREATE TABLE GENRE
(
    Genre_ID   VARCHAR2(20) PRIMARY KEY,
    Genre_Name VARCHAR2(100) DEFAULT 'Others'
);

CREATE TABLE BOOK_GENRE
(
    ISBN     VARCHAR2(20) NOT NULL,
    Genre_ID VARCHAR2(20),
    PRIMARY KEY (ISBN, Genre_ID),
    FOREIGN KEY (ISBN) REFERENCES BOOK (ISBN)
        ON DELETE CASCADE,
    FOREIGN KEY (Genre_ID) REFERENCES GENRE (Genre_ID)
);

CREATE TABLE ADMIN
(
    User_ID VARCHAR2(20) PRIMARY KEY,
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID)
);

CREATE TABLE FAVOURITE
(
    User_ID VARCHAR2(20) NOT NULL,
    ISBN    VARCHAR2(20) NOT NULL,
    PRIMARY KEY (User_ID, ISBN),
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID),
    FOREIGN KEY (ISBN) REFERENCES BOOK (ISBN)
        ON DELETE CASCADE
);

CREATE TABLE REVIEW_RATING
(
    ISBN      VARCHAR2(20) NOT NULL,
    User_ID   VARCHAR2(20) NOT NULL,
    Rating    NUMBER(1)    NOT NULL,
    Review    VARCHAR2(2000),
    Edit_Date DATE         NOT NULL,
    PRIMARY KEY (ISBN, User_ID),
    FOREIGN KEY (ISBN) REFERENCES BOOK (ISBN)
        ON DELETE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID)
);

CREATE TABLE JOB
(
    Job_ID    VARCHAR2(20) PRIMARY KEY,
    Salary    NUMBER        NOT NULL,
    Job_Title VARCHAR2(100) NOT NULL
);

CREATE TABLE EMPLOYEE
(
    User_ID   VARCHAR2(20) PRIMARY KEY,
    Job_ID    VARCHAR2(20) NOT NULL,
    Join_Date DATE         NOT NULL,
    End_Date  DATE,
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID),
    FOREIGN KEY (Job_ID) REFERENCES JOB (Job_ID)
);

CREATE TABLE APPLY
(
    User_ID    VARCHAR2(20) NOT NULL,
    Job_ID     VARCHAR2(20) NOT NULL,
    Apply_Date DATE         NOT NULL,
    PRIMARY KEY (User_ID, Job_ID),
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID),
    FOREIGN KEY (Job_ID) REFERENCES JOB (Job_ID)
        ON DELETE CASCADE
);

CREATE TABLE RENT_HISTORY
(
    Rent_History_ID VARCHAR2(20) PRIMARY KEY,
    User_ID         VARCHAR2(20) NOT NULL,
    Edition_ID      VARCHAR2(20) NOT NULL,
    Rent_Date       DATE         NOT NULL,
    Return_Date     DATE         NOT NULL,
    Status          NUMBER DEFAULT 0,
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID),
    FOREIGN KEY (Edition_ID) REFERENCES EDITION (Edition_ID)
);

CREATE TABLE FINE_HISTORY
(
    Rent_History_ID VARCHAR2(20) PRIMARY KEY,
    Fee_Amount      NUMBER DEFAULT 0,
    Start_Date      DATE NOT NULL,
    Payment_Date    DATE,
    FOREIGN KEY (Rent_History_ID) REFERENCES RENT_HISTORY (Rent_History_ID)
);

CREATE TABLE NEWS
(
    News_ID   VARCHAR2(20) PRIMARY KEY,
    News_Text VARCHAR2(2000),
    News_Date DATE NOT NULL
);

CREATE TABLE MESSAGE
(
    Message_ID   VARCHAR2(20) PRIMARY KEY,
    User_ID      VARCHAR2(20) NOT NULL,
    Message_Date DATE         NOT NULL,
    Message      VARCHAR2(2000),
    Seen         NUMBER(1) default 0,
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID)
);

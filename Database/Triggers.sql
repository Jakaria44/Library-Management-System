-- TODO: NOT PERFECT YET
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
    Publish_Year    NUMBER(5)     NOT NULL,
    FOREIGN KEY (Publisher_ID) REFERENCES PUBLISHER (Publisher_ID)
);

CREATE TABLE EDITION
(
    Edition_ID    VARCHAR2(20) PRIMARY KEY,
    ISBN          VARCHAR2(20) NOT NULL,
    Edition_Num   NUMBER       NOT NULL,
    Num_of_Copies NUMBER       NOT NULL,
    Publish_Year  NUMBER(4),
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
    User_ID   VARCHAR2(20) NOT NULL,
    Job_ID    VARCHAR2(20) NOT NULL,
    Join_Date DATE         NOT NULL,
    End_Date  DATE,
    PRIMARY KEY (User_ID, Job_ID),
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
    Edition_ID      VARCHAR2(20) DEFAULT 'DELETED',
    Rent_Date       DATE         NOT NULL,
    Return_Date     DATE         NOT NULL,
    Status          NUMBER       DEFAULT 0,
    FOREIGN KEY (User_ID) REFERENCES "USER" (User_ID),
    FOREIGN KEY (Edition_ID) REFERENCES EDITION (Edition_ID)
        ON DELETE SET NULL
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

-----------------------------------------------------------


create sequence user_seq;

create
    or replace trigger user_insert_trig
    before insert
    on "USER"
    for each row
begin
    if
        :new.USER_ID is null
    then
        :new.USER_ID := user_seq.nextval;
    end if;
end;
/


create sequence publisher_seq;

CREATE
    OR REPLACE TRIGGER PUBLISHER_INSERT_TRIG
    BEFORE INSERT
    ON PUBLISHER
    FOR EACH ROW
BEGIN
    IF
        :NEW.PUBLISHER_ID IS NULL
    THEN
        :NEW.PUBLISHER_ID := publisher_seq.nextval;
    END IF;
END;
/


create sequence author_seq;

CREATE
    OR REPLACE TRIGGER AUTHOR_INSERT_TRIG
    BEFORE INSERT
    ON AUTHOR
    FOR EACH ROW
BEGIN
    IF
        :NEW.AUTHOR_ID IS NULL
    THEN
        :NEW.AUTHOR_ID := author_seq.nextval;
    END IF;
END;
/


create sequence genre_seq;

CREATE
    OR REPLACE TRIGGER GENRE_INSERT_TRIG
    BEFORE INSERT
    ON GENRE
    FOR EACH ROW
BEGIN
    IF
        :NEW.GENRE_ID IS NULL
    THEN
        :NEW.GENRE_ID := genre_seq.nextval;
    END IF;
END;
/

create sequence edition_seq;

CREATE
    OR REPLACE TRIGGER EDITION_INSERT_TRIG
    BEFORE INSERT
    ON EDITION
    FOR EACH ROW
BEGIN
    IF
        :NEW.EDITION_ID IS NULL
    THEN
        :NEW.EDITION_ID := edition_seq.nextval;
    END IF;
END;
/

create sequence job_seq;

CREATE
    OR REPLACE TRIGGER JOB_INSERT_TRIG
    BEFORE INSERT
    ON JOB
    FOR EACH ROW
BEGIN
    IF
        :NEW.JOB_ID IS NULL
    THEN
        :NEW.JOB_ID := job_seq.nextval;
    END IF;
END;
/


create sequence history_seq;

CREATE
    OR REPLACE TRIGGER RENT_INSERT_TRIG
    BEFORE INSERT
    ON RENT_HISTORY
    FOR EACH ROW
BEGIN
    IF
        :NEW.Rent_History_ID IS NULL
    THEN
        :NEW.Rent_History_ID := history_seq.nextval;
    END IF;
END;
/

create sequence msg_seq;

CREATE
    OR REPLACE TRIGGER MESSAGE_INSERT_TRIG
    BEFORE INSERT
    ON MESSAGE
    FOR EACH ROW
BEGIN
    IF
        :NEW.Message_ID IS NULL
    THEN
        :NEW.Message_ID := msg_seq.nextval;
    END IF;
END;
/

create sequence news_seq;

CREATE
    OR REPLACE TRIGGER NEWS_INSERT_TRIG
    BEFORE INSERT
    ON NEWS
    FOR EACH ROW
BEGIN
    IF
        :NEW.NEWS_ID IS NULL
    THEN
        :NEW.NEWS_ID := news_seq.nextval;
    END IF;
END;
/


CREATE OR REPLACE TRIGGER trg_publisher_default_image
    BEFORE INSERT
    ON PUBLISHER
    FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image := 'https://ds.rokomari.store/rokomari110/company/publisher.png';
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_author_default_image
    BEFORE INSERT
    ON AUTHOR
    FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image :=
                'https://previews.123rf.com/images/anatolir/anatolir1712/anatolir171201476/91832679-man-avatar-icon-flat-illustration-of-man-avatar-vector-icon-isolated-on-white-background.jpg';
    END IF;
END;
/


CREATE OR REPLACE TRIGGER trg_user_default_image
    BEFORE INSERT
    ON "USER"
    FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image := 'https://img.freepik.com/free-icon/user_318-159711.jpg';
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_book_default_image
    BEFORE INSERT
    ON BOOK
    FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image :=
                'https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg';
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_book_publish_year
    AFTER INSERT OR UPDATE
    ON EDITION
    FOR EACH ROW
DECLARE
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM EDITION E
    WHERE E.ISBN = :NEW.ISBN
      AND E.Publish_Year < :NEW.PUBLISH_YEAR;
    IF COUNTER = 0 THEN
        UPDATE BOOK
        SET PUBLISH_YEAR = :NEW.PUBLISH_YEAR
        WHERE ISBN = :NEW.ISBN;
    END IF;
END;
/

create or replace FUNCTION IS_VALID_USER_INSERT(UEMAIL IN VARCHAR2)
    return BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM "USER"
    WHERE EMAIL = UEMAIL;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_INSERT_EDITION(A_ISBN VARCHAR2, A_EDITION_NUM NUMBER, A_PUBLISH_YEAR NUMBER) RETURN BOOLEAN IS
    COUNTER  NUMBER;
    COUNTER2 NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM EDITION
    WHERE ISBN = A_ISBN
      AND EDITION_NUM = A_EDITION_NUM;
    IF
        COUNTER = 0 THEN
        SELECT COUNT(*)
        INTO COUNTER2
        FROM ((SELECT *
               FROM EDITION
               WHERE ISBN = A_ISBN
                 AND PUBLISH_YEAR > A_PUBLISH_YEAR
                 AND EDITION_NUM < A_EDITION_NUM)
              UNION
              (SELECT *
               FROM EDITION
               WHERE ISBN = A_ISBN
                 AND PUBLISH_YEAR < A_PUBLISH_YEAR
                 AND EDITION_NUM > A_EDITION_NUM));
        IF COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    ELSE
        RETURN FALSE;
    END IF;
end;
/

CREATE OR REPLACE FUNCTION IS_VALID_EDITION(A_ISBN VARCHAR2, A_EDITION_ID NUMBER)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM EDITION
    WHERE ISBN = A_ISBN
      AND EDITION_ID = A_EDITION_ID;
    IF
        COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
end;
/

create or replace FUNCTION IS_VALID_ADMIN_INSERT(UEMAIL IN VARCHAR2)
    return BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM "USER"
    WHERE EMAIL = UEMAIL;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/

create or replace FUNCTION IS_VALID_AUTHOR_INSERT(ANAME IN VARCHAR2, ADOB IN DATE)
    return BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM AUTHOR
    WHERE (UPPER(NAME) = UPPER(ANAME) AND DOB = ADOB);
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_PUBLISHER(P_NAME IN VARCHAR2, P_EMAIL IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM PUBLISHER
    WHERE (UPPER(NAME) = UPPER(P_NAME) OR EMAIL = P_EMAIL);
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_GENRE(G_NAME IN VARCHAR2)
    RETURN BOOLEAN IS
    TG_NAME VARCHAR2(100);
BEGIN
    SELECT GENRE_NAME
    INTO TG_NAME
    FROM GENRE
    WHERE UPPER(GENRE_NAME) = UPPER(G_NAME);
    RETURN FALSE;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN TRUE;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
        RETURN FALSE;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_ISBN(GIVEN_ISBN IN VARCHAR2)
    RETURN BOOLEAN IS
    F_ISBN VARCHAR2(20);
BEGIN
    SELECT ISBN
    INTO F_ISBN
    FROM BOOK
    WHERE ISBN = GIVEN_ISBN;
    RETURN TRUE;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
        RETURN FALSE;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_TITLE(GIVEN_TITLE IN VARCHAR2)
    RETURN BOOLEAN IS
    F_TITLE VARCHAR2(100);
BEGIN
    SELECT TITLE
    INTO F_TITLE
    FROM BOOK
    WHERE UPPER(TITLE) = UPPER(GIVEN_TITLE);
    RETURN FALSE;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN TRUE;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
        RETURN FALSE;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_INSERT_JOB(A_TITLE IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM JOB
    WHERE UPPER(JOB_TITLE) = UPPER(A_TITLE);
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_JOB(J_ID VARCHAR2, J_TITLE IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM JOB
    WHERE UPPER(JOB_TITLE) = UPPER(J_TITLE)
      AND JOB_ID <> J_ID;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_DELETE_JOB(J_ID VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM EMPLOYEE
    WHERE JOB_ID = J_ID;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_DELETE_AUTHOR(A_ID IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM WRITTEN_BY
    WHERE AUTHOR_ID = A_ID;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_DELETE_ADMIN(A_ID IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM ADMIN;
    IF
        COUNTER < 2 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*)
        INTO COUNTER
        FROM ADMIN
        WHERE USER_ID = A_ID;
        IF COUNTER = 0 THEN
            RETURN FALSE;
        ELSE
            RETURN TRUE;
        END IF;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_DELETE_GENRE(G_ID IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM BOOK_GENRE
    WHERE GENRE_ID = G_ID;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_DELETE_PUBLISHER(P_ID IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM BOOK
    WHERE PUBLISHER_ID = P_ID;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_AUTHOR(A_ID IN VARCHAR2, ANAME IN VARCHAR2, ADOB IN DATE)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
    COUNTER2
            NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM AUTHOR
    WHERE AUTHOR_ID = A_ID;
    IF
        COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*)
        INTO COUNTER2
        FROM AUTHOR
        WHERE (UPPER(NAME) = UPPER(ANAME) AND DOB = ADOB)
          AND AUTHOR_ID <> A_ID;
        IF
            COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_PUBLISHER(P_ID IN VARCHAR2, PMAIL IN VARCHAR2, P_NAME IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
    COUNTER2
            NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM PUBLISHER
    WHERE PUBLISHER_ID = P_ID;
    IF
        COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*)
        INTO COUNTER2
        FROM PUBLISHER
        WHERE (UPPER(NAME) = UPPER(P_NAME) OR EMAIL = PMAIL)
          AND PUBLISHER_ID <> P_ID;
        IF
            COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_GENRE(G_ID IN VARCHAR2, G_NAME IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
    COUNTER2
            NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM GENRE
    WHERE GENRE_ID = G_ID;
    IF
        COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*)
        INTO COUNTER2
        FROM GENRE
        WHERE UPPER(GENRE_NAME) = UPPER(G_NAME)
          AND GENRE_ID <> G_ID;
        IF
            COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;
END;
/


-- new updates
CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_USER(U_ID IN VARCHAR2, UEMAIL IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
    COUNTER2
            NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM "USER"
    WHERE USER_ID = U_ID;
    IF
        COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*)
        INTO COUNTER2
        FROM "USER"
        WHERE EMAIL = UEMAIL
          AND USER_ID <> U_ID;
        IF
            COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_ADMIN(A_ID IN VARCHAR2, AEMAIL IN VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
    COUNTER2
            NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM ADMIN
    WHERE USER_ID = A_ID;
    IF
        COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*)
        INTO COUNTER2
        FROM "USER"
        WHERE EMAIL = AEMAIL
          AND USER_ID <> A_ID;
        IF
            COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;
END;
/


-- procedures
CREATE OR REPLACE PROCEDURE UPDATE_USER(A_ID IN VARCHAR2,
                                        A_FIRST_NAME IN VARCHAR2,
                                        A_LAST_NAME VARCHAR2,
                                        A_IMAGE VARCHAR2,
                                        A_ADDRESS VARCHAR2,
                                        A_EMAIL VARCHAR2,
                                        A_PASSWORD VARCHAR2,
                                        A_CONTACT_NO VARCHAR2,
                                        A_GENDER CHAR) IS
BEGIN
    IF
        (IS_VALID_UPDATE_USER(A_ID, A_EMAIL)) THEN
        UPDATE "USER"
        SET FIRST_NAME = A_FIRST_NAME,
            LAST_NAME  = A_LAST_NAME,
            ADDRESS    = A_ADDRESS,
            EMAIL      = A_EMAIL,
            CONTACT_NO = A_CONTACT_NO,
            GENDER     = A_GENDER,
            PASSWORD   = A_PASSWORD,
            IMAGE      = A_IMAGE
        WHERE USER_ID = A_ID;
    ELSE
        raise_application_error(-20111, 'USER CANNOT BE UPDATED');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE UPDATE_ADMIN(A_ID IN VARCHAR2,
                                         A_FIRST_NAME IN VARCHAR2,
                                         A_LAST_NAME VARCHAR2,
                                         A_IMAGE VARCHAR2,
                                         A_ADDRESS VARCHAR2,
                                         A_EMAIL VARCHAR2,
                                         A_PASSWORD VARCHAR2,
                                         A_CONTACT_NO VARCHAR2,
                                         A_GENDER CHAR) IS
BEGIN
    IF
        (IS_VALID_UPDATE_ADMIN(A_ID, A_EMAIL)) THEN
        UPDATE "USER"
        SET FIRST_NAME = A_FIRST_NAME,
            LAST_NAME  = A_LAST_NAME,
            ADDRESS    = A_ADDRESS,
            EMAIL      = A_EMAIL,
            CONTACT_NO = A_CONTACT_NO,
            GENDER     = A_GENDER,
            PASSWORD   = A_PASSWORD,
            IMAGE      = A_IMAGE
        WHERE USER_ID = A_ID;
    ELSE
        raise_application_error(-20111, 'ADMIN CANNOT BE UPDATED');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE INSERT_USER(A_FIRST_NAME IN VARCHAR2,
                                        A_LAST_NAME VARCHAR2,
                                        A_IMAGE VARCHAR2,
                                        A_ADDRESS VARCHAR2,
                                        A_EMAIL VARCHAR2,
                                        A_PASSWORD VARCHAR2,
                                        A_CONTACT_NO VARCHAR2,
                                        A_GENDER CHAR)
    IS
    ID NUMBER;
BEGIN
    IF
        IS_VALID_USER_INSERT(A_EMAIL) THEN
        INSERT INTO "USER" ("FIRST_NAME", "LAST_NAME", "IMAGE", "ADDRESS", "EMAIL", "PASSWORD", "CONTACT_NO",
                            "GENDER")
        VALUES (A_FIRST_NAME, A_LAST_NAME, A_IMAGE, A_ADDRESS, A_EMAIL, A_PASSWORD, A_CONTACT_NO, A_GENDER);
        select user_seq.currval
        into ID
        from DUAL;
    ELSE
        raise_application_error(-20111, 'EMAIL IS NOT UNIQUE');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE INSERT_ADMIN(A_FIRST_NAME IN VARCHAR2,
                                         A_LAST_NAME VARCHAR2,
                                         A_IMAGE VARCHAR2,
                                         A_ADDRESS VARCHAR2,
                                         A_EMAIL VARCHAR2,
                                         A_PASSWORD VARCHAR2,
                                         A_CONTACT_NO VARCHAR2,
                                         A_GENDER CHAR)
    IS
    ID NUMBER;
BEGIN
    IF
        IS_VALID_ADMIN_INSERT(A_EMAIL) THEN
        INSERT INTO "USER" ("FIRST_NAME", "LAST_NAME", "IMAGE", "ADDRESS", "EMAIL", "PASSWORD", "CONTACT_NO",
                            "GENDER")
        VALUES (A_FIRST_NAME, A_LAST_NAME, A_IMAGE, A_ADDRESS, A_EMAIL, A_PASSWORD, A_CONTACT_NO, A_GENDER);
        select user_seq.currval
        into ID
        from DUAL;
        INSERT INTO "ADMIN" ("USER_ID")
        VALUES (ID);
    ELSE
        raise_application_error(-20111, 'EMAIL IS NOT UNIQUE');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE INSERT_AUTHOR(A_NAME VARCHAR2,
                                          A_DoB DATE,
                                          A_DoD DATE,
                                          A_NATIONALITY VARCHAR2,
                                          A_BIO VARCHAR2,
                                          A_IMAGE VARCHAR2)
    IS
    ID NUMBER;
BEGIN
    IF
        (IS_VALID_AUTHOR_INSERT(A_NAME, A_DOB)) THEN
        INSERT INTO "AUTHOR" (NAME, DoB, DoD, NATIONALITY, BIO, IMAGE)
        VALUES (A_NAME, A_DoB, A_DoD, A_NATIONALITY, A_BIO, A_IMAGE);
        select author_seq.currval
        into ID
        from DUAL;
    ELSE
        raise_application_error(-20111, 'NAME AND DOB IS NOT UNIQUE');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE INSERT_EDITION(A_ISBN VARCHAR2,
                                           A_EDITION_NUM NUMBER,
                                           A_NUM_OF_COPIES NUMBER,
                                           A_PUBLISH_YEAR NUMBER) IS
    ID NUMBER;
BEGIN
    IF
        (IS_VALID_INSERT_EDITION(A_ISBN, A_EDITION_NUM, A_PUBLISH_YEAR)) THEN
        INSERT INTO EDITION (ISBN, EDITION_NUM, NUM_OF_COPIES, PUBLISH_YEAR)
        VALUES (A_ISBN,
                A_EDITION_NUM,
                A_NUM_OF_COPIES,
                A_PUBLISH_YEAR);
        select edition_seq.currval
        into ID
        from DUAL;
    ELSE
        raise_application_error(-20111, 'NAME AND DOB IS NOT UNIQUE');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE INSERT_JOB(A_JOB_TITLE VARCHAR2, A_SALARY NUMBER) IS
    ID NUMBER;
BEGIN
    IF
        (IS_VALID_INSERT_JOB(A_JOB_TITLE)) THEN
        INSERT INTO JOB(JOB_TITLE, SALARY)
        VALUES (A_JOB_TITLE, A_SALARY);
        select job_seq.currval
        into ID
        from DUAL;
    ELSE
        raise_application_error(-20111, 'JOB IS NOT UNIQUE');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_JOB(A_JOB_ID VARCHAR2, A_JOB_TITLE VARCHAR2, A_SALARY NUMBER) IS
BEGIN
    IF
        (IS_VALID_UPDATE_JOB(A_JOB_ID, A_JOB_TITLE)) THEN
        IF A_SALARY < 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Salary must be positive');
        end if;
        UPDATE JOB
        SET JOB_TITLE = A_JOB_TITLE,
            SALARY    = A_SALARY
        WHERE JOB_ID = A_JOB_ID;
    ELSE
        raise_application_error(-20111, 'JOB IS NOT UNIQUE');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE DELETE_JOB(A_JOB_ID VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_DELETE_JOB(A_JOB_ID)) THEN
        DELETE
        FROM JOB
        WHERE JOB_ID = A_JOB_ID;
    ELSE
        raise_application_error(-20111, 'JOB IS NOT UNIQUE');
    END IF;
END;
/

CREATE OR REPLACE FUNCTION IS_VALID_INSERT_EMPLOYEE(A_USER_ID VARCHAR2, A_JOB_ID VARCHAR2)
    RETURN BOOLEAN IS
    COUNTER NUMBER;
    ID      VARCHAR2(50);
BEGIN
    SELECT User_ID
    INTO ID
    FROM "USER"
    WHERE User_ID = A_USER_ID;
    SELECT JOB_ID
    INTO ID
    FROM JOB
    WHERE JOB_ID = A_JOB_ID;
    SELECT COUNT(*)
    INTO COUNTER
    FROM ADMIN
    WHERE USER_ID = A_USER_ID;
    IF COUNTER > 0 THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;
    WHEN OTHERS THEN
        RETURN FALSE;
END;
/

CREATE OR REPLACE PROCEDURE INSERT_EMPLOYEE(A_USER_ID VARCHAR2, A_JOB_ID VARCHAR2) IS
BEGIN
    IF IS_VALID_INSERT_EMPLOYEE(A_USER_ID, A_JOB_ID) THEN
        DELETE
        FROM EMPLOYEE
        WHERE USER_ID = A_USER_ID;
        INSERT INTO EMPLOYEE(USER_ID, JOB_ID, JOIN_DATE)
        VALUES (A_USER_ID, A_JOB_ID, SYSDATE);
        DELETE
        FROM APPLY
        WHERE USER_ID = A_USER_ID;
    ELSE
        RAISE_APPLICATION_ERROR(-20001, 'CAN NOT BE AN EMPLOYEE OF THE JOB');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'SOME ERROR OCCURRED');
END;
/

CREATE OR REPLACE PROCEDURE DELETE_EMPLOYEE(A_USER_ID VARCHAR2) IS
    ID VARCHAR2(50);
BEGIN
    SELECT USER_ID
    INTO ID
    FROM EMPLOYEE
    WHERE USER_ID = A_USER_ID;
    DELETE
    FROM EMPLOYEE
    WHERE User_ID = ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        raise_application_error(-20111, 'No Data Found');
    WHEN OTHERS THEN
        raise_application_error(-20111, 'Unknown Error Occurred');
END;
/


CREATE OR REPLACE PROCEDURE INSERT_APPLY(U_ID VARCHAR2,
                                         J_ID VARCHAR2) IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM APPLY
    WHERE JOB_ID = J_ID
      AND USER_ID = U_ID;
    IF COUNTER > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ALREADY APPLIED');
    END IF;
    SELECT COUNT(*)
    INTO COUNTER
    FROM EMPLOYEE
    WHERE USER_ID = U_ID
      AND JOB_ID = J_ID;
    IF COUNTER > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ALREADY WORKING');
    END IF;
    INSERT INTO APPLY(USER_ID, Job_ID, Apply_Date)
    VALUES (U_ID, J_ID, SYSDATE);
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'Some Error Occurred');
END;
/
CREATE OR REPLACE PROCEDURE INSERT_APPLY(U_ID VARCHAR2,
                                         J_ID VARCHAR2) IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM APPLY
    WHERE JOB_ID = J_ID
      AND USER_ID = U_ID;
    IF COUNTER > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ALREADY APPLIED');
    END IF;
    SELECT COUNT(*)
    INTO COUNTER
    FROM EMPLOYEE
    WHERE USER_ID = U_ID
      AND JOB_ID = J_ID;
    IF COUNTER > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'ALREADY WORKING');
    END IF;
    INSERT INTO APPLY(USER_ID, Job_ID, Apply_Date)
    VALUES (U_ID, J_ID, SYSDATE);
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'Some Error Occurred');
END;
/

CREATE OR REPLACE PROCEDURE DELETE_APPLY(U_ID VARCHAR2, J_ID VARCHAR2) IS
    ID VARCHAR2(2000);
BEGIN
    SELECT USER_ID
    INTO ID
    FROM APPLY
    WHERE JOB_ID = J_ID
      AND USER_ID = U_ID;
    DELETE
    FROM APPLY
    WHERE JOB_ID = J_ID
      AND USER_ID = U_ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        raise_application_error(-20001, 'No Data Found');
    WHEN OTHERS THEN
        raise_application_error(-20001, 'Unknown Error Occurred');
END;
/


CREATE OR REPLACE PROCEDURE EDIT_REVIEW_RATING(A_ISBN VARCHAR2,
                                               A_USER_ID VARCHAR2,
                                               A_RATING NUMBER,
                                               A_REVIEW VARCHAR2) IS
    RVAL VARCHAR2(2000);
BEGIN
    SELECT RATING
    INTO RVAL
    FROM REVIEW_RATING
    WHERE ISBN = A_ISBN
      AND USER_ID = A_USER_ID;
    UPDATE REVIEW_RATING
    SET RATING    = NVL(A_RATING, 0),
        REVIEW    = A_REVIEW,
        EDIT_DATE = SYSDATE
    WHERE ISBN = A_ISBN
      AND USER_ID = A_USER_ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO REVIEW_RATING(ISBN, USER_ID, RATING, REVIEW, EDIT_DATE)
        VALUES (A_ISBN, A_USER_ID, NVL(A_RATING, 0), A_REVIEW, SYSDATE);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Some Error Occured');
END;
/

CREATE OR REPLACE PROCEDURE DELETE_REVIEW_RATING(A_ISBN VARCHAR2,
                                                 A_USER_ID VARCHAR2) IS
    RVAL VARCHAR2(2000);
BEGIN
    SELECT RATING
    INTO RVAL
    FROM REVIEW_RATING
    WHERE ISBN = A_ISBN
      AND USER_ID = A_USER_ID;
    DELETE
    FROM REVIEW_RATING
    WHERE ISBN = A_ISBN
      AND USER_ID = A_USER_ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('DOES NOT EXIST');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Some Error Occured');
END;
/

CREATE OR REPLACE PROCEDURE INSERT_BOOK_GENRE(B_ISBN IN VARCHAR2, G_ID IN VARCHAR2) IS
    P VARCHAR2(20);
BEGIN
    SELECT ISBN
    INTO P
    FROM BOOK_GENRE
    WHERE (ISBN = B_ISBN AND GENRE_ID = G_ID);
    DBMS_OUTPUT.PUT_LINE('ALREADY EXISTS');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO BOOK_GENRE(ISBN, GENRE_ID) VALUES (B_ISBN, G_ID);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/

CREATE OR REPLACE PROCEDURE INSERT_WRITTEN_BY(B_ISBN IN VARCHAR2, P_ID IN VARCHAR2) IS
    P VARCHAR2(20);
BEGIN
    SELECT ISBN
    INTO P
    FROM WRITTEN_BY
    WHERE (ISBN = B_ISBN AND AUTHOR_ID = P_ID);
    DBMS_OUTPUT.PUT_LINE('ALREADY EXISTS');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO WRITTEN_BY(ISBN, AUTHOR_ID) VALUES (B_ISBN, P_ID);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/


CREATE OR REPLACE PROCEDURE INSERT_REQUEST(E_ID IN VARCHAR2, U_ID IN VARCHAR2) IS
    P VARCHAR2(20);
BEGIN
    SELECT EDITION_ID
    INTO P
    FROM REQUEST
    WHERE (EDITION_ID = E_ID AND USER_ID = U_ID);
    RAISE_APPLICATION_ERROR(-20001, 'Record already exists.');

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO REQUEST(USER_ID, EDITION_ID, REQUEST_DATE) VALUES (U_ID, E_ID, SYSDATE);
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'An error occurred.');
END;
/

CREATE OR REPLACE PROCEDURE DELETE_REQUEST(E_ID IN VARCHAR2, U_ID IN VARCHAR2) IS
    P VARCHAR2(20);
BEGIN
    SELECT EDITION_ID
    INTO P
    FROM REQUEST
    WHERE (EDITION_ID = E_ID AND USER_ID = U_ID);
    DELETE
    FROM REQUEST
    WHERE (EDITION_ID = E_ID AND USER_ID = U_ID);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001, 'Does not Exist.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'Unknown error occured.');
END;
/

CREATE OR REPLACE PROCEDURE POST_FAVOURITE(A_ISBN IN VARCHAR2, U_ID IN VARCHAR2) IS
    P VARCHAR2(20);
BEGIN
    SELECT ISBN
    INTO P
    FROM FAVOURITE
    WHERE (ISBN = A_ISBN AND USER_ID = U_ID);
    DELETE
    FROM FAVOURITE
    WHERE (ISBN = A_ISBN AND USER_ID = U_ID);
    DBMS_OUTPUT.PUT_LINE('ALREADY EXISTS');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO FAVOURITE(USER_ID, ISBN) VALUES (U_ID, A_ISBN);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SOME ERROR OCCURED');
END;
/


CREATE OR REPLACE PROCEDURE INSERT_BOOK(A_ISBN VARCHAR2,
                                        A_TITLE VARCHAR2,
                                        A_IMAGE VARCHAR2,
                                        A_NUMBER_OF_PAGES NUMBER,
                                        A_LANGUAGE VARCHAR2,
                                        A_DESCRIPTION VARCHAR2,
                                        A_PUBLISHER_ID VARCHAR2,
                                        A_PUBLISH_YEAR NUMBER) IS
BEGIN
    IF
        (IS_VALID_TITLE(A_TITLE) AND IS_VALID_ISBN(A_ISBN)) THEN
        INSERT INTO BOOK(ISBN, TITLE, IMAGE, NUMBER_OF_PAGES, LANGUAGE, DESCRIPTION, PUBLISHER_ID, PUBLISH_YEAR)
        VALUES (A_ISBN, A_TITLE, A_IMAGE, A_NUMBER_OF_PAGES, A_LANGUAGE, A_DESCRIPTION, A_PUBLISHER_ID,
                A_PUBLISH_YEAR);
    ELSE
        raise_application_error(-20111, 'TITLE OR ISBN NOT UNIQUE');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE INSERT_GENRE(G_NAME IN VARCHAR2) IS
    ID NUMBER;
BEGIN
    IF
        (IS_VALID_GENRE(G_NAME)) THEN
        select genre_seq.currval into ID from DUAL;
        INSERT INTO GENRE("GENRE_ID", "GENRE_NAME") VALUES (ID, G_NAME);
    ELSE
        raise_application_error(-20111, 'GENRE NAME IS ALREADY USED');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE INSERT_PUBLISHER(A_NAME VARCHAR2,
                                             A_IMAGE VARCHAR2,
                                             A_CITY VARCHAR2,
                                             A_COUNTRY VARCHAR2,
                                             A_POSTAL_CODE VARCHAR2,
                                             A_CONTACT_NO VARCHAR2,
                                             A_EMAIL VARCHAR2) IS
    ID NUMBER;
BEGIN
    IF
        (IS_VALID_PUBLISHER(A_NAME, A_EMAIL)) THEN
        INSERT INTO PUBLISHER(NAME, IMAGE, CITY, COUNTRY, POSTAL_CODE, CONTACT_NO, EMAIL)
        VALUES (A_NAME, A_IMAGE, A_CITY, A_COUNTRY, A_POSTAL_CODE, A_CONTACT_NO, A_EMAIL);
        select publisher_seq.currval
        into ID
        from DUAL;
    ELSE
        raise_application_error(-20111, 'PUBLISHER NAME OR EMAIL NOT UNIQUE');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE DELETE_BOOK_GENRE(B_ISBN IN VARCHAR2) IS
BEGIN
    FOR R IN (SELECT GENRE_ID FROM BOOK_GENRE WHERE ISBN = B_ISBN)
        LOOP
            DELETE
            FROM BOOK_GENRE
            WHERE (ISBN = B_ISBN AND GENRE_ID = R.GENRE_ID);
        END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'SOME ERROR OCCURRED');
END;
/

CREATE OR REPLACE PROCEDURE DELETE_WRITTEN_BY(B_ISBN IN VARCHAR2) IS
BEGIN
    FOR R IN (SELECT AUTHOR_ID FROM WRITTEN_BY WHERE ISBN = B_ISBN)
        LOOP
            DELETE
            FROM WRITTEN_BY
            WHERE (ISBN = B_ISBN AND AUTHOR_ID = R.AUTHOR_ID);
        END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'SOME ERROR OCCURRED');
END;
/


CREATE OR REPLACE PROCEDURE DELETE_PUBLISHER(P_ID IN VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_DELETE_PUBLISHER(P_ID)) THEN
        DELETE
        FROM PUBLISHER
        WHERE PUBLISHER_ID = P_ID;
    ELSE
        raise_application_error(-20111, 'PUBLISHER CANNOT BE DELETED');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE DELETE_AUTHOR(A_ID IN VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_DELETE_AUTHOR(A_ID)) THEN
        DELETE
        FROM AUTHOR
        WHERE AUTHOR_ID = A_ID;
    ELSE
        raise_application_error(-20111, 'AUTHOR CANNOT BE DELETED');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_AUTHOR(A_AUTHOR_ID VARCHAR2,
                                          A_NAME VARCHAR2,
                                          A_DoB DATE,
                                          A_DoD DATE,
                                          A_NATIONALITY VARCHAR2,
                                          A_BIO VARCHAR2,
                                          A_IMAGE VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_UPDATE_AUTHOR(A_AUTHOR_ID, A_NAME, A_DoB)) THEN
        UPDATE AUTHOR
        SET NAME=A_NAME,
            DoB=A_DoB,
            DoD=A_DoD,
            NATIONALITY=A_NATIONALITY,
            BIO=A_BIO,
            IMAGE=A_IMAGE
        WHERE AUTHOR_ID = A_AUTHOR_ID;
    ELSE
        raise_application_error(-20111, 'AUTHOR CANNOT BE UPDATED');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE UPDATE_PUBLISHER(A_PUBLISHER_ID VARCHAR2,
                                             A_NAME VARCHAR2,
                                             A_IMAGE VARCHAR2,
                                             A_CITY VARCHAR2,
                                             A_COUNTRY VARCHAR2,
                                             A_POSTAL_CODE VARCHAR2,
                                             A_CONTACT_NO VARCHAR2,
                                             A_EMAIL VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_UPDATE_PUBLISHER(A_PUBLISHER_ID, A_EMAIL, A_NAME)) THEN
        UPDATE PUBLISHER
        SET NAME=A_NAME,
            IMAGE=A_IMAGE,
            CITY=A_CITY,
            COUNTRY=A_COUNTRY,
            POSTAL_CODE=A_POSTAL_CODE,
            CONTACT_NO=A_CONTACT_NO,
            EMAIL=A_EMAIL
        WHERE PUBLISHER_ID = A_PUBLISHER_ID;
    ELSE
        raise_application_error(-20111, 'PUBLISHER CANNOT BE UPDATED');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_EDITION(A_ISBN VARCHAR2,
                                           A_EDITION_ID NUMBER,
                                           A_NUM_OF_COPIES NUMBER,
                                           A_PUBLISH_YEAR NUMBER) IS
    COPIES NUMBER;
    YEAR   NUMBER(4);
BEGIN
    IF
        (IS_VALID_EDITION(A_ISBN, A_EDITION_ID)) THEN
        SELECT NUM_OF_COPIES, PUBLISH_YEAR
        INTO COPIES, YEAR
        FROM EDITION
        WHERE EDITION_ID = A_EDITION_ID;
        COPIES := COPIES + A_NUM_OF_COPIES;
        IF COPIES < 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'CANNOT BE NEGATIVE');
        end if;
        IF A_PUBLISH_YEAR IS NULL THEN
            A_PUBLISH_YEAR := YEAR;
        END IF;
        UPDATE EDITION
        SET NUM_OF_COPIES = COPIES,
            PUBLISH_YEAR  = YEAR
        WHERE Edition_ID = A_EDITION_ID;
    ELSE
        raise_application_error(-20111, 'EDITION does not exist');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE UPDATE_GENRE(G_ID IN VARCHAR2, G_NAME IN VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_UPDATE_GENRE(G_ID, G_NAME)) THEN
        UPDATE GENRE
        SET GENRE_NAME = G_NAME
        WHERE GENRE_ID = G_ID;
    ELSE
        raise_application_error(-20111, 'GENRE CANNOT BE UPDATED');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_MESSAGE(U_ID IN VARCHAR2) IS
BEGIN
    FOR R IN (SELECT MESSAGE_ID FROM MESSAGE WHERE USER_ID = U_ID)
        LOOP
            UPDATE MESSAGE
            SET Seen = 1
            WHERE MESSAGE_ID = R.MESSAGE_ID;
        END LOOP;
END;
/

CREATE OR REPLACE PROCEDURE DELETE_MESSAGE(U_ID IN VARCHAR2) IS
BEGIN
    FOR R IN (SELECT MESSAGE_ID FROM MESSAGE WHERE USER_ID = U_ID)
        LOOP
            DELETE
            FROM MESSAGE
            WHERE MESSAGE_ID = R.MESSAGE_ID;
        END LOOP;
END;
/


CREATE OR REPLACE PROCEDURE DELETE_GENRE(G_ID IN VARCHAR2) IS
BEGIN
    IF
        (IS_VALID_DELETE_GENRE(G_ID)) THEN
        DELETE
        FROM GENRE
        WHERE GENRE_ID = G_ID;
    ELSE
        raise_application_error(-20111, 'GENRE CANNOT BE DELETED');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE UPDATE_BOOK(A_ISBN VARCHAR2,
                                        A_TITLE VARCHAR2,
                                        A_IMAGE VARCHAR2,
                                        A_NUMBER_OF_PAGES NUMBER,
                                        A_LANGUAGE VARCHAR2,
                                        A_DESCRIPTION VARCHAR2,
                                        A_PUBLISHER_ID VARCHAR2,
                                        A_PUBLISH_YEAR NUMBER) IS
BEGIN
    IF
        (IS_VALID_ISBN(A_ISBN)) THEN
        UPDATE BOOK
        SET TITLE=A_TITLE,
            IMAGE=A_IMAGE,
            NUMBER_OF_PAGES=A_NUMBER_OF_PAGES,
            LANGUAGE=A_LANGUAGE,
            DESCRIPTION=A_DESCRIPTION,
            PUBLISHER_ID=A_PUBLISHER_ID,
            PUBLISH_YEAR=A_PUBLISH_YEAR
        WHERE ISBN = A_ISBN;
    ELSE
        raise_application_error(-20111, 'DOES NOT EXIST');
    END IF;
END;
/


CREATE OR REPLACE PROCEDURE DELETE_BOOK(B_ISBN IN VARCHAR2) IS
    P NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO P
    FROM BOOK
    WHERE ISBN = B_ISBN;
    IF
        P = 0 THEN
        raise_application_error(-20111, 'No Data Found');
    ELSE
        DELETE
        FROM BOOK
        WHERE ISBN = B_ISBN;
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE DELETE_ADMIN(A_ID IN VARCHAR2) IS
BEGIN
    IF IS_VALID_DELETE_ADMIN(A_ID) THEN
        DELETE
        FROM ADMIN
        WHERE USER_ID = A_ID;
    ELSE
        raise_application_error(-20111, 'No Data Found');
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE DELETE_EDITION(E_ID IN VARCHAR2) IS
    ID      VARCHAR2(100);
    COUNTER NUMBER;
BEGIN
    SELECT ISBN
    INTO ID
    FROM EDITION
    WHERE EDITION_ID = E_ID;
    SELECT COUNT(*)
    INTO COUNTER
    FROM EDITION
    WHERE ISBN = ID;
    IF
        COUNTER < 2 THEN
        raise_application_error(-20111, 'Only one edition left');
    ELSE
        DELETE
        FROM EDITION
        WHERE EDITION_ID = E_ID;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        raise_application_error(-20111, 'No Data Found');
    WHEN OTHERS THEN
        raise_application_error(-20111, 'Some Error Occurred');
END;
/

CREATE OR REPLACE PROCEDURE INSERT_NEWS(TEXT VARCHAR2) IS
    ID NUMBER;
BEGIN
    INSERT INTO NEWS(NEWS_TEXT, NEWS_DATE) VALUES (TEXT, SYSDATE);
    select news_seq.currval
    into ID
    from DUAL;
end;
/

CREATE OR REPLACE PROCEDURE INSERT_MESSAGE(U_ID VARCHAR2, TEXT VARCHAR2) IS
    ID NUMBER;
BEGIN
    INSERT INTO MESSAGE(User_ID, Message_Date, Message) VALUES (U_ID, SYSDATE, TEXT);
    select msg_seq.currval
    into ID
    from DUAL;
end;
/


CREATE OR REPLACE PROCEDURE INSERT_RENT_HISTORY(A_USER_ID VARCHAR2, A_EDITION_ID VARCHAR2, A_RETURN_DATE DATE) IS
    COUNTER NUMBER;
    ID      VARCHAR2(100);
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM RENT_HISTORY
    WHERE USER_ID = A_USER_ID
      AND STATUS = 0;
    IF COUNTER = 0 THEN
        INSERT INTO RENT_HISTORY(USER_ID, Edition_ID, Rent_Date, Return_Date)
        VALUES (A_USER_ID, A_EDITION_ID, SYSDATE, A_RETURN_DATE);
        select history_seq.currval
        into ID
        from DUAL;
        DELETE
        FROM REQUEST
        WHERE USER_ID = A_USER_ID
          AND Edition_ID = A_EDITION_ID;
    ELSE
        DBMS_OUTPUT.PUT_LINE('RETURN THE PREVIOUS BOOK');
    end if;
END;
/

CREATE OR REPLACE PROCEDURE EDIT_RENT_HISTORY(A_ID VARCHAR2, PAY BOOLEAN) IS
    ID      VARCHAR2(200);
    COUNTER NUMBER;
BEGIN
    SELECT Rent_History_ID
    INTO ID
    FROM RENT_HISTORY
    WHERE Rent_History_ID = A_ID;
    SELECT COUNT(*)
    INTO COUNTER
    FROM FINE_HISTORY
    WHERE Rent_History_ID = A_ID
      AND Payment_Date IS NULL;
    IF (COUNTER > 0) THEN
        IF (PAY = TRUE) THEN
            UPDATE FINE_HISTORY
            SET Payment_Date = SYSDATE
            WHERE Rent_History_ID = A_ID;
        ELSE
            RAISE_APPLICATION_ERROR(-20001, 'PAYMENT IS NOT DONE');
        END IF;
    END IF;
    UPDATE RENT_HISTORY
    SET Status = 1
    WHERE Rent_History_ID = A_ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, 'DOES NOT EXIST');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20003, 'UNKNOWN ERROR OCCURRED');
END;
/


CREATE OR REPLACE PROCEDURE INSERT_FINE_HISTORY(A_RENT_ID VARCHAR2) IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM RENT_HISTORY
    WHERE Rent_History_ID = A_RENT_ID
      AND STATUS = 0
      AND Return_Date < SYSDATE;
    IF COUNTER = 1 THEN
        INSERT INTO FINE_HISTORY(RENT_HISTORY_ID, START_DATE)
        VALUES (A_RENT_ID, SYSDATE);
    ELSE
        DBMS_OUTPUT.PUT_LINE('NO SUCH DATA');
    end if;
END;
/

CREATE OR REPLACE PROCEDURE EDIT_FINE_HISTORY(A_ID VARCHAR2) IS
    ID VARCHAR2(200);
BEGIN
    SELECT Rent_History_ID
    INTO ID
    FROM FINE_HISTORY
    WHERE Rent_History_ID = A_ID
      AND Payment_Date IS NULL;
    UPDATE FINE_HISTORY
    SET Payment_Date = SYSDATE
    WHERE Rent_History_ID = A_ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('DOES NOT EXIST');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR OCCURED');
END;
/

CREATE OR REPLACE PROCEDURE update_fine_history AS
BEGIN
    -- Insert overdue records into FINE_HISTORY
    INSERT INTO FINE_HISTORY (Rent_History_ID, Start_Date)
    SELECT Rent_History_ID, Return_Date
    FROM rent_history
    WHERE Status = 0
      AND Return_Date < SYSDATE
      AND Rent_History_ID NOT IN (SELECT Rent_History_ID FROM FINE_HISTORY);

    -- Update fee amount for unpaid fines
    UPDATE FINE_HISTORY
    SET Fee_Amount = (SYSDATE - Start_Date) * 0.1 -- Update with your logic
    WHERE Payment_Date IS NULL;
END;
/

BEGIN
    DBMS_SCHEDULER.create_job(
            job_name => 'UPDATE_FINE_HISTORY_JOB',
            job_type => 'PLSQL_BLOCK',
            job_action => 'BEGIN update_fine_history; END;',
            start_date => SYSTIMESTAMP,
            repeat_interval => 'FREQ=HOURLY; INTERVAL=2', -- Run every 2 hours
            enabled => TRUE
        );
END;
/

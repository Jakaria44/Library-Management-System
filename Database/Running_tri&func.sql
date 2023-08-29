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
        INSERT INTO "USER" ("FIRST_NAME", "LAST_NAME", "IMAGE", "ADDRESS", "EMAIL", "PASSWORD", "CONTACT_NO", "GENDER")
        VALUES (A_FIRST_NAME, A_LAST_NAME, A_IMAGE, A_ADDRESS, A_EMAIL, A_PASSWORD, A_CONTACT_NO, A_GENDER);
        select user_seq.currval
        into ID
        from DUAL;
    ELSE
        raise_application_error(-20111, 'EMAIL IS NOT UNIQUE');
    END IF;
END ;
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
        INSERT INTO "USER" ("FIRST_NAME", "LAST_NAME", "IMAGE", "ADDRESS", "EMAIL", "PASSWORD", "CONTACT_NO", "GENDER")
        VALUES (A_FIRST_NAME, A_LAST_NAME, A_IMAGE, A_ADDRESS, A_EMAIL, A_PASSWORD, A_CONTACT_NO, A_GENDER);
        select user_seq.currval
        into ID
        from DUAL;
        INSERT INTO "ADMIN" ("USER_ID")
        VALUES (ID);
    ELSE
        raise_application_error(-20111, 'EMAIL IS NOT UNIQUE');
    END IF;
END ;
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


CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_USER(
    P_USER_ID IN VARCHAR2,
    P_EMAIL IN VARCHAR2) RETURN BOOLEAN IS
    COUNTER  NUMBER;
    COUNTER2 NUMBER;
BEGIN
    SELECT COUNT(*) INTO COUNTER FROM "USER" WHERE USER_ID = P_USER_ID;

    IF COUNTER = 0 THEN
        RETURN FALSE;
    ELSE
        SELECT COUNT(*) INTO COUNTER2 FROM "USER" WHERE EMAIL = P_EMAIL AND USER_ID <> P_USER_ID;

        IF COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;
END;
/

-- run

CREATE OR REPLACE PROCEDURE UPDATE_USER(
    A_USER_ID IN VARCHAR2,
    A_FIRST_NAME IN VARCHAR2,
    A_LAST_NAME IN VARCHAR2,
    A_ADDRESS IN VARCHAR2,
    A_EMAIL IN VARCHAR2,
    A_CONTACT_NO IN VARCHAR2,
    A_IMAGE IN VARCHAR2,
    A_GENDER IN VARCHAR2,
    A_PASSWORD IN VARCHAR2) IS
BEGIN
    IF (IS_VALID_UPDATE_USER(A_USER_ID, A_EMAIL)) THEN
        UPDATE "USER"
        SET FIRST_NAME = A_FIRST_NAME,
            LAST_NAME  = A_LAST_NAME,
            ADDRESS    = A_ADDRESS,
            EMAIL      = A_EMAIL,
            CONTACT_NO = A_CONTACT_NO,
            IMAGE      = A_IMAGE,
            GENDER     = A_GENDER,
            PASSWORD   = A_PASSWORD
        WHERE USER_ID = A_USER_ID;
    ELSE
        raise_application_error(-20111, 'USER CANNOT BE UPDATED');
    END IF;
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
        RAISE_APPLICATION_ERROR(-20001, 'Unknown error occured.');
END ;
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
        RAISE_APPLICATION_ERROR(-20001, 'Does not Exist.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'Unknown error occured.');
END ;
/

--TODO: need to check before insertion
CREATE OR REPLACE FUNCTION IS_VALID_REQUEST(A_ID IN VARCHAR2) RETURN BOOLEAN IS
    COUNTER NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO COUNTER
    FROM FINE_HISTORY F
             JOIN RENT_HISTORY R on (F.Rent_History_ID = R.Rent_History_ID)
    WHERE USER_ID = A_ID
      AND Payment_Date IS NULL;
    IF
        COUNTER = 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
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
            repeat_interval => 'FREQ=HOURLY; INTERVAL=24', -- Run every 2 hours
            enabled => TRUE
        );
END;
/

--NEW 29-8-2023

CREATE OR REPLACE FUNCTION IS_VALID_EDITION(A_EDITION_ID VARCHAR2, A_EDITION_NUM NUMBER) RETURN BOOLEAN IS
    COUNTER  NUMBER;
    COUNTER2 NUMBER;
    A_ISBN   VARCHAR2(20);
BEGIN
    SELECT ISBN
    INTO A_ISBN
    FROM EDITION
    WHERE EDITION_ID = A_EDITION_ID;
    SELECT COUNT(*)
    INTO COUNTER
    FROM EDITION
    WHERE EDITION_ID = A_EDITION_ID
      AND EDITION_NUM = A_EDITION_NUM;
    IF
        COUNTER = 0 THEN
        SELECT COUNT(*)
        INTO COUNTER2
        FROM EDITION
        WHERE ISBN = A_ISBN
          AND EDITION_NUM = A_EDITION_NUM;
        IF COUNTER2 = 0 THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        end if;
    ELSE
        RETURN TRUE;
    END IF;
end;
/


CREATE OR REPLACE PROCEDURE UPDATE_EDITION(A_EDITION_ID VARCHAR2,
                                           A_EDITION_NUM VARCHAR2,
                                           A_NUM_OF_COPIES NUMBER,
                                           A_PUBLISH_YEAR NUMBER) IS
    COPIES NUMBER;
    YEAR   NUMBER(4);
BEGIN
    IF
        (IS_VALID_EDITION(A_EDITION_ID, A_EDITION_NUM)) THEN
        SELECT NUM_OF_COPIES, PUBLISH_YEAR
        INTO COPIES, YEAR
        FROM EDITION
        WHERE EDITION_ID = A_EDITION_ID;
        COPIES := COPIES + A_NUM_OF_COPIES;
        IF COPIES < 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'CANNOT BE NEGATIVE');
        end if;
        IF A_PUBLISH_YEAR IS NULL THEN
            YEAR := A_PUBLISH_YEAR;
        END IF;
        UPDATE EDITION
        SET NUM_OF_COPIES = COPIES,
            PUBLISH_YEAR  = YEAR
        WHERE Edition_ID = A_EDITION_ID;
    ELSE
        raise_application_error(-20111, 'EDITION does not exist');
    END IF;
END ;
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


CREATE OR REPLACE PROCEDURE INSERT_RENT_HISTORY(A_USER_ID VARCHAR2, A_EDITION_ID VARCHAR2, A_RETURN_DATE DATE) IS
    ID     VARCHAR2(100);
    TDATE  DATE;
    COPIES NUMBER;
BEGIN
    SELECT EDITION_ID
    INTO ID
    FROM REQUEST
    WHERE USER_ID = A_USER_ID
      AND Edition_ID = A_EDITION_ID;
    SELECT NUM_OF_COPIES
    INTO COPIES
    FROM EDITION
    WHERE EDITION_ID = A_EDITION_ID;
    IF COPIES <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Not Enough Copies');
    end if;
    IF A_RETURN_DATE IS NULL THEN
        TDATE := SYSDATE + 7;
    ELSE
        TDATE := A_RETURN_DATE;
    END IF;
    INSERT INTO RENT_HISTORY(USER_ID, Edition_ID, Rent_Date, Return_Date)
    VALUES (A_USER_ID, A_EDITION_ID, SYSDATE, TDATE);
    select history_seq.currval
    into ID
    from DUAL;
    DELETE
    FROM REQUEST
    WHERE USER_ID = A_USER_ID
      AND Edition_ID = A_EDITION_ID;
    UPDATE EDITION
    SET NUM_OF_COPIES = NUM_OF_COPIES - 1
    WHERE EDITION_ID = A_EDITION_ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001, 'NO REQUEST.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20001, 'Unknown error occured.');
END ;
/


CREATE OR REPLACE PROCEDURE EDIT_HISTORY(U_ID VARCHAR2, A_ID VARCHAR2, PAY BOOLEAN) IS
    ID      VARCHAR2(200);
    COUNTER NUMBER;
BEGIN
    SELECT EDITION_ID
    INTO ID
    FROM RENT_HISTORY
    WHERE Rent_History_ID = A_ID
      AND USER_ID = U_ID AND STATUS = 0;
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
    UPDATE EDITION
    SET NUM_OF_COPIES = NUM_OF_COPIES + 1
    WHERE EDITION_ID = ID;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, 'DOES NOT EXIST');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20003, 'UNKNOWN ERROR OCCURRED');
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_MESSAGE(U_ID IN VARCHAR2) IS
BEGIN
    FOR R IN (SELECT MESSAGE_ID FROM MESSAGE WHERE USER_ID = U_ID) LOOP
        UPDATE MESSAGE
        SET Seen = 1
        WHERE MESSAGE_ID = R.MESSAGE_ID;
    END LOOP;
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

CREATE OR REPLACE PROCEDURE INSERT_NEWS(TEXT VARCHAR2) IS
    ID NUMBER;
BEGIN
    INSERT INTO NEWS(NEWS_TEXT, NEWS_DATE) VALUES (TEXT, SYSDATE);
    select news_seq.currval
    into ID
    from DUAL;
end;
/

CREATE OR REPLACE PROCEDURE DELETE_MESSAGE(U_ID IN VARCHAR2) IS
BEGIN
    FOR R IN (SELECT MESSAGE_ID FROM MESSAGE WHERE USER_ID = U_ID) LOOP
        DELETE
        FROM MESSAGE
        WHERE MESSAGE_ID = R.MESSAGE_ID;
    END LOOP;
END;
/
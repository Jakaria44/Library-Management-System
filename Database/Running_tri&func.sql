
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
BEFORE INSERT ON PUBLISHER
FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image := 'https://ds.rokomari.store/rokomari110/company/publisher.png';
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_author_default_image
BEFORE INSERT ON AUTHOR
FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image := 'https://previews.123rf.com/images/anatolir/anatolir1712/anatolir171201476/91832679-man-avatar-icon-flat-illustration-of-man-avatar-vector-icon-isolated-on-white-background.jpg';
    END IF;
END;
/


CREATE OR REPLACE TRIGGER trg_user_default_image
BEFORE INSERT ON "USER"
FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image := 'https://img.freepik.com/free-icon/user_318-159711.jpg';
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_book_default_image
BEFORE INSERT ON BOOK
FOR EACH ROW
BEGIN
    IF :NEW.Image IS NULL THEN
        :NEW.Image := 'https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg';
    END IF;
END;
/


CREATE OR REPLACE FUNCTION IS_VALID_UPDATE_USER(
    P_USER_ID IN VARCHAR2,
    P_EMAIL IN VARCHAR2) RETURN BOOLEAN IS
    COUNTER NUMBER;
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
            LAST_NAME = A_LAST_NAME,
            ADDRESS = A_ADDRESS,
            EMAIL = A_EMAIL,
            CONTACT_NO = A_CONTACT_NO,
            IMAGE = A_IMAGE,
            GENDER = A_GENDER,
            PASSWORD = A_PASSWORD
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
		
    RAISE_APPLICATION_ERROR(-20001, 'Record already exists.');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO FAVOURITE(USER_ID, ISBN) VALUES (U_ID, A_ISBN);
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'An error occurred.');
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

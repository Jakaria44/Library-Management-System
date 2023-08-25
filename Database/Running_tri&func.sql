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
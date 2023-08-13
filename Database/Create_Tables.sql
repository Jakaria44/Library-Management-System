/*
 Navicat Premium Data Transfer

 Source Server         : testing library
 Source Server Type    : Oracle
 Source Server Version : 190000 (Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production)
 Source Host           : localhost:1521
 Source Schema         : C##LIBRARY

 Target Server Type    : Oracle
 Target Server Version : 190000 (Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production)
 File Encoding         : 65001

 Date: 13/08/2023 17:59:39
*/


-- ----------------------------
-- Table structure for ADMIN
-- ----------------------------
DROP TABLE "C##LIBRARY"."ADMIN";
CREATE TABLE "C##LIBRARY"."ADMIN" (
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "SECURITY_KEY" VARCHAR2(20 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of ADMIN
-- ----------------------------

-- ----------------------------
-- Table structure for APPLY
-- ----------------------------
DROP TABLE "C##LIBRARY"."APPLY";
CREATE TABLE "C##LIBRARY"."APPLY" (
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "JOB_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "APPLY_DATE" DATE VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of APPLY
-- ----------------------------

-- ----------------------------
-- Table structure for AUTHOR
-- ----------------------------
DROP TABLE "C##LIBRARY"."AUTHOR";
CREATE TABLE "C##LIBRARY"."AUTHOR" (
  "AUTHOR_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "DOB" DATE VISIBLE NOT NULL,
  "DOD" DATE VISIBLE,
  "NATIONALITY" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "IMAGE" VARCHAR2(200 BYTE) VISIBLE DEFAULT 'https://previews.123rf.com/images/anatolir/anatolir1712/anatolir171201476/91832679-man-avatar-icon-flat-illustration-of-man-avatar-vector-icon-isolated-on-white-background.jpg',
  "NAME" VARCHAR2(50 BYTE) VISIBLE NOT NULL,
  "BIO" VARCHAR2(3000 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of AUTHOR
-- ----------------------------
INSERT INTO "C##LIBRARY"."AUTHOR" VALUES ('1', TO_DATE('1965-07-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), TO_DATE('1990-12-30 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), 'British', 'https://ds.rokomari.store/rokomari110/people/6ed601ea2b54_2559.png', 'J. K. Rowling', 'Joan Rowling, author of the popular Harry Potter series, K. Known as Rowling, she was born on July 31, 1985, in Yate, Gloucestershire, England. Ever since he was a child, he has been addicted to story books, and he loved to write new stories. Listening to her younger sister tell her own story, she started dreaming of becoming a great writer. He spent his childhood in a rural environment. After graduating from the University of Exeter, he began his career as an English teacher, but had to move to Portugal. Later when she came to Edinburgh from Portugal, she was the mother of one child, single mother. When he arrived in Edinburgh, he read financially. Originally he had to hold a pen in his hand in search of money, the result of which is the world famous fiction ''Harry Potter''. Joan Rowling became one of the most well-known literary figures in today''s literary world, as an orphaned simple boy discovered the existence of magic in himself and gradually wrote strange and unimaginable stories that happened in his life. K. Rowling ''. The commercially successful series brought back its fortunes and forced bookworms of all ages to wander into that world of magical fairy tales. J. K. Rowling''s books include a total of six books in the Harry Potter series. These 6 books have earned the title of bestseller worldwide and have sold more than 450 million copies so far. J. K. Rowling''s books include Harry Potter and the Philosopher''s Stone, Harry Potter and the Chamber of Secrets, Harry Potter and the Prisoner of Azkaban, Harry Potter and the Goblet of Fire, and Harry. ''The Order of the Phoenix'', ''Harry Potter and the Half-Blood Prince'', ''Harry Potter and the Deathly Hallows'','' The Casual Vacancy '','' Cuckoo''s Calling '','' The Silkworm '','' Career of Evil '','' Lethal White ''etc. He also co-wrote the play Harry Potter and the Cursed Child with Jack Thorne and John Tiffany. English language as well as J. K. Rowling''s translation books are equally popular. The author of this billionaire has also been contributing to the society through donations to various charities.');

-- ----------------------------
-- Table structure for BOOK
-- ----------------------------
DROP TABLE "C##LIBRARY"."BOOK";
CREATE TABLE "C##LIBRARY"."BOOK" (
  "ISBN" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "TITLE" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "NUMBER_OF_PAGES" NUMBER VISIBLE NOT NULL,
  "LANGUAGE" VARCHAR2(10 BYTE) VISIBLE,
  "DESCRIPTION" VARCHAR2(2000 BYTE) VISIBLE,
  "PUBLISHER_ID" VARCHAR2(20 BYTE) VISIBLE,
  "IMAGE" VARCHAR2(200 BYTE) VISIBLE DEFAULT 'https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg',
  "PUBLISH_YEAR" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of BOOK
-- ----------------------------
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9781408855652', 'Harry Potter and the Philosophers Stone', '352', 'English', 'Harry Potter discovers he''s a wizard on his eleventh birthday and is invited to attend Hogwarts School of Witchcraft and Wizardry. There, he makes friends, learns magic, and uncovers the mystery of the Sorcerer''s Stone.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/4cf25a33d8a4_86392.gif', '1997');
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9781408855669', 'Harry Potter and the Chamber of Secrets ', '384', 'English', 'Harry returns to Hogwarts for his second year, only to find the school plagued by mysterious attacks. With the help of his friends, he investigates the legend of the Chamber of Secrets and its monstrous secrets.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/58c09b4d2824_110120.gif', '1998');
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9781408855676', 'Harry Potter and the Prisoner of Azkaban', '462', 'English', 'In his third year, Harry learns that an escaped prisoner, Sirius Black, is believed to be after him. With new magical creatures and revelations about his past, Harry uncovers the truth behind Sirius''s escape.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/a5a669963_101016.jpg', '1999');
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9781408834992', 'Harry Potter and the Goblet of Fire', '640', 'English', 'Harry is unexpectedly entered into the dangerous Triwizard Tournament, competing against older students. But as the tournament progresses, dark forces are at work, leading to a shocking turn of events.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/629765c8f_152119.jpg', '2000');
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9780747591269', 'Harry Potter and the Order of the Phoenix', '901', 'English', 'As Harry enters his fifth year, he faces resistance from the Ministry of Magic and his peers who doubt his claims about the return of Lord Voldemort. He forms "Dumbledore''s Army" to teach his friends defensive magic.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/bc4625241f54_86391.jpg', NULL);
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9780439785969', 'Harry Potter and the Half-Blood Prince', '652', 'English', 'Voldemort''s power is growing, and Harry learns about his enemy''s past through memories collected in a mysterious book. Meanwhile, he navigates teenage emotions and the challenges of preparing for the final battle.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/127d59aff684_102401.gif', '2005');
INSERT INTO "C##LIBRARY"."BOOK" VALUES ('9781408894743', 'Harry Potter and the Deathly Hallows', '608', 'English', 'In the final book, Harry, Ron, and Hermione go on a dangerous mission to destroy Horcruxes, Voldemort''s secret to immortality. The trio faces their most challenging obstacles and makes ultimate sacrifices.', '1', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/Harry_Potter_and_the_Deathly_Hallows_(Se-J.K_Rowling-699a7-122325.jpg', NULL);

-- ----------------------------
-- Table structure for BOOK_GENRE
-- ----------------------------
DROP TABLE "C##LIBRARY"."BOOK_GENRE";
CREATE TABLE "C##LIBRARY"."BOOK_GENRE" (
  "ISBN" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "GENRE_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of BOOK_GENRE
-- ----------------------------

-- ----------------------------
-- Table structure for EDITION
-- ----------------------------
DROP TABLE "C##LIBRARY"."EDITION";
CREATE TABLE "C##LIBRARY"."EDITION" (
  "EDITION_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "ISBN" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "EDITION_NUM" NUMBER VISIBLE NOT NULL,
  "NUM_OF_COPIES" NUMBER VISIBLE NOT NULL,
  "PUBLISH_YEAR" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of EDITION
-- ----------------------------

-- ----------------------------
-- Table structure for EMPLOYEE
-- ----------------------------
DROP TABLE "C##LIBRARY"."EMPLOYEE";
CREATE TABLE "C##LIBRARY"."EMPLOYEE" (
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "JOB_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "JOIN_DATE" DATE VISIBLE NOT NULL,
  "END_DATE" DATE VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of EMPLOYEE
-- ----------------------------

-- ----------------------------
-- Table structure for FAVOURITE
-- ----------------------------
DROP TABLE "C##LIBRARY"."FAVOURITE";
CREATE TABLE "C##LIBRARY"."FAVOURITE" (
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "ISBN" VARCHAR2(100 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of FAVOURITE
-- ----------------------------

-- ----------------------------
-- Table structure for FINE_HISTORY
-- ----------------------------
DROP TABLE "C##LIBRARY"."FINE_HISTORY";
CREATE TABLE "C##LIBRARY"."FINE_HISTORY" (
  "RENT_HISTORY_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "FEE_AMOUNT" NUMBER VISIBLE NOT NULL,
  "START_DATE" DATE VISIBLE NOT NULL,
  "PAYMENT_DATE" DATE VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of FINE_HISTORY
-- ----------------------------

-- ----------------------------
-- Table structure for GENRE
-- ----------------------------
DROP TABLE "C##LIBRARY"."GENRE";
CREATE TABLE "C##LIBRARY"."GENRE" (
  "GENRE_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "GENRE_NAME" VARCHAR2(50 BYTE) VISIBLE DEFAULT 'Others'
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of GENRE
-- ----------------------------

-- ----------------------------
-- Table structure for JOB
-- ----------------------------
DROP TABLE "C##LIBRARY"."JOB";
CREATE TABLE "C##LIBRARY"."JOB" (
  "JOB_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "SALARY" NUMBER VISIBLE NOT NULL,
  "JOB_TITLE" VARCHAR2(100 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of JOB
-- ----------------------------

-- ----------------------------
-- Table structure for MESSAGE
-- ----------------------------
DROP TABLE "C##LIBRARY"."MESSAGE";
CREATE TABLE "C##LIBRARY"."MESSAGE" (
  "MESSAGE_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "MESSAGE_DATE" DATE VISIBLE NOT NULL,
  "MESSAGE" VARCHAR2(2000 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of MESSAGE
-- ----------------------------

-- ----------------------------
-- Table structure for NEWS
-- ----------------------------
DROP TABLE "C##LIBRARY"."NEWS";
CREATE TABLE "C##LIBRARY"."NEWS" (
  "NEWS_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "NEWS_TEXT" VARCHAR2(2000 BYTE) VISIBLE,
  "NEWS_DATE" DATE VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of NEWS
-- ----------------------------

-- ----------------------------
-- Table structure for PUBLISHER
-- ----------------------------
DROP TABLE "C##LIBRARY"."PUBLISHER";
CREATE TABLE "C##LIBRARY"."PUBLISHER" (
  "PUBLISHER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "NAME" VARCHAR2(100 BYTE) VISIBLE,
  "CITY" VARCHAR2(100 BYTE) VISIBLE,
  "COUNTRY" VARCHAR2(100 BYTE) VISIBLE,
  "POSTAL_CODE" VARCHAR2(100 BYTE) VISIBLE,
  "CONTACT_NO" VARCHAR2(20 BYTE) VISIBLE,
  "EMAIL" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "IMAGE" VARCHAR2(200 BYTE) VISIBLE DEFAULT 'https://ds.rokomari.store/rokomari110/company/publisher.png'
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of PUBLISHER
-- ----------------------------
INSERT INTO "C##LIBRARY"."PUBLISHER" VALUES ('1', 'Bloomsbury Publishing', 'London', 'England', 'WC1B 3DP', '+44 (0)20 7631 5600', 'contact@bloomsbury.com', 'https://media-exp1.licdn.com/dms/image/C4E0BAQEDkPybVXr47Q/company-logo_200_200/0/1544531682586?e=2159024400&v=beta&t=JjAs9ok_PwgXA9CFsXKm3bt6fjbFI4N7SZRn4ajOUVg');

-- ----------------------------
-- Table structure for RENT_HISTORY
-- ----------------------------
DROP TABLE "C##LIBRARY"."RENT_HISTORY";
CREATE TABLE "C##LIBRARY"."RENT_HISTORY" (
  "RENT_HISTORY_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "RENT_DATE" DATE VISIBLE NOT NULL,
  "RETURN_DATE" DATE VISIBLE,
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "EDITION_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of RENT_HISTORY
-- ----------------------------

-- ----------------------------
-- Table structure for REQUEST
-- ----------------------------
DROP TABLE "C##LIBRARY"."REQUEST";
CREATE TABLE "C##LIBRARY"."REQUEST" (
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "EDITION_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "COUNT" NUMBER VISIBLE NOT NULL,
  "REQUEST_DATE" DATE VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of REQUEST
-- ----------------------------

-- ----------------------------
-- Table structure for REVIEW_RATING
-- ----------------------------
DROP TABLE "C##LIBRARY"."REVIEW_RATING";
CREATE TABLE "C##LIBRARY"."REVIEW_RATING" (
  "ISBN" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "RATING" NUMBER(1,0) VISIBLE NOT NULL,
  "REVIEW" VARCHAR2(2000 BYTE) VISIBLE,
  "EDIT_DATE" DATE VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of REVIEW_RATING
-- ----------------------------

-- ----------------------------
-- Table structure for USER
-- ----------------------------
DROP TABLE "C##LIBRARY"."USER";
CREATE TABLE "C##LIBRARY"."USER" (
  "USER_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "FIRST_NAME" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "ADDRESS" VARCHAR2(100 BYTE) VISIBLE,
  "EMAIL" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "PASSWORD" VARCHAR2(200 BYTE) VISIBLE NOT NULL,
  "CONTACT_NO" VARCHAR2(20 BYTE) VISIBLE,
  "GENDER" CHAR(1 BYTE) VISIBLE,
  "IMAGE" VARCHAR2(200 BYTE) VISIBLE DEFAULT 'https://img.freepik.com/free-icon/user_318-159711.jpg',
  "LAST_NAME" VARCHAR2(20 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of USER
-- ----------------------------

-- ----------------------------
-- Table structure for WRITTEN_BY
-- ----------------------------
DROP TABLE "C##LIBRARY"."WRITTEN_BY";
CREATE TABLE "C##LIBRARY"."WRITTEN_BY" (
  "ISBN" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "AUTHOR_ID" VARCHAR2(20 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of WRITTEN_BY
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table ADMIN
-- ----------------------------
ALTER TABLE "C##LIBRARY"."ADMIN" ADD CONSTRAINT "SYS_C008268" PRIMARY KEY ("USER_ID");

-- ----------------------------
-- Checks structure for table ADMIN
-- ----------------------------
ALTER TABLE "C##LIBRARY"."ADMIN" ADD CONSTRAINT "SYS_C008267" CHECK ("SECURITY_KEY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table APPLY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."APPLY" ADD CONSTRAINT "SYS_C008298" PRIMARY KEY ("USER_ID", "JOB_ID");

-- ----------------------------
-- Checks structure for table APPLY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."APPLY" ADD CONSTRAINT "SYS_C008296" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."APPLY" ADD CONSTRAINT "SYS_C008297" CHECK ("JOB_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."APPLY" ADD CONSTRAINT "SYS_C008321" CHECK ("APPLY_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##LIBRARY"."AUTHOR" ADD CONSTRAINT "SYS_C008232" PRIMARY KEY ("AUTHOR_ID");

-- ----------------------------
-- Checks structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##LIBRARY"."AUTHOR" ADD CONSTRAINT "SYS_C008230" CHECK ("DOB" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."AUTHOR" ADD CONSTRAINT "SYS_C008231" CHECK ("NATIONALITY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."AUTHOR" ADD CONSTRAINT "SYS_C008335" CHECK ("NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table BOOK
-- ----------------------------
ALTER TABLE "C##LIBRARY"."BOOK" ADD CONSTRAINT "SYS_C008236" PRIMARY KEY ("ISBN");

-- ----------------------------
-- Checks structure for table BOOK
-- ----------------------------
ALTER TABLE "C##LIBRARY"."BOOK" ADD CONSTRAINT "SYS_C008233" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."BOOK" ADD CONSTRAINT "SYS_C008234" CHECK ("NUMBER_OF_PAGES" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table BOOK_GENRE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."BOOK_GENRE" ADD CONSTRAINT "SYS_C008264" PRIMARY KEY ("ISBN", "GENRE_ID");

-- ----------------------------
-- Checks structure for table BOOK_GENRE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."BOOK_GENRE" ADD CONSTRAINT "SYS_C008263" CHECK ("ISBN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table EDITION
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EDITION" ADD CONSTRAINT "SYS_C008242" PRIMARY KEY ("EDITION_ID");

-- ----------------------------
-- Uniques structure for table EDITION
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EDITION" ADD CONSTRAINT "SYS_C008243" UNIQUE ("ISBN", "EDITION_NUM") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table EDITION
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EDITION" ADD CONSTRAINT "SYS_C008238" CHECK ("ISBN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."EDITION" ADD CONSTRAINT "SYS_C008239" CHECK ("EDITION_NUM" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."EDITION" ADD CONSTRAINT "SYS_C008240" CHECK ("NUM_OF_COPIES" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table EMPLOYEE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EMPLOYEE" ADD CONSTRAINT "SYS_C008293" PRIMARY KEY ("USER_ID", "JOB_ID");

-- ----------------------------
-- Checks structure for table EMPLOYEE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EMPLOYEE" ADD CONSTRAINT "SYS_C008290" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."EMPLOYEE" ADD CONSTRAINT "SYS_C008291" CHECK ("JOB_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."EMPLOYEE" ADD CONSTRAINT "SYS_C008292" CHECK ("JOIN_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table FAVOURITE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."FAVOURITE" ADD CONSTRAINT "SYS_C008272" PRIMARY KEY ("USER_ID", "ISBN");

-- ----------------------------
-- Checks structure for table FAVOURITE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."FAVOURITE" ADD CONSTRAINT "SYS_C008270" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."FAVOURITE" ADD CONSTRAINT "SYS_C008271" CHECK ("ISBN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table FINE_HISTORY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."FINE_HISTORY" ADD CONSTRAINT "SYS_C008310" PRIMARY KEY ("RENT_HISTORY_ID");

-- ----------------------------
-- Checks structure for table FINE_HISTORY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."FINE_HISTORY" ADD CONSTRAINT "SYS_C008307" CHECK ("RENT_HISTORY_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."FINE_HISTORY" ADD CONSTRAINT "SYS_C008308" CHECK ("FEE_AMOUNT" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."FINE_HISTORY" ADD CONSTRAINT "SYS_C008309" CHECK ("START_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table GENRE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."GENRE" ADD CONSTRAINT "SYS_C008262" PRIMARY KEY ("GENRE_ID");

-- ----------------------------
-- Primary Key structure for table JOB
-- ----------------------------
ALTER TABLE "C##LIBRARY"."JOB" ADD CONSTRAINT "SYS_C008289" PRIMARY KEY ("JOB_ID");

-- ----------------------------
-- Checks structure for table JOB
-- ----------------------------
ALTER TABLE "C##LIBRARY"."JOB" ADD CONSTRAINT "SYS_C008286" CHECK ("JOB_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."JOB" ADD CONSTRAINT "SYS_C008287" CHECK ("SALARY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."JOB" ADD CONSTRAINT "SYS_C008288" CHECK ("JOB_TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table MESSAGE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."MESSAGE" ADD CONSTRAINT "SYS_C008318" PRIMARY KEY ("MESSAGE_ID");

-- ----------------------------
-- Checks structure for table MESSAGE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."MESSAGE" ADD CONSTRAINT "SYS_C008315" CHECK ("MESSAGE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."MESSAGE" ADD CONSTRAINT "SYS_C008316" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."MESSAGE" ADD CONSTRAINT "SYS_C008317" CHECK ("MESSAGE_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table NEWS
-- ----------------------------
ALTER TABLE "C##LIBRARY"."NEWS" ADD CONSTRAINT "SYS_C008314" PRIMARY KEY ("NEWS_ID");

-- ----------------------------
-- Checks structure for table NEWS
-- ----------------------------
ALTER TABLE "C##LIBRARY"."NEWS" ADD CONSTRAINT "SYS_C008312" CHECK ("NEWS_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."NEWS" ADD CONSTRAINT "SYS_C008313" CHECK ("NEWS_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table PUBLISHER
-- ----------------------------
ALTER TABLE "C##LIBRARY"."PUBLISHER" ADD CONSTRAINT "SYS_C008227" PRIMARY KEY ("PUBLISHER_ID");

-- ----------------------------
-- Checks structure for table PUBLISHER
-- ----------------------------
ALTER TABLE "C##LIBRARY"."PUBLISHER" ADD CONSTRAINT "SYS_C008226" CHECK ("EMAIL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table RENT_HISTORY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."RENT_HISTORY" ADD CONSTRAINT "SYS_C008305" PRIMARY KEY ("RENT_HISTORY_ID");

-- ----------------------------
-- Checks structure for table RENT_HISTORY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."RENT_HISTORY" ADD CONSTRAINT "SYS_C008301" CHECK ("RENT_HISTORY_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."RENT_HISTORY" ADD CONSTRAINT "SYS_C008302" CHECK ("RENT_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."RENT_HISTORY" ADD CONSTRAINT "SYS_C008303" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."RENT_HISTORY" ADD CONSTRAINT "SYS_C008304" CHECK ("EDITION_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table REQUEST
-- ----------------------------
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008253" PRIMARY KEY ("USER_ID", "EDITION_ID");

-- ----------------------------
-- Checks structure for table REQUEST
-- ----------------------------
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008250" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008251" CHECK ("EDITION_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008252" CHECK ("COUNT" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008320" CHECK ("REQUEST_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table REVIEW_RATING
-- ----------------------------
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008332" PRIMARY KEY ("ISBN", "USER_ID");

-- ----------------------------
-- Checks structure for table REVIEW_RATING
-- ----------------------------
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008328" CHECK ("ISBN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008329" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008330" CHECK ("RATING" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008331" CHECK ("EDIT_DATE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table USER
-- ----------------------------
ALTER TABLE "C##LIBRARY"."USER" ADD CONSTRAINT "SYS_C008249" PRIMARY KEY ("USER_ID");

-- ----------------------------
-- Checks structure for table USER
-- ----------------------------
ALTER TABLE "C##LIBRARY"."USER" ADD CONSTRAINT "SYS_C008245" CHECK ("FIRST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."USER" ADD CONSTRAINT "SYS_C008247" CHECK ("EMAIL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."USER" ADD CONSTRAINT "SYS_C008248" CHECK ("PASSWORD" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table WRITTEN_BY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008258" PRIMARY KEY ("ISBN", "AUTHOR_ID");

-- ----------------------------
-- Checks structure for table WRITTEN_BY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008256" CHECK ("ISBN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008257" CHECK ("AUTHOR_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table ADMIN
-- ----------------------------
ALTER TABLE "C##LIBRARY"."ADMIN" ADD CONSTRAINT "SYS_C008269" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table APPLY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."APPLY" ADD CONSTRAINT "SYS_C008299" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."APPLY" ADD CONSTRAINT "SYS_C008300" FOREIGN KEY ("JOB_ID") REFERENCES "C##LIBRARY"."JOB" ("JOB_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table BOOK
-- ----------------------------
ALTER TABLE "C##LIBRARY"."BOOK" ADD CONSTRAINT "SYS_C008237" FOREIGN KEY ("PUBLISHER_ID") REFERENCES "C##LIBRARY"."PUBLISHER" ("PUBLISHER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table BOOK_GENRE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."BOOK_GENRE" ADD CONSTRAINT "SYS_C008265" FOREIGN KEY ("ISBN") REFERENCES "C##LIBRARY"."BOOK" ("ISBN") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."BOOK_GENRE" ADD CONSTRAINT "SYS_C008266" FOREIGN KEY ("GENRE_ID") REFERENCES "C##LIBRARY"."GENRE" ("GENRE_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table EDITION
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EDITION" ADD CONSTRAINT "SYS_C008244" FOREIGN KEY ("ISBN") REFERENCES "C##LIBRARY"."BOOK" ("ISBN") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table EMPLOYEE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."EMPLOYEE" ADD CONSTRAINT "SYS_C008294" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."EMPLOYEE" ADD CONSTRAINT "SYS_C008295" FOREIGN KEY ("JOB_ID") REFERENCES "C##LIBRARY"."JOB" ("JOB_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FAVOURITE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."FAVOURITE" ADD CONSTRAINT "SYS_C008273" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."FAVOURITE" ADD CONSTRAINT "SYS_C008274" FOREIGN KEY ("ISBN") REFERENCES "C##LIBRARY"."BOOK" ("ISBN") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FINE_HISTORY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."FINE_HISTORY" ADD CONSTRAINT "SYS_C008311" FOREIGN KEY ("RENT_HISTORY_ID") REFERENCES "C##LIBRARY"."RENT_HISTORY" ("RENT_HISTORY_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table MESSAGE
-- ----------------------------
ALTER TABLE "C##LIBRARY"."MESSAGE" ADD CONSTRAINT "SYS_C008319" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table RENT_HISTORY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."RENT_HISTORY" ADD CONSTRAINT "SYS_C008306" FOREIGN KEY ("EDITION_ID") REFERENCES "C##LIBRARY"."EDITION" ("EDITION_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REQUEST
-- ----------------------------
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008254" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REQUEST" ADD CONSTRAINT "SYS_C008255" FOREIGN KEY ("EDITION_ID") REFERENCES "C##LIBRARY"."EDITION" ("EDITION_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REVIEW_RATING
-- ----------------------------
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008333" FOREIGN KEY ("ISBN") REFERENCES "C##LIBRARY"."BOOK" ("ISBN") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."REVIEW_RATING" ADD CONSTRAINT "SYS_C008334" FOREIGN KEY ("USER_ID") REFERENCES "C##LIBRARY"."USER" ("USER_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table WRITTEN_BY
-- ----------------------------
ALTER TABLE "C##LIBRARY"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008259" FOREIGN KEY ("ISBN") REFERENCES "C##LIBRARY"."BOOK" ("ISBN") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##LIBRARY"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008260" FOREIGN KEY ("AUTHOR_ID") REFERENCES "C##LIBRARY"."AUTHOR" ("AUTHOR_ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

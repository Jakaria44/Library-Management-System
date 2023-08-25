-- AUTHOR
INSERT INTO c##library.AUTHOR (AUTHOR_ID, NAME, IMAGE, BIO, DoB, DoD, NATIONALITY)
VALUES (1, 'J. K. Rowling', 'https://ds.rokomari.store/rokomari110/people/6ed601ea2b54_2559.png',
        'Joan Rowling, author of the popular Harry Potter series, K. Known as Rowling, she was born on July 31, 1985, in Yate, Gloucestershire, England. Ever since he was a child, she started dreaming of becoming a great writer. He spent his childhood in a rural environment. After graduating from the University of Exeter, he began his career as an English teacher, but had to move to Portugal. Later when she came to Edinburgh from Portugal, she was the mother of one child, single mother. When he arrived in Edinburgh, he read financially. Originally he had to hold a pen in his hand in search of money, the result of which is the world famous fiction ''Harry Potter''. Joan Rowling became one of the most well-known literary figures in today''s literary world, as an orphaned simple boy discovered the existence of magic in himself and gradually wrote strange and unimaginable stories that happened in his life. K. Rowling ''. The commercially successful series brought back its fortunes and forced bookworms of all ages to wander into that world of magical fairy tales. J. K. Rowling''s books include a total of six books in the Harry Potter series. These 6 books have earned the title of bestseller worldwide and have sold more than 450 million copies so far. J. K. Rowling''s books include Harry Potter and the Philosopher''s Stone, Harry Potter and the Chamber of Secrets, Harry Potter and the Prisoner of Azkaban, Harry Potter and the Goblet of Fire, and Harry. ''The Order of the Phoenix'', ''Harry Potter and the Half-Blood Prince'', ''Harry Potter and the Deathly Hallows'','' The Casual Vacancy '','' Cuckoo''s Calling '','' The Silkworm '','' Career of Evil '','' Lethal White ''etc. He also co-wrote the play Harry Potter and the Cursed Child with Jack Thorne and John Tiffany. English language as well as J. K. Rowling''s translation books are equally popular. The author of this billionaire has also been contributing to the society through donations to various charities.',
        TO_DATE('31-07-1965', 'DD-MM-YYYY'), TO_DATE('30-12-1990', 'DD-MM-YYYY'), 'British');

--PUBLISHER
INSERT INTO c##library.PUBLISHER (PUBLISHER_ID, NAME, IMAGE, CONTACT_NO, EMAIL, CITY, COUNTRY, POSTAL_CODE)
VALUES (1, 'Bloomsbury Publishing',
        'https://media-exp1.licdn.com/dms/image/C4E0BAQEDkPybVXr47Q/company-logo_200_200/0/1544531682586?e=2159024400&v=beta&t=JjAs9ok_PwgXA9CFsXKm3bt6fjbFI4N7SZRn4ajOUVg',
        '+44 (0)20 7631 5600', 'contact@bloomsbury.com', 'London', 'England', 'WC1B 3DP');

--BOOK
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 1997, 'English', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/4cf25a33d8a4_86392.gif',
        'Harry Potter and the Philosophers Stone', '9781408855652', 352,
        'Harry Potter discovers he''s a wizard on his eleventh birthday and is invited to attend Hogwarts School of Witchcraft and Wizardry. There, he makes friends, learns magic, and uncovers the mystery of the Sorcerer''s Stone.');
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 1998, 'English', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/58c09b4d2824_110120.gif',
        'Harry Potter and the Chamber of Secrets ', '9781408855669', 384,
        'Harry returns to Hogwarts for his second year, only to find the school plagued by mysterious attacks. With the help of his friends, he investigates the legend of the Chamber of Secrets and its monstrous secrets.');
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 1999, 'English', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/a5a669963_101016.jpg',
        'Harry Potter and the Prisoner of Azkaban', '9781408855676', 462,
        'In his third year, Harry learns that an escaped prisoner, Sirius Black, is believed to be after him. With new magical creatures and revelations about his past, Harry uncovers the truth behind Sirius''s escape.');
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 2000, 'English', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/629765c8f_152119.jpg',
        'Harry Potter and the Goblet of Fire', '9781408834992', 640,
        'Harry is unexpectedly entered into the dangerous Triwizard Tournament, competing against older students. But as the tournament progresses, dark forces are at work, leading to a shocking turn of events.');
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 2003, 'English', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/bc4625241f54_86391.jpg',
        'Harry Potter and the Order of the Phoenix', '9780747591269', 901,
        'As Harry enters his fifth year, he faces resistance from the Ministry of Magic and his peers who doubt his claims about the return of Lord Voldemort. He forms "Dumbledore''s Army" to teach his friends defensive magic.');
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 2005, 'English', 'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/127d59aff684_102401.gif',
        'Harry Potter and the Half-Blood Prince', '9780439785969', 652,
        'Voldemort''s power is growing, and Harry learns about his enemy''s past through memories collected in a mysterious book. Meanwhile, he navigates teenage emotions and the challenges of preparing for the final battle.');
INSERT INTO c##library.BOOK (PUBLISHER_ID, PUBLISH_YEAR, LANGUAGE, IMAGE, TITLE, ISBN, NUMBER_OF_PAGES, DESCRIPTION)
VALUES (1, 2007, 'English',
        'https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/Harry_Potter_and_the_Deathly_Hallows_(Se-J.K_Rowling-699a7-122325.jpg',
        'Harry Potter and the Deathly Hallows', '9781408894743', 608,
        'In the final book, Harry, Ron, and Hermione go on a dangerous mission to destroy Horcruxes, Voldemort''s secret to immortality. The trio faces their most challenging obstacles and makes ultimate sacrifices.');

--WRITTEN BY
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9781408855652', '1');
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9781408855669', '1');
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9781408855676', '1');
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9781408834992', '1');
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9780747591269', '1');
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9780439785969', '1');
INSERT INTO c##library.WRITTEN_BY(ISBN, AUTHOR_ID)
VALUES ('9781408894743', '1');

--EDITION
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (1, 1997, 1, '9781408855652', 3);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (2, 1999, 2, '9781408855652', 3);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (3, 1998, 1, '9781408855669', 4);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (4, 1999, 1, '9781408855676', 1);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (5, 2000, 2, '9781408855676', 4);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (6, 2002, 3, '9781408855676', 2);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (7, 2000, 1, '9781408834992', 0);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (8, 2003, 1, '9780747591269', 9);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (9, 2005, 1, '9780439785969', 2);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (10, 2007, 1, '9781408894743', 0);
INSERT INTO c##library.EDITION (EDITION_ID, PUBLISH_YEAR, EDITION_NUM, ISBN, NUM_OF_COPIES)
VALUES (11, 2010, 2, '9781408894743', 3);

-- "USER"
INSERT INTO c##library."USER" (USER_ID, FIRST_NAME, LAST_NAME, ADDRESS, EMAIL, CONTACT_NO, GENDER, IMAGE, PASSWORD)
VALUES (1, 'Ryan', 'George', 'England', 'ryangeorge@gmail.com', '854 526 8852', 'M', null,
        '$2b$10$gpiJBsGDG5vK/xDfFWav4uSVpv1ASuBOK5PXyyT9/8YRz2S0bAavG');
-- ryanMonster300

--FAVOURITE
INSERT INTO c##library.FAVOURITE (USER_ID, ISBN)
VALUES (1, '9781408855676');
INSERT INTO c##library.FAVOURITE (USER_ID, ISBN)
VALUES (1, '9781408894743');
INSERT INTO c##library.FAVOURITE (USER_ID, ISBN)
VALUES (1, '9781408855652');

--REQUEST
INSERT INTO c##library.REQUEST (USER_ID, EDITION_ID, REQUEST_DATE)
VALUES (1, 9, SYSDATE);
INSERT INTO c##library.REQUEST (USER_ID, EDITION_ID, REQUEST_DATE)
VALUES (1, 11, SYSDATE + 3);

--GENRE
INSERT INTO c##library.GENRE (GENRE_ID, GENRE_NAME)
VALUES (1, 'Fantasy');

--BOOK_GENRE
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9781408855652', '1');
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9781408855669', '1');
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9781408855676', '1');
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9781408834992', '1');
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9780747591269', '1');
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9780439785969', '1');
INSERT INTO c##library.BOOK_GENRE(ISBN, GENRE_ID)
VALUES ('9781408894743', '1');

--REVIEW_RATING
INSERT INTO c##library.REVIEW_RATING(ISBN, USER_ID, RATING, REVIEW, EDIT_DATE)
VALUES ('9781408855652', 1, 5, 'My most favourite book ever', SYSDATE);
INSERT INTO c##library.REVIEW_RATING(ISBN, USER_ID, RATING, REVIEW, EDIT_DATE)
VALUES ('9781408894743', 1, 5, 'The End of my favourite series', SYSDATE + 1);

--JOB
INSERT INTO c##library.JOB(JOB_ID, SALARY, JOB_TITLE)
VALUES (1, 200, 'Librarian');
INSERT INTO c##library.JOB(JOB_ID, SALARY, JOB_TITLE)
VALUES (2, 150, 'Cleaner');

--EMPLOYEE
INSERT INTO c##library.EMPLOYEE(USER_ID, JOB_ID, JOIN_DATE, END_DATE)
VALUES (1, 2, SYSDATE, NULL);

--RENT_HISTORY
INSERT INTO c##library.RENT_HISTORY(RENT_HISTORY_ID, USER_ID, EDITION_ID, RENT_DATE, RETURN_DATE, STATUS)
VALUES (1, 1, 6, SYSDATE + 1, SYSDATE+8, 1);
INSERT INTO c##library.RENT_HISTORY(RENT_HISTORY_ID, USER_ID, EDITION_ID, RENT_DATE, RETURN_DATE, STATUS)
VALUES (2, 1, 7, SYSDATE + 1, SYSDATE+8, 1);
INSERT INTO c##library.RENT_HISTORY(RENT_HISTORY_ID, USER_ID, EDITION_ID, RENT_DATE, RETURN_DATE)
VALUES (3, 1, 8, SYSDATE + 3, SYSDATE+10);

--FINE_HISTORY
INSERT INTO c##library.FINE_HISTORY(RENT_HISTORY_ID, FEE_AMOUNT, START_DATE, PAYMENT_DATE)
VALUES (3, 0, SYSDATE + 11, NULL);

--NEWS
INSERT INTO c##library.NEWS(NEWS_ID, NEWS_TEXT, NEWS_DATE)
VALUES (1, 'WELCOME TO THE LIBRARY', SYSDATE);

--MESSAGE
INSERT INTO c##library.MESSAGE(MESSAGE_ID, USER_ID, MESSAGE_DATE, MESSAGE)
VALUES (1, 1, SYSDATE + 9, 'Please, return the book as soon as possible or you will be fined.');

--TODO: INSERT HOY NAI
--APPLY
--ADMIN

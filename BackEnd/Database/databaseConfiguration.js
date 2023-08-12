import dotenv from 'dotenv';
dotenv.config();

export const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectString: process.env.DATABASE_CONNECTION_STRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
};

export const secret = 'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiO3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0NDA5MDYyNywiaWF0IjoxNjQ0MDkwNjI3fQ';


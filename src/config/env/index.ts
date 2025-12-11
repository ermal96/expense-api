import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 9500,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'expense',
    },
    secret: process.env.SECRET || (() => {
        throw new Error('SECRET environment variable is required');
    })(),
};

const production: IConfig = {
    port: process.env.PORT || 9500,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || (() => {
            throw new Error('MONGODB_URI environment variable is required in production');
        })(),
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || (() => {
            throw new Error('MONGODB_DB_MAIN environment variable is required in production');
        })(),
    },
    secret: (() => {
        if (!process.env.SECRET) {
            throw new Error('SECRET environment variable is required in production');
        }
        return process.env.SECRET;
    })(),
};


const config: {
    [name: string]: IConfig;
} = {
    development,
    production,
};

export default config[NODE_ENV];

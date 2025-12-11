import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { HttpError } from '@/config/error';
import { sendHttpErrorModule } from '@/config/error/sendHttpError';
import Logger from '@/utils/Logger';

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
    // Rate limiting for authentication endpoints
    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10, // limit each IP to 10 requests per windowMs
        message: 'Too many authentication attempts, please try again later',
        standardHeaders: true,
        legacyHeaders: false,
    });

    // General API rate limiting
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        standardHeaders: true,
        legacyHeaders: false,
    });

    // Apply rate limiting
    app.use('/auth', authLimiter);
    app.use('/api', apiLimiter);

    // express middleware
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use((cookieParser as any)());
    // returns the compression middleware
    app.use((compression as any)());
    // helps you secure your Express apps by setting various HTTP headers
    app.use((helmet as any)());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use((cors as any)({
        exposedHeaders: ['Authorization'],
        optionsSuccessStatus: HttpStatus.OK,
    }));

    // custom errors
    app.use(sendHttpErrorModule);
}

interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message?: string) => void;
}

/**
 * @export
 * @param {express.Application} app
 */
export function initErrorHandler(app: express.Application): void {
    app.use((error: Error, req: express.Request, res: CustomResponse, next: express.NextFunction) => {
        if (typeof error === 'number') {
            error = new HttpError(error); // next(404)
        }

        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else {
            if (app.get('env') === 'development') {
                error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
                res.sendHttpError(error);
            } else {
                error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR);
                res.sendHttpError(error, error.message);
            }
        }

        Logger.error(error);
    });
}

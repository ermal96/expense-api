import * as express from 'express';
import * as http from 'http';
import * as jwtConfig from '@/config/middleware/jwtAuth';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import ExpenseRouter from './ExpenseRouter';

type NextFunction = express.NextFunction;
type Request = express.Request;
type Response = express.Response;

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    // Public routes
    app.use('/auth', AuthRouter);

    // Protected routes - require authentication
    app.use('/users', jwtConfig.isAuthenticated, UserRouter);
    app.use('/expenses', jwtConfig.isAuthenticated, ExpenseRouter);

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}

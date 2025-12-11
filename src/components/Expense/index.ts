import ExpenseService from './service';
import { HttpError } from '@/config/error';
import { IExpenseModel } from './model';
import { NextFunction, Request, Response } from 'express';

interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
    };
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const expenses: IExpenseModel[] = await ExpenseService.findAll(req.user.id);

        res.status(200).json(expenses);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const expense: IExpenseModel = await ExpenseService.findOne(req.params.id, req.user.id);

        res.status(200).json(expense);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const expense: IExpenseModel = await ExpenseService.insert(req.body, req.user.id);

        res.status(201).json(expense);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const expense: IExpenseModel = await ExpenseService.remove(req.params.id, req.user.id);

        res.status(200).json(expense);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

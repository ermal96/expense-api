import * as Joi from '@hapi/joi';
import ExpenseModel, { IExpenseModel } from './model';
import ExpenseValidation from './validation';
import { IExpenseService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IExpenseModelService}
 */
const ExpenseService: IExpenseService = {
    /**
     * @returns {Promise < IExpenseModel[] >}
     * @memberof ExpenseService
     */
    async findAll(userId?: string): Promise<IExpenseModel[]> {
        try {
            const query = userId ? { userId } : {};
            return await ExpenseModel.find(query).sort({ _id: -1 });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IExpenseModel >}
     * @memberof ExpenseService
     */
    async findOne(id: string, userId?: string): Promise<IExpenseModel> {
        try {
            const validate: any = ExpenseValidation.getExpense({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: any = { _id: new Types.ObjectId(id) };
            if (userId) {
                query.userId = userId;
            }

            return await ExpenseModel.findOne(query);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IExpenseModel} expense
     * @returns {Promise < IExpenseModel >}
     * @memberof ExpenseService
     */
    async insert(body: IExpenseModel, userId: string): Promise<IExpenseModel> {
        try {
            const validate: any = ExpenseValidation.createExpense(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const expense: IExpenseModel = await ExpenseModel.create({
                ...body,
                userId,
            });

            return expense;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IExpenseModel >}
     * @memberof ExpenseService
     */
    async remove(id: string, userId?: string): Promise<IExpenseModel> {
        try {
            const validate: any = ExpenseValidation.removeExpense({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const query: any = { _id: new Types.ObjectId(id) };
            if (userId) {
                query.userId = userId;
            }

            const expense: IExpenseModel = await ExpenseModel.findOneAndDelete(query);

            return expense;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ExpenseService;

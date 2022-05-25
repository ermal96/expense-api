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
    async findAll(): Promise<IExpenseModel[]> {
        try {
            return await ExpenseModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IExpenseModel >}
     * @memberof ExpenseService
     */
    async findOne(id: string): Promise<IExpenseModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string;
            }> = ExpenseValidation.getExpense({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await ExpenseModel.findOne(
                {
                    _id: Types.ObjectId(id),
                },
                {
                    password: 0,
                }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IExpenseModel} expense
     * @returns {Promise < IExpenseModel >}
     * @memberof ExpenseService
     */
    async insert(body: IExpenseModel): Promise<IExpenseModel> {
        try {
            const validate: Joi.ValidationResult<IExpenseModel> = ExpenseValidation.createExpense(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const expense: IExpenseModel = await ExpenseModel.create(body);

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
    async remove(id: string): Promise<IExpenseModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string;
            }> = ExpenseValidation.removeExpense({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const expense: IExpenseModel = await ExpenseModel.findOneAndRemove({
                _id: Types.ObjectId(id),
            });

            return expense;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ExpenseService;

import { IExpenseModel } from './model';

/**
 * @export
 * @interface IExpenseService
 */
export interface IExpenseService {
    /**
     * @returns {Promise<IExpenseModel[]>}
     * @memberof IExpenseService
     */
    findAll(userId?: string): Promise<IExpenseModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IExpenseModel>}
     * @memberof IExpenseService
     */
    findOne(code: string, userId?: string): Promise<IExpenseModel>;

    /**
     * @param {IExpenseModel} IExpenseModel
     * @param {string} userId
     * @returns {Promise<IExpenseModel>}
     * @memberof IExpenseService
     */
    insert(IExpenseModel: IExpenseModel, userId: string): Promise<IExpenseModel>;

    /**
     * @param {string} id
     * @returns {Promise<IExpenseModel>}
     * @memberof IExpenseService
     */
    remove(id: string, userId?: string): Promise<IExpenseModel>;
}

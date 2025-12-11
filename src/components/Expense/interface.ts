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
    findAll(): Promise<IExpenseModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IExpenseModel>}
     * @memberof IExpenseService
     */
    findOne(code: string): Promise<IExpenseModel>;

    /**
     * @param {IExpenseModel} IExpenseModel
     * @returns {Promise<IExpenseModel>}
     * @memberof IExpenseService
     */
    insert(IExpenseModel: IExpenseModel): Promise<IExpenseModel>;

    /**
     * @param {string} id
     * @returns {Promise<IExpenseModel>}
     * @memberof IExpenseService
     */
    remove(id: string): Promise<IExpenseModel>;
}

import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IExpenseModel } from './model';

/**
 * @export
 * @class ExpenseValidation
 * @extends Validation
 */
class ExpenseValidation extends Validation {
    /**
     * Creates an instance of ExpenseValidation.
     * @memberof ExpenseValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IExpenseModel} params
     * @returns {Joi.ValidationResult<IExpenseModel >}
     * @memberof ExpenseValidation
     */
    createExpense(params: IExpenseModel): Joi.ValidationResult<IExpenseModel> {
        let item = Joi.object().keys({
            productName: Joi.string().required(),
            quantity: Joi.number().required(),
            priceBeforeVat: Joi.number().required(),
            vatRate: Joi.number().required(),
            vatAmount: Joi.number().required(),
            priceAfterVat: Joi.number().required(),
          })

        const schema: Joi.ObjectSchema = Joi.object().keys({
            storeName: Joi.string().required(),
            city: Joi.string(),
            address: Joi.string(),
            timestamp: Joi.string().required(),
            category: Joi.string().required(),
            totalPrice: Joi.number().required(),
            items: Joi.array().items(item)
           
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ExpenseValidation
     */
    getExpense(body: {
        id: string;
    }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof ExpenseValidation
     */
    removeExpense(body: {
        id: string;
    }): Joi.ValidationResult<{
        id: string;
    }> {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }
}

export default new ExpenseValidation();

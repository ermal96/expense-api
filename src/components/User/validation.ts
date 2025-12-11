import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IUserModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IUserModel} params
     * @returns {any}
     * @memberof UserValidation
     */
    createUser(params: IUserModel): any {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {any}
     * @memberof UserValidation
     */
    getUser(body: {
        id: string;
    }): any {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }

    /**
     * @param {{ id: string }} body
     * @returns {any}
     * @memberof UserValidation
     */
    removeUser(body: {
        id: string;
    }): any {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }
}

export default new UserValidation();

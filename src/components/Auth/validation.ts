import * as Joi from '@hapi/joi';
import Validation from '@/components/validation';
import { IUserModel } from '@/components/User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
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
            password: Joi.string()
                .min(8)
                .max(128)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
                .required()
                .messages({
                    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    'string.min': 'Password must be at least 8 characters long',
                }),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }
    /**
     * @param {IUserModel} params
     * @returns {any}
     * @memberof UserValidation
     */
    getUser(params: IUserModel): any {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });

        return schema.validate(params);
    }
}

export default new AuthValidation();

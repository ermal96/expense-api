import { AuthComponent } from '@/components';
import * as jwtConfig from '@/config/middleware/jwtAuth';
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/signup', AuthComponent.signup);
router.post('/login', AuthComponent.login);
router.get('/user', jwtConfig.isAuthenticated, AuthComponent.user);

/**
 * @export {express.Router}
 */
export default router;

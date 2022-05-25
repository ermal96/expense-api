import { Router } from 'express';
import { ExpenseComponent } from '@/components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', ExpenseComponent.findAll);
router.post('/', ExpenseComponent.create);
router.get('/:id', ExpenseComponent.findOne);
router.delete('/:id', ExpenseComponent.remove);

/**
 * @export {express.Router}
 */
export default router;

import { Router } from 'express';
import { registerStudent, getStudent, listStudents } from '../controllers/student.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createStudentSchema } from '../validators/student.validator';

const router = Router();

router.post('/', validateRequest(createStudentSchema), registerStudent);
router.get('/', listStudents);
router.get('/:id', getStudent);

export default router;

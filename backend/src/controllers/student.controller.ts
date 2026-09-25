import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';
import { CreateStudentInput } from '../types/student.types';

const studentService = new StudentService();

export const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = req.body as CreateStudentInput;
    const student = await studentService.createStudent(input);

    res.status(201).json({
      success: true,
      message: 'Student registration successful.',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };

    const student = await studentService.getStudentById(id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

export const listStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100); // Cap at 100

    const result = await studentService.listStudents(page, limit);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

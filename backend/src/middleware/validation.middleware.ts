import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        const zodErr = error as any;
        zodErr.errors.forEach((err: any) => {
          if (err.path.length > 1) {
            errors[err.path[1]] = err.message;
          } else {
            errors[err.path[0]] = err.message;
          }
        });

        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
        return;
      }
      next(error);
    }
  };
};

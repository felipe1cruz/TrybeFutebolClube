import { Request, Response, NextFunction } from 'express';
import ValidationError from '../errors/ValidationError';

const handleErrors = (err: ValidationError, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err;
  if (status) return res.status(status).json({ message });

  return res.status(500).json({ message });
};

export default handleErrors;

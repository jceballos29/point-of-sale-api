import { NextFunction, Request, Response } from 'express';

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { session } = res.locals;
  if (session) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authentication;
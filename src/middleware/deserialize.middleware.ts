import { NextFunction, Request, Response } from 'express';
import { logger, verifyToken } from '../utils'


export const deserialize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return next();
    const user = await verifyToken(token);
    res.locals.user = user
    return next();
  } catch (error: any) {
    logger.error(error);
    return res.status(500)
    .json({
      success: false,
      message: error.message
    })
  }
}

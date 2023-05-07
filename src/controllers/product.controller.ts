import { Request, Response } from 'express';
import {
  find,
  findOne,
  create,
  update,
  remove,
} from '../services/product.service';
import {
  GetProductInput,
  CreateProductInput,
  UpdateProductInput,
  DeleteProductInput,
} from '../schemas/product.schema'
import { logger } from '../utils';

export const handlerFind = async (_req: Request, res: Response) => {
  try {
    const products = await find({});
    // return res.status(200).json({
    //   success: true,
    //   data: products,
    //   message: 'Products found successfully',
    // });
    return res.status(200).json(products)
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlerFindById = async (
  req: Request<GetProductInput['params']>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await findOne({
      _id: id,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      date: product,
      message: 'Product found successfully',
    });
  }
  catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const handlerCreate = async (
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response,
) => {
  try {
    const product = await create(req.body);
    return res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlerUpdate = async (
  req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await update(
      {
        _id: id,
      },
      req.body,
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlerDelete = async (
  req: Request<DeleteProductInput['params']>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await remove({
      _id: id,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product removed successfully',
    });
  }
  catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
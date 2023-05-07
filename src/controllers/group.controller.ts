import { Request, Response } from 'express';
import {
	find,
	findOne,
	create,
	update,
	remove,
} from '../services/group.service';
import {
	GetGroupInput,
	CreateGroupInput,
	UpdateGroupInput,
	DeleteGroupInput,
} from '../schemas/group.schema';
import { logger } from '../utils';


export const handlerFind = async (_req: Request, res: Response) => {
  try {
    const groups = await find({});
    return res.status(200).json({
      success: true,
      data: groups,
      message: 'Groups found successfully',
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlerFindById = async (
  req: Request<GetGroupInput['params']>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const group = await findOne({
      _id: id,
    });
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      })
    }
    return res.status(200).json({
      success: true,
      date: group,
      message: 'Group found successfully'
    })
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const handlerCreate = async (
  req: Request<{}, {}, CreateGroupInput['body']>,
  res: Response,
) => {
  try {
    const group = await create(req.body);
    return res.status(201).json({
      success: true,
      data: group,
      message: 'Group created successfully'
    })
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

export const handlerUpdate = async (
  req: Request<UpdateGroupInput['params'], {}, UpdateGroupInput['body']>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const group = await update({
      _id: id
    }, req.body);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      })
    }
    return res.status(200).json({
      success: true,
      data: group,
      message: 'Group updated successfully'
    })
  }
  catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const handlerDelete = async (
  req: Request<DeleteGroupInput['params']>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const group = await remove({
      _id: id
    });
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      })
    }
    return res.status(200).json({
      success: true,
      data: group,
      message: 'Group deleted successfully'
    })
  }
  catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
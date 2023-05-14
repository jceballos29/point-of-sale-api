import { FilterQuery, QueryOptions } from 'mongoose';
import DeviceModel, { Device, DeviceDocument } from '../models/device.model';

export const find = async (
  query: FilterQuery<DeviceDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await DeviceModel.find(query, null, options);
}

export const findOne = async (
  query: FilterQuery<DeviceDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await DeviceModel.findOne(query, null, options);
}

export const create = async (device: Device) => {
  return DeviceModel.create(device);
}

export const update = async (
  query: FilterQuery<DeviceDocument>,
  update: Partial<DeviceDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await DeviceModel.updateOne(query, update, options);
}

export const remove = async (
  query: FilterQuery<DeviceDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await DeviceModel.deleteOne(query, options);
}
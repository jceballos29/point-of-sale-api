import { FilterQuery, QueryOptions } from 'mongoose';
import DeviceModel, { DeviceDocument } from '../models/device.model';

export const find = async (
  query: FilterQuery<DeviceDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await DeviceModel.find(query, null, options);
}

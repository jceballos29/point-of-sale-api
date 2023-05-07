import { FilterQuery, QueryOptions } from 'mongoose';
import GroupModel, { Group, GroupDocument } from '../models/groups.model';

export const find = async (
  query: FilterQuery<GroupDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await GroupModel.find(query, {}, options);
}

export const findOne = async (
  query: FilterQuery<GroupDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await GroupModel.findOne(query, {}, options);
}

export const create = async (group: Group) => {
  return GroupModel.create(group);
}

export const update = async (
  query: FilterQuery<GroupDocument>,
  update: Partial<GroupDocument>,
  options: QueryOptions = { lean: true, new: true },
) => {
  return await GroupModel.findByIdAndUpdate(query, update, options);
}

export const remove = async (
  query: FilterQuery<GroupDocument>,
  options: QueryOptions = { lean: true },
) => {
  return await GroupModel.findByIdAndDelete(query, options);
}
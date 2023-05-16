import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export const findOne = async (
	query: FilterQuery<UserDocument>,
	options: QueryOptions = { lean: true },
) => {
	return await UserModel.findOne(query, {}, options);
};

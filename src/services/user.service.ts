import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel, { User, UserDocument } from '../models/user.model';

export const find = async (
	query: FilterQuery<UserDocument>,
	options: QueryOptions = { lean: true },
) => {
	return await UserModel.find(query, {}, options);
};

export const findOne = async (
	query: FilterQuery<UserDocument>,
	options: QueryOptions = { lean: true },
) => {
	return await UserModel.findOne(query, {}, options);
};

export const create = async (user: User) => {
	return UserModel.create(user);
};

export const update = async (
	query: FilterQuery<UserDocument>,
	update: Partial<UserDocument>,
	options: QueryOptions = { lean: true, new: true },
) => {
	return await UserModel.findOneAndUpdate(query, update, options);
};

export const remove = async (
	query: FilterQuery<UserDocument>,
	options: QueryOptions = { lean: true },
) => {
	return await UserModel.findByIdAndDelete(query, options);
};

export const validatePassword = async (
	username: string,
	password: string,
) => {
	const user = await UserModel.findOne({ username });

	if (!user) return false;

	const isValid = await user.checkPassword(password);

	if (!isValid) return false;

	return user;
};

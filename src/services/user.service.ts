/** @format */

import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel, { User, UserDocument } from '../models/user.model';

export const addUser = async (user: User) => {
	return await UserModel.create(user);
};

export const getUserByUsername = async (username: string) => {
	return await UserModel.findOne({ username });
};

export const findUser = async (
	query: FilterQuery<UserDocument>,
	options: QueryOptions = { lean: true },
) => {
	return await UserModel.findOne(query, {}, options);
};

export const findUsers = async (
	query: FilterQuery<UserDocument>,
	options: QueryOptions = { lean: true },
) => {
	return await UserModel.find(query, {}, options);
};

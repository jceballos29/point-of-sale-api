/** @format */

import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config';

export interface User {
	name: string;
	username: string;
	password: string;
	role: string;
}

export interface UserDocument extends User, Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

UserSchema.pre<UserDocument>('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(config.salt);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	next();
});

UserSchema.methods.comparePassword = async function (
	password: string,
) {
	const user = this as UserDocument;
	return await bcrypt.compare(password, user.password);
};

const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;

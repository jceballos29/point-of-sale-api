import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { DeviceDocument } from './device.model';

export interface User {
	name: string;
	username: string;
	password: string;
	email: string;
	role: string;
	devices: DeviceDocument['_id'][]
}

export interface UserDocument extends User, Document {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	checkPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			maxlength: 20,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			maxlength: 20,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		devices: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Device',
			}
		]
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.pre('save', async function (next) {
	const user = this as unknown as UserDocument;
	if (!user.isModified('password')) return next();
	user.password = await bcrypt.hash(user.password, 10);
	return next();
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;

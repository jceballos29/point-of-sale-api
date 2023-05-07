import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { GroupDocument } from './groups.model';

export interface User {
	name: string;
	username: string;
	password: string;
	email: string;
	groups: GroupDocument['_id'][];
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
			select: false
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		groups: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Group',
				required: true,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.pre('save', async function (next) {
	const user = this as UserDocument;
	if (!user.isModified('password')) return next();
	user.password = await bcrypt.hash(user.password, 10);
	return next();
});

userSchema.methods.checkPassword = async function (password: string) {
	const user = this as UserDocument;
	const result = await bcrypt.compare(password, user.password);
	return result;
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;

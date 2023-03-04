/** @format */

import { Document, model, Schema } from 'mongoose';
import { UserDocument } from './user.model';

interface Terminal {
	code: string;
	base: number;
}

export interface Warehouse {
	name: string;
	allowedUsers: Array<UserDocument['_id']>;
	terminals: Array<Terminal>;
}

export interface WarehouseDocument extends Warehouse, Document {
	createdAt: Date;
	updatedAt: Date;
}

const WarehouseSchema = new Schema<WarehouseDocument>(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
		},
		allowedUsers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		terminals: [
			{
				code: { type: String },
				base: { type: Number },
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const WarehouseModel = model<WarehouseDocument>('Warehouse', WarehouseSchema);

export default WarehouseModel;

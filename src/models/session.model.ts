/** @format */

import { Document, model, Schema } from 'mongoose';
import { UserDocument } from './user.model';
import { WarehouseDocument } from './warehouse.model';


export interface Session {
	user: UserDocument['_id'];
  warehouse: WarehouseDocument['_id'];
	valid: boolean;
	userAgent: string;
}

export interface SessionDocument extends Session, Document {
	createdAt: Date;
	updatedAt: Date;
}

const SessionSchema = new Schema<SessionDocument>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
		valid: {
			type: Boolean,
			default: true,
		},
		userAgent: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default model<SessionDocument>('Session', SessionSchema);

import { Schema, model, Document } from 'mongoose';

export interface Group {
	name: string;
}

export interface GroupDocument extends Group, Document {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

const groupSchema = new Schema<GroupDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const GroupModel = model<GroupDocument>('Group', groupSchema);

export default GroupModel;

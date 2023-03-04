/** @format */

import { Document, model, Schema } from 'mongoose';

export interface Client {
	name: string;
	type: 'retail' | 'wholesale';
}

export interface ClientDocument extends Client, Document {
	createdAt: Date;
	updatedAt: Date;
}

const ClientSchema = new Schema<ClientDocument>(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ['retail', 'wholesale'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const ClientModel = model<ClientDocument>('Client', ClientSchema);

export default ClientModel;

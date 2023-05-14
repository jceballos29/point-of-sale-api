import { Schema, model, Document } from 'mongoose';

export interface Party {
  name: string;
}

export interface PartyDocument extends Party, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const partySchema = new Schema<PartyDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PartyModel = model<PartyDocument>(
  'Party',
  partySchema,
);

export default PartyModel;

import { Schema, model, Document } from 'mongoose';

export interface Device {
  name: string;
}

export interface DeviceDocument extends Device, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new Schema<DeviceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const DeviceModel = model<DeviceDocument>(
  'Device',
  deviceSchema,
);

export default DeviceModel;
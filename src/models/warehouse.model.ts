import { Schema, model, Document } from 'mongoose';

export interface Warehouse {
  name: string;
}

export interface WarehouseDocument extends Warehouse, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const warehouseSchema = new Schema<WarehouseDocument>(
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

const WarehouseModel = model<WarehouseDocument>(
  'Warehouse',
  warehouseSchema,
);

export default WarehouseModel;
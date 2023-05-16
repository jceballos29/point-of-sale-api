
import { Schema, model, Document } from 'mongoose';
import { ProductDocument } from './product.model';

export interface Item {
  product: ProductDocument['_id'] | Schema.Types.ObjectId;
  quantity: number;
  price: number;
  discount: number;
}

export interface ItemDocument extends Item, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<ItemDocument>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ItemModel = model<ItemDocument>('Item', itemSchema);

export default ItemModel;

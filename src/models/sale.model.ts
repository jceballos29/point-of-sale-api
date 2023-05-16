import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user.model';
import { DeviceDocument } from './device.model';
import { PartyDocument } from './party.model';
import { ItemDocument } from './item.model';

export interface Sale {
  number: number
  user: UserDocument['_id'] | Schema.Types.ObjectId;
  device: DeviceDocument['_id'] | Schema.Types.ObjectId;
  party: PartyDocument['_id'] | Schema.Types.ObjectId;
  date: Date;
  status: string;
  paymentMethod:  string; 
  items: ItemDocument['_id'][];
  total: number;
}

export interface SaleDocument extends Sale, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const saleSchema = new Schema<SaleDocument>(
  {
    number: {
      type: Number,
      default: 0
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    device: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    party: {
      type: Schema.Types.ObjectId,
      ref: 'Party',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now()
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'transfer'],
      default: 'cash',
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      }
    ],
    total: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

saleSchema.pre('save', async function (next) {
  const sale = this;
  const lastSale = await SaleModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
  if (lastSale) {
    sale.number = lastSale.number + 1;
  } else {
    sale.number = 1;
  }
  next();
})

const SaleModel = model<SaleDocument>('Sale', saleSchema);

export default SaleModel;
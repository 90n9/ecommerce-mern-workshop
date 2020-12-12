import mongoose from 'mongoose';

interface OrderAttrs {
  products_price: number;
  tax_price: number;
  total_price: number;
  shipping_name: string;
  shipping_mobile: string;
  shipping_address: string;
  products:{
    _id: string,
    price: number,
    qty: number
  }[];
}

interface OrderDoc extends mongoose.Document {
  products_price: number;
  tax_price: number;
  total_price: number;
  shipping_name: string;
  shipping_mobile: string;
  shipping_address: string;
  products:{
    _id: string,
    price: number,
    qty: number
  }[];
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

const orderSchema = new mongoose.Schema({
  products_price: {
    type: Number,
    required: true
  },
  tax_price: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  shipping_name: {
    type: String,
    required: true
  },
  shipping_mobile: {
    type: String,
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  products: [orderProductSchema],
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

// orderSchema.set('versionKey', 'version');

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};
const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
export { Order };

import mongoose from 'mongoose';

interface OrderAttrs {
  title: string;
  price: number;
  image: string;
}

interface OrderDoc extends mongoose.Document {
  title: string;
  price: number;
  image: string;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
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

// orderSchema.set('versionKey', 'version');

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};
const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
export { Order };

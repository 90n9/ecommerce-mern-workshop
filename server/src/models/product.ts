import mongoose from 'mongoose';

interface ProductAttrs {
  title: string;
  price: number;
  image: string;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  image: string;
  version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema({
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

// productSchema.set('versionKey', 'version');

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};
const Product = mongoose.model<ProductDoc, ProductModel>("Product", productSchema);
export { Product, ProductDoc };

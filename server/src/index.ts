import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  //check environment variable to verified that "MONGO_URI" is declared
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined!');
  }

  try {
    //connect to MONGO
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.log(err);
  }

  //listen request to port 8000
  app.listen(8000, () => {
    console.log('Listening on port 8000!');
  });
};

start();
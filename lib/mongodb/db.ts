import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI!);

    console.log(`Habits database connected successfully!`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '..', '.env');

// Read .env file manually and parse
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('.env file content preview:', envContent.substring(0, 100));
  
  // Parse manually
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
      console.log(`Set ${key.trim()} =`, value.substring(0, 20) + '...');
    }
  });
} else {
  console.error('.env file not found at:', envPath);
}

console.log('MONGODB_URI after manual parse:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');

const MONGODB_URI = process.env.MONGODB_URI;
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

let retryCount = 0;

const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
    retryCount = 0;
    return true;
  } catch (error) {
    retryCount++;
    console.error(`❌ MongoDB connection failed (Attempt ${retryCount}/${MAX_RETRIES}):`, error.message);

    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return connectDB();
    } else {
      console.error('❌ Max retries reached. Could not connect to MongoDB.');
      process.exit(1);
    }
  }
};

export default connectDB;

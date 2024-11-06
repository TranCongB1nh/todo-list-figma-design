const mongoose = require('mongoose');
require('dotenv').config(); // Đọc các biến môi trường từ file .env

// URI cho MongoDB, lấy từ biến môi trường
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo_app';

// Hàm kết nối MongoDB qua Mongoose
async function connectWithMongoose() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully using Mongoose');
  } catch (error) {
    console.error('MongoDB connection error with Mongoose:', error);

    // Xử lý retry nếu cần, hoặc ghi log để dễ dàng phát hiện vấn đề khi kết nối thất bại
    // Có thể thêm logic retry với giới hạn số lần thử
    process.exit(1); // Tắt ứng dụng khi không thể kết nối
  }
}

// Xuất cả hai hàm để có thể sử dụng khi cần
module.exports = {
  connectWithMongoose
};
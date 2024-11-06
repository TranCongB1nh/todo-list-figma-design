const mongoose = require('mongoose');

// Định nghĩa schema User
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Đảm bảo không trùng lặp email
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// Tạo mô hình User
const User = mongoose.model('User', UserSchema);

module.exports = User;

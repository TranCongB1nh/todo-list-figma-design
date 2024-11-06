require("dotenv").config();
const { MongoClient } = require("mongodb");
const { httpStatusCodes } = require("../../utils/constant");
const { createBearerToken, getDataFromRequest } = require("../../utils/helper");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function handleSignIn(request, response) {
  try {
    const requestData = await getDataFromRequest(request);
    const { email, password, rememberMe } = requestData;

    const user = await User.findOne({ email });
    if (user) {
      // So sánh mật khẩu băm với mật khẩu người dùng nhập
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        response.writeHead(httpStatusCodes.UNAUTHORIZED, {
          "Content-Type": "application/json",
        });
        response.end(JSON.stringify({ error: "Invalid email or password" }));
        return;
      }

      // Token expiration based on 'rememberMe'
      const tokenOptions = rememberMe
        ? { expiresIn: "7d" }
        : { expiresIn: "1h" }; // 1 week vs 1 hour
      const userToken = jwt.sign({ userId: user._id }, secretKey, tokenOptions);

      response.writeHead(httpStatusCodes.OK, {
        "Content-Type": "application/json",
      });
      response.end(
        JSON.stringify({ token: userToken, 
          username: user.username,  // Trả về username
          message: "Login successful" 
        })
      );
    } else {
      response.writeHead(httpStatusCodes.UNAUTHORIZED, {
        "Content-Type": "application/json",
      });
      response.end(JSON.stringify({ error: "Invalid email or password" }));
    }
  } catch (error) {
    console.error("Error during sign-in process:", error);
    response.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ error: "Internal server error" }));
  }
}

async function handleSignUp(request, response) {
  try {
    const requestData = await getDataFromRequest(request);
    const { username, email, password } = requestData;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !email || !password) {
      response.statusCode = httpStatusCodes.BAD_REQUEST;
      response.end(
        JSON.stringify({
          message: "Username, email, and password are required",
        })
      );
      return;
    }

    // Kiểm tra xem email đã được đăng ký chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      response.statusCode = httpStatusCodes.CONFLICT;
      response.end(JSON.stringify({ message: "Email already exists" }));
      return;
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng mới với mật khẩu đã băm
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Lưu mật khẩu đã băm vào cơ sở dữ liệu
    });

    // Lưu người dùng vào database
    await newUser.save();

    // Tạo token và phản hồi
    const userToken = createBearerToken(newUser._id);
    response.writeHead(httpStatusCodes.CREATED, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify({ token: userToken, message: "User created successfully" })
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
    response.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = {
  handleSignIn,
  handleSignUp,
};

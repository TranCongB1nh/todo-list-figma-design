const createServer = require("http").createServer // dùng module http Node.js để tạo máy chủ HTTP
const cors = require("cors")// module cors hỗ trợ Cross-Origin Resource Sharing
const router = require("./router/index")
const hostname = "127.0.0.1"
const port = 5000
const express = require("express")
const { connectWithMongoClient, connectWithMongoose } = require("./mongodb")
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true
}));

connectWithMongoose()

const server = createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin','*') // cho phép mọi nguồn gốc truy cập vào tài nguyên máy chủ
    response.setHeader( // xác định phương thức HTTP được phép sử dụng
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    )
    response.setHeader( // xác định các header mà máy client có thể gủi trong request
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    )

    if(request.method === 'OPTIONS') { // nếu phương thức của yêu cầu là OPTIONS, máy chủ sẽ phản hồi với mã 204.
        response.writeHead(204)        //Cần thiết để xử lý các yêu cầu preflight
        response.end()
        return 
    }
    router.run(request, response) // gọi router để xử lý các yêu cầu HTTP khác (GET, POST, PUT,...)
})

server.listen(port, hostname, () => { // lắng nghe yêu cầu từ client
    console.log(`Server running at http://${hostname}:${port}`)
})
const url = require("url");
const { httpMethods } = require('../utils/constant')

function getMethod (request, response, path, callback) {
  if (path === url.parse(request.url, true).pathname && request.method === httpMethods.GET) {//kiểm tra đường dẫn URL có trùng khớp 
    callback(request, response);            //với path đã được chỉ định và kiểm tra phương thức HTTP của yêu cầu có phải GET hay không
  }
};

function postMethod (request, response, path, callback) { // gần giống getMethod
  if (path === request.url && request.method === httpMethods.POST) {
    callback(request, response);
  }
};

function deleteMethod (request, response, path, callback) { // gần giống getMethod
  if (request.method === httpMethods.DELETE) {
    callback(request, response);
  }
};

function putMethod (request, response, path, callback) { // gần giống getMethod
  if (path === url.parse(request.url, true).pathname && request.method === httpMethods.PUT) {
    callback(request, response);
  }
};

const routerMethods = { //gom phương thức lại để dễ gọi
  get: getMethod,
  post: postMethod,
  delete: deleteMethod,
  put: putMethod,
};

module.exports = routerMethods;

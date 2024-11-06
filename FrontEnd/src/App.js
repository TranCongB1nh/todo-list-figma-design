import React, { useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Todo from "./Pages/Todo";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localUser = localStorage.getItem("currentUser");
    const sessionUser = sessionStorage.getItem("currentUser");

    // Nếu không có người dùng đăng nhập, điều hướng đến trang Login
    if (!localUser && !sessionUser) {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login", { replace: true });
      }
    } else {
      // Nếu người dùng đã đăng nhập và đang ở trang login, điều hướng đến trang Todo
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/todo", { replace: true });
      }
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;

// import { ADD_TODO, EDIT_TODO, FILTER_TODO, REMOVE_TODO, TOGGLE_TODO, SET_TASKS } from "../TaskActionTypes";
// import axios from 'axios';
// import { getToken } from '../../utils/auth'; // Ensure this path is correct

// // Add new task
// export const addTodo = (text) => {
//   return async (dispatch) => {
//     try {
//       const token = getToken();
//       const response = await axios.post('http://127.0.0.1:5000/tasks/add-task', { text }, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Sửa lỗi cú pháp
//         },
//       });

//       dispatch({
//         type: ADD_TODO,
//         payload: { id: response.data.id, text: response.data.text, completed: false },
//       });
//     } catch (error) {
//       console.error("Failed to add todo:", error);
//     }
//   };
// };

// // Remove task
// export const removeTodo = (id) => {
//   return async (dispatch) => {
//     try {
//       const token = getToken();
//       await axios.delete(`http://127.0.0.1:5000/tasks/delete-task/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch({
//         type: REMOVE_TODO,
//         payload: { id },
//       });
//     } catch (error) {
//       console.error("Failed to remove todo:", error);
//     }
//   };
// };

// // Edit task
// export const editTodo = (id, newText) => {
//   return async (dispatch) => {
//     try {
//       const token = getToken();
//       await axios.put(`http://127.0.0.1:5000/tasks/update-task/${id}`, { text: newText }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch({
//         type: EDIT_TODO,
//         payload: { id, newText },
//       });
//     } catch (error) {
//       console.error("Failed to edit todo:", error);
//     }
//   };
// };

// // Toggle task completion (if needed)
// export const toggleTodo = (id) => {
//   return async (dispatch) => {
//     try {
//       const token = getToken();
//       await axios.patch(`http://127.0.0.1:5000/tasks/todos/${id}/toggle`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch({
//         type: TOGGLE_TODO,
//         payload: { id },
//       });
//     } catch (error) {
//       console.error("Failed to toggle todo:", error);
//     }
//   };
// };

// // Filter todo
// export const filterTodo = (filter) => ({
//   type: FILTER_TODO,
//   payload: { filter },
// });

// export const setTasks = (todos) => ({
// 	type: SET_TASKS,
// 	payload: { todos },
//   });
import { TaskActionTypes } from "../TaskActionTypes";
import axios from "axios";
import { getToken } from "../../utils/auth";

// API Base URL
const API_BASE_URL = "http://127.0.0.1:5000";

export const addTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_TASK_REQUEST" });

    const token = getToken(); // Lấy token JWT từ localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token vào header
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:5000/tasks/add-task",
      taskData,
      config
    );

    dispatch({ type: "ADD_TASK_SUCCESS", payload: data.task });
  } catch (error) {
    dispatch({
      type: "ADD_TASK_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_TASKS_REQUEST" });

    const token = getToken(); // Lấy token từ localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token vào header
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:5000/tasks/get-tasks",
      config
    );

    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "FETCH_TASKS_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Task
export const updateTask = (taskId, taskData) => async (dispatch) => {
  dispatch({ type: TaskActionTypes.UPDATE_TASK_REQUEST });

  try {
    const token = getToken(); // Lấy token từ localStorage
    const { data } = await axios.put(
      "http://127.0.0.1:5000/tasks/update-task",
      { _id: taskId, ...taskData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: TaskActionTypes.UPDATE_TASK_SUCCESS,
      payload: { _id: taskId, taskData: data.task }
    });
  } catch (error) {
    dispatch({
      type: TaskActionTypes.UPDATE_TASK_FAILURE,
      payload: error.message,
    });
  }
};

// Delete Task
export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: TaskActionTypes.DELETE_TASK_REQUEST });

  try {
    const token = getToken();
    const response = await axios.delete(
      `http://127.0.0.1:5000/tasks/delete-task/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        }
      }
    );

    dispatch({
      type: TaskActionTypes.DELETE_TASK_SUCCESS,
      payload: taskId
    });
  } catch (error) {
    dispatch({
      type: TaskActionTypes.DELETE_TASK_FAILURE,
      payload: error.message,
    });
  }
};

export const toggleTaskCompletion = (taskId, completed) => async (dispatch) => {
  dispatch({ type: TaskActionTypes.TOGGLE_TASK_COMPLETION_REQUEST });
  
  try {
    const token = getToken();
    const response = await axios.put(
      `http://127.0.0.1:5000/tasks/update-task`,
      { _id: taskId, completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    dispatch({
      type: TaskActionTypes.TOGGLE_TASK_COMPLETION_SUCCESS,
      payload: { taskId, completed },
    });
  } catch (error) {
    dispatch({
      type: TaskActionTypes.TOGGLE_TASK_COMPLETION_FAILURE,
      payload: error.message,
    });
  }
};

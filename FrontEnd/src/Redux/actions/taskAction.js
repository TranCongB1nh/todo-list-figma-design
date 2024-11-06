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

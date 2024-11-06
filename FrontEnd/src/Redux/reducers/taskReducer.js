import { TaskActionTypes } from "../TaskActionTypes";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "ALL",
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case TaskActionTypes.FETCH_TASKS_REQUEST:
    case TaskActionTypes.ADD_TASK_REQUEST:
    case TaskActionTypes.UPDATE_TASK_REQUEST:
    case TaskActionTypes.DELETE_TASK_REQUEST:
      return { ...state, loading: true, error: null };

    case TaskActionTypes.FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };

    case TaskActionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };

    case TaskActionTypes.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload.taskData } : task
        ),
      };

    case TaskActionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
      

    case TaskActionTypes.TOGGLE_TASK_COMPLETION_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload.taskId
            ? { ...task, completed: action.payload.completed }
            : task
        ),
      };
    case TaskActionTypes.TOGGLE_TASK_COMPLETION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case TaskActionTypes.FETCH_TASKS_FAILURE:
    case TaskActionTypes.ADD_TASK_FAILURE:
    case TaskActionTypes.UPDATE_TASK_FAILURE:
    case TaskActionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case TaskActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

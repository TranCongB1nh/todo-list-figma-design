// import {
//   ADD_TODO,
//   FILTER_TODO,
//   MARK_COMPLETED,
//   MARK_INCOMPLETE,
//   REMOVE_TODO,
//   TOGGLE_TODO,
//   EDIT_TODO,
//   SET_TASKS,
// } from "../TaskActionTypes";

// const initialState = {
//   todos: [],
//   filter: "ALL",
// };

// export default function taskReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_TASKS: // Add this action type
//       return {
//         ...state,
//         todos: action.payload.todos,
//       };
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           {
//             id: action.payload.id,
//             text: action.payload.text,
//             completed: false,
//           }, // Sử dụng id từ server
//         ],
//       };
//     case REMOVE_TODO:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.payload.id),
//       };
//     case TOGGLE_TODO:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         ),
//       };
//     case MARK_COMPLETED:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id ? { ...todo, completed: true } : todo
//         ),
//       };
//     case MARK_INCOMPLETE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id ? { ...todo, completed: false } : todo
//         ),
//       };
//     case FILTER_TODO:
//       return {
//         ...state,
//         filter: action.payload.filter,
//       };
//     case EDIT_TODO:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, text: action.payload.newText }
//             : todo
//         ),
//       };
//     default:
//       return state;
//   }
// }

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
        tasks: state.tasks.filter((task) => task._id !== action.payload),
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

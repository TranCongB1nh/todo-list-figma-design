import { List } from "@chakra-ui/react";
import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import { useSelector } from "react-redux";

const TaskList = () => {
  const tasks = useSelector((state) => state.task.tasks); // Truy cập tasks từ Redux store
  const filter = useSelector((state) => state.task.filter);

  const filteredList = tasks.filter((task) => {
    if (filter === "DONE") {
      return task.completed;
    } else if (filter === "UNDONE") {
      return !task.completed;
    } else {
      return true;
    }
  });

  console.log("FilteredList: ", filteredList);
  return (
    <List
      w="100%"
      maxHeight="500px"
      overflowY="auto"
      gap="20px"
      display="flex"
      flexDirection="column"
    >
      {filteredList.map((todo) => (
        <TaskItem key={todo._id} todo={todo} />
      ))}
    </List>
  );
};

export default TaskList;

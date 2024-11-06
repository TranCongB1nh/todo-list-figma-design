import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Center, Divider, VStack } from "@chakra-ui/react";
import AddTask from "../Components/AddTask/AddTask";
import Filter from "../Components/Filter/Filter";
import Header from "../Components/Header/Header";
import TaskList from "../Components/TaskList/TaskList";
import { fetchTasks } from "../Redux/actions/taskAction";

const Todo = () => {
  // const loading =useSelector((state) => state.task.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch fetchTasks khi component được mount
  }, [dispatch]);
  return (
    <>
      <Box
        m="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        backgroundColor={"#319795"}
      >
        <Center
          w={"960px"}
          h={"600px"}
          backgroundColor="white"
          borderRadius="24px"
          padding="40px 60px"
        >
          <VStack w="100%" gap="20px" h="100%">
            <Header />
            <AddTask />
            <Divider />
            <Filter />
            <TaskList />
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default Todo;

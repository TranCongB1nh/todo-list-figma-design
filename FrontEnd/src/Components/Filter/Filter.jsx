import { HStack, RadioGroup, Radio, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
	const currentFilter = useSelector((state) => state.task.filter);

	function handleFilter(filter) {
		dispatch({ type: 'SET_FILTER', payload: filter });
	}

  return (
    <HStack spacing={4} mb={4} justifyContent={"center"} marginTop={"20px"}>
      <Text>Filter:</Text>
      <RadioGroup value={currentFilter} onChange={(value) => handleFilter(value)}>
        <HStack spacing={4}>
          <Radio value="ALL">All</Radio>
          <Radio value="UNDONE">Undone</Radio>
          <Radio value="DONE">Done</Radio>
        </HStack>
      </RadioGroup>
    </HStack>
  );
};

export default Filter;

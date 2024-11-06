import { Button, Card, Checkbox, HStack, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask, toggleTaskCompletion } from '../../Redux/actions/taskAction';

const TaskItem = ({ todo }) => {
  const [taskName, setTaskName] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isChecked, setIsChecked] = useState(todo.completed);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsChecked(todo.completed);
  }, [todo.completed]);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked); // Optimistic UI update
    dispatch(toggleTaskCompletion(todo._id, !todo.completed));
  };

  const handleDeleteClick = () => {
    setIsLoadingDelete(true);
    dispatch(deleteTask(todo._id)); // Dispatch action deleteTask
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsLoadingEdit(true);
    dispatch(updateTask(todo._id, { text: taskName })); // Dispatch action updateTask với giá trị task đã chỉnh sửa
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Card
      display='flex'
      direction='row'
      className='task__container'
      w='100%'
      justify='space-between'
      p='24px'
      borderRadius='12px'
      height='72px'
      backgroundColor='#F9FAFB'
      border={isEditing ? '1px solid teal' : 'none'}
    >
      <HStack className='task__left-container'>
        <Checkbox
          colorScheme='teal'
          isChecked={isChecked}
          onChange={handleCheckboxToggle}
          className='task__checkbox'
        />
        {isEditing ? (
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        ) : (
          <Text
            color={isChecked ? '#9CA3AF' : 'black'}
            as={isChecked ? 'del' : 'p'}
            fontSize='16px'
          >
            {taskName}
          </Text>
        )}
      </HStack>
      {isEditing ? (
        <HStack className='task__right-container' h='32px' gap='8px'>
          <Button
            h='32px'
            p='12px'
            colorScheme='teal'
            variant='outline'
            className='task__edit-button'
            isLoading={isLoadingEdit}
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            h='32px'
            p='12px'
            colorScheme='red'
            variant='outline'
            className='task__delete-button'
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </HStack>
      ) : (
        <HStack className='task__right-container' h='32px' gap='8px'>
          <Button
            h='32px'
            p='12px'
            colorScheme={isChecked ? 'gray' : 'teal'}
            variant='outline'
            className='task__edit-button'
            color={isChecked ? '#9CA3AF' : '#319795'}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            h='32px'
            p='12px'
            colorScheme='red'
            variant='outline'
            className='task__delete-button'
            isLoading={isLoadingDelete}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </HStack>
      )}
    </Card>
  );
};

export default TaskItem;

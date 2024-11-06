import { Button, HStack, Input } from '@chakra-ui/react';
import { CgAddR } from 'react-icons/cg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../Redux/actions/taskAction';
const AddTask = () => {
	const isLoading = useSelector((state) => state.task.loading);
	const dispatch = useDispatch();
	const [taskName, setTaskName] = useState('');

	function handleAddTask() {
		if (taskName.trim() !== '') {
			dispatch(addTask({ text: taskName.trim() }));
			setTaskName('');
		}
	}

	function handleClear() {
		setTaskName('');
	}

	return (
		<HStack
			className='add-new-task__container'
			justify='space-between'
			w='100%'
		>
			<HStack
				className='add-new-task__left-section'
				justify='center'
				align='center'
			>
				<CgAddR className='add-new-task__icon' />
				<Input
					variant='unstyled'
					placeholder='Add new task...'
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					className='add-new-task__input'
				/>
			</HStack>
			{taskName.trim() === '' ? (
				<HStack className='add-new-task__right-section'>
					<Button
						colorScheme='teal'
						className='add-new-task__button'
						onClick={handleAddTask}
					>
						Add new
					</Button>
				</HStack>
			) : (
				<HStack className='add-new-task__right-section'>
					<Button
						colorScheme='teal'
						className='add-new-task__button'
						onClick={handleAddTask}
						isLoading={isLoading}
					>
						Add new
					</Button>
					<Button
						colorScheme='red'
						onClick={handleClear}
					>
						Cancel
					</Button>
				</HStack>
			)}
		</HStack>
	);
};

export default AddTask;
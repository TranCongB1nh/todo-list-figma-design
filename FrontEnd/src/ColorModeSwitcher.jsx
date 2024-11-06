import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props) => {
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	return (
		<IconButton
			size='xs'
			rounded='full'
			aria-label={`Switch to ${text} mode`}
			position='fixed'
			bottom={3}
			left={3}
			onClick={toggleColorMode}
			icon={<SwitchIcon />}
			{...props}
		/>
	);
};
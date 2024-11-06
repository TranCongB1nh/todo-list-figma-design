import { Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from 'react';
import { Outlet } from 'react-router-dom';
const Layout = () => {
	return (
		<Box
			h='100vh'
			w='100vw'
			bgGradient='linear-gradient(to-b, #7BCBD4 0%, #29C6B7 100%)'
		>
			<Outlet />
			<ColorModeSwitcher
				position='fixed'
				bottom={3}
				left={3}
			/>
		</Box>
	);
};

export default Layout;
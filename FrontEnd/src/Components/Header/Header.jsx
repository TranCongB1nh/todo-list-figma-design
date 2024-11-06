import { Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../Redux/actions/userAction'
import { getUserData } from '../../utils/auth'

const Header = () => {
  const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.currentUser);

useEffect(() => {
  const storedUser = getUserData();
  if (!currentUser && storedUser) {
    dispatch({ type: 'SET_CURRENT_USER', payload: storedUser });
  }
}, [currentUser, dispatch]);

	function handleLogOut() {
		localStorage.removeItem('currentUser');
		dispatch(userLogout());
		navigate('/login', { replace: true });
	}
  
  return (
    <HStack
      className="header__container"
      justify="space-between"
      alignItems="center"
      w="100%"
    >
      <VStack className="header__left-container">
        <HStack className="user__container">
          <Text alignSelf="flex-start" size={30} fontWeight="700">
            Welcome,
          </Text>
          <Text as="b" fontWeight="600" className="user__name" size={18}>
            {currentUser.username}
          </Text>
        </HStack>
      </VStack>
      <Flex className="header__right-container" justify="center" align="center">
        <IconButton
          _hover={{ backgroundColor: "gray.600" }}
          isRound={true}
          size={"xs"}
          className="button__log-out"
          icon={<IoIosLogOut />}
          backgroundColor="gray.800"
          color="white"
          onClick={handleLogOut}
        />
      </Flex>
    </HStack>
  );
};

export default Header;

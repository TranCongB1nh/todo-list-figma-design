import {
    Box,
    Heading,
    HStack,
    Text,
    Image,
    Button
} from "@chakra-ui/react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import notFoundImage from "../image/not-found.png"

const NotFound = () => {
    const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <HStack className="login">
      <Box
        w={"59.72%"}
        h={"100vh"}
        style={{
          background: "linear-gradient(180deg, #7BCBD4 0%, #29C6B7 100%)",
        }}
        className="login__intro"
        display={"flex"}
        justifyContent={"center"}
        gap={"20px"}
        flexDirection={"column"}
        paddingLeft={"120px"}
      >
        <Heading as={"h2"} size={"2xl"} color={"#FFFFFF"}>
          Todo App
        </Heading>
        <Text fontSize={"lg"} color={"#FFFFFF"}>
          Manage your work everyday
        </Text>
      </Box>

      <Box
        className="login__form"
        w={"40.28%"}
        h={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image src={notFoundImage}/>
        <Button
            backgroundColor={"#319795"}
            marginTop={"40px"}
            onClick={goBack}
        >
            <Text fontSize={"md"} fontWeight={600} color={"#FFFFFF"}>Back</Text>
        </Button>
      </Box>
    </HStack>
  );
}

export default NotFound
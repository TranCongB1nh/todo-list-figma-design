import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Text,
  Input,
  FormErrorMessage,
  Button,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { userLogin } from "../Redux/actions/userAction";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Manage rememberMe state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    setEmailError("");
    setPasswordError("");

    // Dispatch login action with Remember Me flag
    dispatch(userLogin(values.email, values.password, rememberMe))
      .then(() => {
        navigate("/todo");
      })
      .catch((error) => {
        if (error.response) {
          setEmailError("Incorrect email or password. Please try again.");
        }
      });
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
      >
        <Box minWidth={"320px"}>
          <Heading as={"h3"} size={"lg"} color={"#111928"} marginBottom={"8px"}>
            Welcome back!
          </Heading>
          <Text
            fontSize={"lg"}
            color={"#111928"}
            fontWeight={"500"}
            marginBottom={"40px"}
          >
            Login to Get Started
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              htmlFor="email"
              isInvalid={!!emailError || errors.email}
              marginTop={"16px"}
            >
              <FormLabel marginBottom={"8px"}>
                <Text fontSize={"sm"} fontWeight={500} color={"#111928"}>
                  Email Address
                </Text>
              </FormLabel>
              <Input
                id="email"
                placeholder="Enter your email"
                errorBorderColor="#E53E3E"
                {...register("email", {
                  required: "This field cannot be empty",
                })}
              />
              <FormErrorMessage color={"#E53E3E"} fontSize={"12px"}>
                {emailError || (errors.email && errors.email.message)}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              htmlFor="password"
              isInvalid={!!passwordError || errors.password}
              marginTop={"16px"}
            >
              <FormLabel marginBottom={"8px"}>
                <Text fontSize={"sm"} fontWeight={500} color={"#111928"}>
                  Password
                </Text>
              </FormLabel>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                errorBorderColor="#E53E3E"
                {...register("password", {
                  required: "This field cannot be empty",
                })}
              />
              <FormErrorMessage color={"#E53E3E"} fontSize={"12px"}>
                {passwordError || (errors.password && errors.password.message)}
              </FormErrorMessage>
            </FormControl>

            <Checkbox
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              marginTop={"40px"}
              defaultChecked
              size={"md"}
            >
              Remember me
            </Checkbox>

            <Button
              type="submit"
              backgroundColor={"#319795"}
              width={"100%"}
              marginTop={"16px"}
            >
              <Text fontSize={"md"} fontWeight={600} color={"#FFFFFF"}>
                Login
              </Text>
            </Button>
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"#4A5568"}
              marginTop={"16px"}
            >
              Don't have an account?{" "}
              <Link href="/register" color="#319795">
                Register here
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </HStack>
  );
};

export default Login;

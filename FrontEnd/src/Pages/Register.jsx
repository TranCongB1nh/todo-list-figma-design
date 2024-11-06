import { useNavigate } from 'react-router-dom'
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
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { userRegister, resetRegistrationMessage } from "../Redux/actions/userAction"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { error, registrationMessage } = useSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  function onSubmit(values) {
    // Bắt đầu quá trình đăng ký và đảm bảo reset lại thông báo từ đăng ký trước đó
    dispatch(resetRegistrationMessage()); // Thêm reset trước khi thực hiện đăng ký mới
    dispatch(userRegister(values.username, values.email, values.password));
  }

  useEffect(() => {
    if (registrationMessage) {
      // Khi có thông báo đăng ký thành công, điều hướng đến trang login
      navigate('/login');
      dispatch(resetRegistrationMessage()); // Reset thông báo sau khi chuyển hướng
    }
  }, [registrationMessage, navigate, dispatch]);

  return (
    <HStack className="register">
      <Box
        w={"59.72%"}
        h={"100vh"}
        style={{
          background: "linear-gradient(180deg, #7BCBD4 0%, #29C6B7 100%)",
        }}
        className="register__intro"
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
        className="register__form"
        w={"40.28%"}
        h={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box minWidth={"320px"}>
          <Heading as={"h3"} size={"lg"} color={"#111928"} marginBottom={"8px"}>
            Hello!
          </Heading>
          <Text
            fontSize={"lg"}
            color={"#111928"}
            fontWeight={"500"}
            marginBottom={"40px"}
          >
            Sign Up to Get Started
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl htmlFor="username" isInvalid={errors.username}>
              <FormLabel marginBottom={"8px"}>
                <Text fontSize={"sm"} fontWeight={500} color={"#111928"}>
                  Full name
                </Text>
              </FormLabel>
              <Input
                id="username"
                placeholder="Enter your name"
                errorBorderColor="#E53E3E"
                {...register("username", {
                  required: "This field cannot be empty",
                })}
              />
              <FormErrorMessage
                color={"#E53E3E"}
                fontSize={"12px"}
                lineHeight={"16px"}
              >
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              htmlFor="email"
              isInvalid={errors.email}
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:
                      "Please enter a valid email address in format: name@example.com",
                  },
                })}
              />
              <FormErrorMessage
                color={"#E53E3E"}
                fontSize={"12px"}
                lineHeight={"16px"}
              >
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              htmlFor="password"
              isInvalid={errors.password}
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
                  minLength: {
                    value: 6,
                    message:
                      "Please enter a valid password. The password is required at least 6 characters",
                  },
                })}
              />
              <FormErrorMessage
                color={"#E53E3E"}
                fontSize={"12px"}
                lineHeight={"16px"}
              >
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              htmlFor="comfirmPassword"
              isInvalid={errors.comfirmPassword}
              marginTop={"16px"}
            >
              <FormLabel marginBottom={"8px"}>
                <Text fontSize={"sm"} fontWeight={500} color={"#111928"}>
                  Comfirm Password
                </Text>
              </FormLabel>
              <Input
                id="comfirmPassword"
                placeholder="Enter your comfirmPassword"
                type="password"
                errorBorderColor="#E53E3E"
                {...register("comfirmPassword", {
                  required: "This field cannot be empty",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Password does not match",
                })}
              />
              <FormErrorMessage
                color={"#E53E3E"}
                fontSize={"12px"}
                lineHeight={"16px"}
              >
                {errors.comfirmPassword && errors.comfirmPassword.message}
              </FormErrorMessage>
            </FormControl>

            {/* Display registration error */}
            {error && (
              <Text color="red.500" fontSize="sm" marginTop="16px">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              backgroundColor={"#319795"}
              marginTop={"40px"}
              width={"100%"}
            >
              <Text fontSize={"md"} fontWeight={600} color={"#FFFFFF"}>
                Register
              </Text>
            </Button>

            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"#4A5568"}
              marginTop={"16px"}
            >
              Already have an account?{" "}
              <Link href="/login" color="#319795">
                Login here
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </HStack>
  );
};

export default Register;

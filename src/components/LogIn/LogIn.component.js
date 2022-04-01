import React, { useEffect, useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Text,
  Divider,
  Button,
  useToast,
  InputGroup,
  InputRightElement,

} from "@chakra-ui/react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios';
import api from './../../utils/axios';

import { AuthContext } from './../../context/authContext';
const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .required("Required")
    .matches("^[a-zA-Z0-9_]*$", "You can use a-z, A-z, 0-9 only")
    .min(3).max(20),
  password: Yup.string()
    .min(8, "Too short!")
    .max(16, "Too long!")
    .required("Required"),
});

//component
function LogIn() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const logIn = useMutation((user) => api.post("/user/login", user));
const qC=useQueryClient()
  const toast = useToast()
  const navigate = useNavigate();
  const {authenticated, setauthenticated}=useContext(AuthContext)
  const handleSubmit = (val, act) => {
    console.log(val)
    logIn.mutate(val, {
      onSuccess: (data, vars, ctx) => {
        
        console.log(data, vars, ctx);
        localStorage.setItem("token", data.data.token);
        setauthenticated(true)
        qC.invalidateQueries("current_user");
        navigate("/products");
        return toast({
          title: 'Logged in successfully...',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      onError: (error, vars, ctx) => {
        console.log(error)
        localStorage.removeItem("token");
        setauthenticated(false)
        navigate("/auth");
        return toast({
          title: 'Log in failed!',
          description: "Could not lod you in!",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        
      },
    });
  };

  return (
    <div>
      <Flex
        data-testid="login-form"
        justify="start"
        direction="column"
        mx="auto"
        w={{ base: "90%", md: "70%", lg: "60%", xl: "40%" }}
      >
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="userName" >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.userName && form.touched.userName}
                    id="login-username"
                    isRequired
                  >
                    <FormLabel htmlFor="email">User name:</FormLabel>
                    <Input
                      {...field}
                      data-testid="login-username"
                      id="login-username"
                      placeholder="enter user name"
                      type="text"
                    />
                    <FormHelperText>Choose a user name.</FormHelperText>
                    <FormErrorMessage data-testid="login-user-error">{form.errors.userName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field
                type="password"
                name="password"
                
              >
                {({ field, form }) =>(
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      id="login-password"
                      isRequired
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup size="md">
                        <Input
                        data-testid="login-password"
                          {...field}
                          id="login-password-label"
                          minLength={8}
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormHelperText>
                        Your password! (min 8 char)
                      </FormHelperText>
                      <FormErrorMessage data-testid="login-password-error">
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )
                }
              </Field>
              <Button
                data-testid="login-submit"
                leftIcon={<ChevronRightIcon />}
                mt={10}
                colorScheme="green"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </div>
  );
}

export default LogIn;

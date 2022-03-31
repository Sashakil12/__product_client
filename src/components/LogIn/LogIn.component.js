

import React,{ useEffect, useState } from "react";
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
  InputGroup, InputRightElement, 
} from "@chakra-ui/react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";



const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  password: Yup.string()
    .min(8, "Too short!")
    .max(16, "Too long!")
    .required("Required"),
});

//component
function LogIn({ logIn, user }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = (val, act) => {
    // logIn(val, toast, act.setSubmitting, router, setCookie);
  };
 
  return (
    <div>
      

      <Flex
        justify="start"
        direction="column"
        mx="auto"
        w={{ base: "90%", md: "70%", lg: "60%", xl: "40%" }}
      >
        <Text fontSize="3xl" my={7} textAlign="center">
          Login
        </Text>
        <Divider alignSelf="center" mb={8} w="60%" borderColor="green" />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    id="email"
                    isRequired
                  >
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="you@mail.com"
                      type="email"
                    />
                    <FormHelperText>Enter your email above.</FormHelperText>
                    <FormErrorMessage>Invalid Email!</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="password" name="password">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      id="password"
                      isRequired
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup size="md">
                      <Input
                      {...field}
                        id="password"
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
                      <FormHelperText>Your password! (min 8 char)</FormHelperText>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Button
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
        <Flex my={2}>
          <Text>Don't have an account? </Text>
          <Link href="/signup">
            <Text style={{ cursor: "pointer" }} ml={1} color="green">
              Sign Up here...
            </Text>
          </Link>
        </Flex>
        <Flex mt={2} mb={5}>
          <Link href="/pass_reset">
            <Text style={{ cursor: "pointer" }} color="green">
              Forgot password?
            </Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}

export default LogIn;

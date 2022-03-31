import React, { useEffect, useState } from "react";
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

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9a-z]+$/, "You can use a-z, A-z, 0-9 only"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(16, "Too long!")
    .required("Required"),
});

//component
function LogIn({ logIn, user }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="userName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.userName && form.touched.userName}
                    id="login-username"
                    isRequired
                  >
                    <FormLabel htmlFor="email">User name:</FormLabel>
                    <Input
                      {...field}
                      id="login-username"
                      placeholder="enter user name"
                      type="text"
                    />
                    <FormHelperText>Choose a user name.</FormHelperText>
                    <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="password" name="password">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      id="login-password"
                      isRequired
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup size="md">
                        <Input
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
      </Flex>
    </div>
  );
}

export default LogIn;

import { useEffect, useState } from "react";

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
  Checkbox,
  InputGroup,
  InputRightElement,
  InputGroupProps,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const signUpSchema = Yup.object().shape({
  userName: Yup.string().required("Required").trim()
  .matches(/^[0-9a-z]+$/, "You can use a-z, A-z, 0-9 only"),
  password: Yup.string()
    .trim()
    .min(8, "Too short!")
    .max(16, "Too long!")
    .required("Required"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match!",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

//Component
function SignUp({ signUp, user }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const navigate = useNavigate();

  const handleSubmit = (val, act) => {
    console.log("handle submit clicked");
    // signUp(val, toast, act.setSubmitting, router, setCookie);
  };

  return (
    <div>
      <Flex
      data-testid="signup-form"
        justify="start"
        direction="column"
        mx="auto"
        w={{ base: "90%", md: "70%", lg: "60%", xl: "40%" }}
      >
        <Formik
          initialValues={{ userName: "", password: "", confirmPassword: "" }}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
               <Field type="text" name="userName" data-testid="signup-username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.userName && form.touched.userName}
                    id="signup-username"
                    isRequired
                  >
                    <FormLabel htmlFor="email">User name:</FormLabel>
                    <Input
                      {...field}
                      id="signup-username"
                      placeholder="enter user name"
                      type="text"
                    />
                    <FormHelperText>Choose a user name.</FormHelperText>
                    <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="password" name="password" data-testid="signup-password">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      id="password"
                      isRequired
                    >
                      <FormLabel>Password</FormLabel>
                      {/* <Input
                                                {...field}
                                                type="password"
                                                id="password"
                                                minLength={8}
                                                placeholder="enter your password"
                                            /> */}
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
              <Field type="password" name="confirmPassword" data-testid="signup-confirm">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.confirmPassword &&
                        form.touched.confirmPassword
                      }
                      id="confirmPassword"
                      isRequired
                    >
                      <FormLabel>Retype Password</FormLabel>
                      {/* <Input
                                                {...field}
                                                type="password"
                                                id="confirmPassword"
                                                minLength={8}
                                                placeholder="Retype your password"
                                            /> */}
                      <InputGroup size="md">
                        <Input
                          {...field}
                          id="confirmPassword"
                          minLength={8}
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Confirm password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormHelperText>Retype Your password!</FormHelperText>
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Button
              data-testid="signup-submit"
                leftIcon={<ChevronRightIcon />}
                mt={10}
                colorScheme="green"
                isLoading={isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </div>
  );
}

export default SignUp;

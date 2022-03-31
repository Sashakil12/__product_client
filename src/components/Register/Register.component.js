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
  InputLeftAddon
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';

const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  password: Yup.string()
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
  phone: Yup.string()
    .min(11, "Enter a (minimum) 11 digit BD phone number")
    .max(11, "More than 11 digits!")
    .required("You must enter a phone number!"),
  name: Yup.string().min(3, "Too short!").max(75, "Too long!").required(),
  subscribed: Yup.boolean().oneOf([true, false]),
});

//Component
function SignUp({ signUp, user }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  
  const navigate = useNavigate();

  const handleSubmit = (val, act) => {
    console.log("handle submit clicked")
    // signUp(val, toast, act.setSubmitting, router, setCookie);
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
          initialValues={{ email: "", password: "" }}
          validationSchema={signUpSchema}
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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </div>
  );
}

export default SignUp

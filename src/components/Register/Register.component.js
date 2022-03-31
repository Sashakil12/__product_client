import { useEffect, useState } from "react";
import Head from "next/head";
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
import { connect } from "react-redux";
import { signUp } from "../redux/thunks/userThunk";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { selectUser } from "../redux/selectors/userSelectors";
import { NextSeo } from "next-seo";

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
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const router = useRouter();

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
        <Text fontSize="3xl" my={7} textAlign="center">
          Register
        </Text>
        <Divider alignSelf="center" mb={8} w="60%" borderColor="green" />
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            subscribed: true,
            phone: "",
          }}
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
              <Field type="password" name="confirmPassword">
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
              <Field type="phone" name="phone">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.phone && form.touched.phone}
                      id="phone"
                      isRequired
                    >
                      <FormLabel>Phone Number</FormLabel>
                      {/* <Input
                        {...field}
                        type="phone"
                        id="phone"
                        minLength={11}
                        placeholder="enter your phone"
                      /> */}
                      <InputGroup>
                        <InputLeftAddon children="+88" />
                        <Input
                        {...field}
                          id="phone"
                          minLength={11}
                          placeholder="enter your phone"
                          type="tel"
 
                        />
                      </InputGroup>

                      <FormHelperText>
                        Your phone number! (11 digits)
                      </FormHelperText>
                      <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field type="name" name="name">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      id="name"
                      isRequired
                    >
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        {...field}
                        type="name"
                        id="name"
                        minLength={3}
                        placeholder="enter your name"
                      />
                      <FormHelperText>Your Full name!</FormHelperText>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field type="checkbox" name="subscribed">
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.subscribed && form.touched.subscribed
                      }
                      id="subscribed"
                      isRequired
                    >
                      <Checkbox
                        my={6}
                        {...field}
                        type="checkbox"
                        id="subscribed"
                        defaultChecked={field.value}
                      >
                        I want to get notified about my product's tracking info
                        and offers!
                      </Checkbox>

                      <FormErrorMessage>
                        {form.errors.subscribed}
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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </div>
  );
}

export default SignUp

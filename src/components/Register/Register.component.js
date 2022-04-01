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
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import api from './../../utils/axios';

const signUpSchema = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .required("Required")
    .matches("^[a-zA-Z0-9_]*$", "You can use a-z, A-z, 0-9 only")
    .min(3).max(20),
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
function SignUp() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const signUp = useMutation(user => api.post("/user/register", user))
  const qC = useQueryClient()  
  const navigate = useNavigate();

  const handleSubmit = (values, act) => {
    console.log("handle submit clicked");
    console.log(values);
    delete values.confirmPassword;
    signUp.mutate(values,{
    
      onSuccess:()=>{
       navigate('/')
       qC.invalidateQueries("current_user") 
       return  toast({
          title: 'Signed up successfully...',
          description: "",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      onError:()=>{
       return  toast({
        title: 'Sign up failed...',
        description: "",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      },
      onMutate:(vars)=>{
        toast({
          title: 'Signing up...',
          description: "",
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
       return  {...vars}
      }
    })
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
                    data-testid="signup-username"
                      {...field}
                      id="signup-username"
                      placeholder="enter user name"
                      type="text"
                    />
                    <FormHelperText>Choose a user name.</FormHelperText>
                    <FormErrorMessage data-testid="signup-user-error">{form.errors.userName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="password" name="password" >
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
                        data-testid="signup-password"
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
                      <FormErrorMessage data-testid="signup-password-error">
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field type="password" name="confirmPassword" >
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
                          data-testid="signup-confirm"
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
                      <FormErrorMessage data-testid="signup-confirm-error">
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

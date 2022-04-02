import { useState } from "react";
import {
  Select,
  createStandaloneToast,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { PlusSquareIcon} from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { addProduct } from "../../reactQueryFunctions/productList";

const PRODUCT_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Required")
    .test(
      "len",
      "Must be at least 5 characters",
      (val) => val && val.length >= 5
    ),
  categoryId: Yup.number().required("Required").min(1),
  categoryName: Yup.string()
    .required("Required")
    .trim()
    .test(
      "len",
      "Must be at least 3 characters",
      (val) => val && val.length >= 3
    ),
  unitPrice: Yup.number().required("Required").min(1),
  status: Yup.mixed().required("Required").oneOf(["available", "discontinued"]),
});

function AddProduct( ) {
  const toast = createStandaloneToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const add = useMutation("add-product", addProduct);

  const qC = useQueryClient();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    add.mutate(values, {
      onSuccess: (data, vars, ctx) => {
        console.log(data, vars, ctx);
        qC.setQueriesData("fetch-products", (old=[]) => [data, ...(old || [])]);
        return toast({
          title: "Saved product successfully...",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: (error, vars, ctx) => {
        return toast({
          title: "Could not save...",
          description: "",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };
  return (
    <>
      <Button bg="green.500" color="white" onClick={onOpen} m="1px">
        Add Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                categoryId: "",
                categoryName: "",
                unitPrice: "",
                status: "",
              }}
              validationSchema={PRODUCT_SCHEMA}
              //  validate={()=>({})}
              onSubmit={onFinish}
            >
              {({ values, errors, isSubmitting }) => {
                console.log(values, errors);
                return (
                  <Form>
                    <Field type="text" name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name}
                          id="add-product-name-field"
                          isRequired
                        >
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input
                            {...field}
                            id="add-product-name"
                            placeholder="enter name"
                            type="text"
                          />

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field type="number" name="categoryId">
                      {({ field, form }) => {
                        return (
                          <FormControl
                            isInvalid={form.errors.categoryId}
                            id="add-product-categoryId-field"
                          >
                            <FormLabel htmlFor="categoryId">
                              Category Id
                            </FormLabel>
                            <Input
                              {...field}
                              id="add-product-categoryId-input"
                              type="number"
                            />
                            {/* <Input
                              {...field}
                              id="add-product-unitPrice-inp"
                              type="number"
                            /> */}
                            <FormErrorMessage>
                              {form.errors.categoryId}
                            </FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field type="text" name="categoryName">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.categoryName}
                          id="add-product-categoryName-field"
                          isRequired
                        >
                          <FormLabel htmlFor="name">Category Name</FormLabel>
                          <Input
                            {...field}
                            id="add-product-categoryName"
                            placeholder="enter category name"
                            type="text"
                          />

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field type="number" name="unitPrice">
                      {({ field, form }) => {
                        return (
                          <FormControl
                            isInvalid={form.errors.unitPrice}
                            id="add-product-unitPrice"
                          >
                            <FormLabel htmlFor="unit price">
                              Unit Price
                            </FormLabel>
                            <Input
                              {...field}
                              id="add-product-unitPrice-inp"
                              type="number"
                            />
                            <FormErrorMessage>
                              {form.errors.unitPrice}
                            </FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field type="text" name="status">
                      {({ field, form }) => {
                        return (
                          <FormControl
                            isInvalid={form.errors.status}
                            id="add-product-status"
                            isRequired
                          >
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select
                              placeholder="Select status"
                              id="add-product-status-inp"
                              {...field}
                            >
                              <option data-testid="available" value="available">Available</option>
                              <option data-testid="discontinued" value="discontinued">Discontinued</option>
                            </Select>

                            <FormErrorMessage>
                              {form.errors.status}
                            </FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    </Field>

                    <Button
                      leftIcon={<PlusSquareIcon />}
                      mt={10}
                      colorScheme="green"
                      isLoading={add.isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProduct;

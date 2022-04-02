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
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import {
  addProduct,
  updateProduct,
} from "../../reactQueryFunctions/productList";

const PRODUCT_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .trim()
    .test(
      "len",
      "Must be at least 5 characters",
      (val) => val && val.length >= 5
    ),
  categoryId: Yup.number().min(1),
  categoryName: Yup.string()
    .trim()
    .test(
      "len",
      "Must be at least 3 characters",
      (val) => val && val.length >= 3
    ),
  unitPrice: Yup.number().min(1),
  status: Yup.mixed().oneOf(["available", "discontinued"]),
});

function UpdateProduct({ product, limit, skip }) {
  const { _id, __v, createdAt, updatedAt, ...initVal } = product;
  const toast = createStandaloneToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const update = useMutation("update-product", updateProduct);
  const qC = useQueryClient();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    update.mutate(
      { values, _id },
      {
        onSuccess: (data, vars, ctx) => {
          console.log("update success", data, vars, ctx);

          qC.setQueriesData(["fetch-products", limit, skip], (old = []) => {
            return [...old.map((el) => (el._id === data._id ? data : el))];
          });
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
      }
    );
  };

  return (
    <>
      <Button
        outline={false}
        color="blue.500"
        variant={"unstyled"}
        onClick={onOpen}
        m="1px"
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ ...initVal }}
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
                          id="add-product-name"
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
                            id="add-product-categoryId"
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
                          id="add-product-categoryName"
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
                          >
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select
                              placeholder="Select status"
                              id="add-product-status-inp"
                              {...field}
                            >
                              <option value="available">Available</option>
                              <option value="discontinued">Discontinued</option>
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
                      isLoading={update.isLoading}
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

export default UpdateProduct;

import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const ContactMeSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen, onClose } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: '',
      comment: ''
    },
    onSubmit: (values) => {submit('/api/form', values)},
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      type: Yup.string()
        .required('Please select a type'),
      comment: Yup.string()
        .required('Comment is required')
        .min(10, 'Comment must be at least 10 characters'),
    }),
  });

 useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === 'success') {
        formik.resetForm();  // Reset form only on success
      }
    

    // Clear the timer if the component unmounts or response changes
    return () => onClose();
  }
}, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      background="linear-gradient(to bottom, #EDC9AF, #B66A50)"
      py={16}
      spacing={8}
      
    >
      <VStack
  w={{ base: "90%", sm: "600px", md: "800px", lg: "1024px" }}
  p={{ base: 6, sm: 10, md: 16, lg: 32 }}
  alignItems="flex-start"
  id="contactme-section"
>
  <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }}>
    Contact me
  </Heading>
  <Box p={6} rounded="md" w="100%" bg="transparent">
    <form onSubmit={formik.handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
          <FormLabel htmlFor="firstName">Name</FormLabel>
          <Input id="firstName" name="firstName" {...formik.getFieldProps('firstName')} />
          <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input id="email" name="email" type="email" {...formik.getFieldProps('email')} />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.touched.type && !!formik.errors.type}>
          <FormLabel htmlFor="type">Type of enquiry</FormLabel>
          <Select
            id="type"
            name="type"
            {...formik.getFieldProps('type')}
            sx={{
              option: {
                color: 'black',
                fontWeight: 'bold',
              },
            }}
            placeholder="Select an option"
          >
            <option value="hireMe">Freelance project proposal</option>
            <option value="openSource">Open source consultancy session</option>
            <option value="other">Other</option>
          </Select>
          <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
          <FormLabel htmlFor="comment">Your message</FormLabel>
          <Textarea
            id="comment"
            name="comment"
            height={{ base: "180px", md: "250px" }}
            {...formik.getFieldProps('comment')}
          />
          <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </VStack>
    </form>
  </Box>
</VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;

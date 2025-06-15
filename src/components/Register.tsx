import { useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate, Link } from "react-router-dom";
import { useAlertContext } from "../context/alertContext";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  Text,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import background from "../images/landingpagebg.jpg";

const MotionBox = motion(Box);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { onOpen } = useAlertContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Full name is required");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      onOpen("success", "You can now log in!");
      setEmail("");
      setPassword("");
      setFullName("");
      navigate("/login");
    }
  };

  return (
    <Flex
      minH="100vh"
      bgImage={`url(${background})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      align="center"
      justify="flex-start"
      px={{ base: 4, md: 24 }}
    >
      <MotionBox
        maxW="md"
        w="full"
        p={8}
        borderRadius="lg"
        bg="rgba(0, 0, 0, 0.7)"
        boxShadow="lg"
        color="white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <VStack spacing={6} as="form" onSubmit={handleRegister}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="semibold"
          lineHeight="short">
            Register
          </Heading>

          {errorMsg && (
            <Alert status="error" borderRadius="md" bg="#e53e3e" color="white">
              <AlertIcon />
              {errorMsg}
            </Alert>
          )}

          <FormControl id="fullName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="white"
              placeholder="John Doe"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 5px #4299e1" }}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="white"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 5px #4299e1" }}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="white"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 5px #4299e1" }}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" size="lg" fontWeight="bold">
            Register
          </Button>

          <Text fontSize="sm" color="gray.300" pt={2} textAlign="center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#63b3ed", fontWeight: "600" }}>
              Log in here
            </Link>
          </Text>
        </VStack>
      </MotionBox>
    </Flex>
  );
};

export default Register;
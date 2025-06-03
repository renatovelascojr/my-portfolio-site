import { useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlertContext } from '../context/alertContext';
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");  // <-- new state for full name
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
      onOpen('success', 'You can now log in!');
      setEmail('');
      setPassword('');
      setFullName('');  // <-- clear full name on success
      navigate("/login");
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, #0f2027, #203a43, #2c5364)"
      px={4}
    >
      <Box
        maxW="md"
        w="full"
        bg="#1a202c"
        p={8}
        borderRadius="lg"
        boxShadow="0 0 15px rgba(0,0,0,0.6)"
        border="2px solid #2b6cb0"
      >
        <VStack spacing={6} as="form" onSubmit={handleRegister} color="white">
          <Heading size="lg" letterSpacing="wide" color="#63b3ed">
            Register
          </Heading>

          {errorMsg && (
            <Alert status="error" borderRadius="md" bg="#e53e3e" color="white">
              <AlertIcon />
              {errorMsg}
            </Alert>
          )}

          {/* New full name field */}
          <FormControl id="fullName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="white"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 5px #4299e1" }}
              placeholder="John Doe"
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

          <Button type="submit" colorScheme="blue" width="full" size="lg" fontWeight="bold">
            Register
          </Button>

          <Text fontSize="sm" color="gray.300" pt={2} textAlign="center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#63b3ed", fontWeight: "600" }}>
              Log in here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
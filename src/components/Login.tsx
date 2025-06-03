import { useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Flex
} from "@chakra-ui/react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/home"); // redirect to home or dashboard
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, #0f2027, #203a43, #2c5364)" // dark navy/steel blue gradient
      px={4}
    >
      <Box
        maxW="md"
        w="full"
        bg="#1a202c" // dark gray-blue background for the box
        p={8}
        borderRadius="lg"
        boxShadow="0 0 15px rgba(0,0,0,0.6)"
        border="2px solid #2b6cb0" // steel blue border
      
      >
        <VStack spacing={6} as="form" onSubmit={handleLogin} color="white">
          <Heading size="lg" letterSpacing="wide" color="#63b3ed">
            Log In
          </Heading>

          {errorMsg && (
            <Alert status="error" borderRadius="md" bg="#e53e3e" color="white">
              <AlertIcon />
              {errorMsg}
            </Alert>
          )}

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
            Log In
          </Button>

          <Text fontSize="sm" color="gray.300" textAlign="center">
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#63b3ed", fontWeight: "600" }}>
              Register here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
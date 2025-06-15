import {
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Box,
  useTheme
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import background from "../images/landingpagebg.jpg";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const FirstLandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/home");
      }
    };
    checkAuth();
  }, []);

  return (
    <Box
      minH="100vh"
      w="100%"
      backgroundImage={`url(${background})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      px={{ base: 4, md: 16 }}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <MotionVStack
        align="start"
        spacing={6}
        maxW="lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        fontFamily="Georgia, serif" // relaxing font
        color="white"
      >
        <Heading
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="semibold"
          lineHeight="short"
        >
          Welcome to my Portfolio!
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} color="whiteAlpha.800">
          This portfolio uses demo login/register to showcase authentication. <br />
          You can use any email/password to register — no email confirmation required.
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="pink" onClick={() => navigate("/register")}>
            Register for Free
          </Button>
          <Button colorScheme="whiteAlpha" variant="outline" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </HStack>
      </MotionVStack>
    </Box>
  );
};

export default FirstLandingPage;
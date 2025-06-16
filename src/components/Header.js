import React, { useEffect, useRef, useState } from "react";
import { Box, HStack, Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Collapse, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleScrollTo = (anchor) => () => {
  const scrollToSection = () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  scrollToSection(); // ← You missed this call
};

const handleLogout = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.clear(); // Clear any leftover auth/session data
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

  
  return (
    <>
      <IconButton
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        variant="ghost"
        colorScheme="teal"
        aria-label="Toggle Navigation"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse in={isOpen} animateOpacity>
        <VStack
          position="absolute"
          top="70px"
          right="20px"
          bg="gray.800"
          borderRadius="md"
          shadow="lg"
          spacing={4}
          p={4}
          zIndex={1001}
          align="stretch"
        >
          {[
          { label: "What I can do", target: "projects" },
          { label: "About Me", target: "aboutme" },
          { label: "Contact Us", target: "contactme" },
        ].map((item) => (
          <ChakraLink
            key={item.target}
            onClick={() => {
              setIsOpen(false);
              setTimeout(() => {
                handleScrollTo(item.target)();
              }, 300); // wait for collapse animation (~300ms)
            }}
            cursor="pointer"
            fontSize="lg"
            color="gray.300"
            fontWeight="medium"
            _hover={{
              color: "teal.300",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
            transition="color 0.2s ease-in-out"
          >
            {item.label}
          </ChakraLink>
        ))}
          {user ? (
  <ChakraLink
    onClick={() => {
      handleLogout();
      setIsOpen(false);
    }}
    color="red.400"
    fontWeight="bold"
    _hover={{ color: "red.300" }}
  >
    Log Out
  </ChakraLink>
) : (
  <ChakraLink
    onClick={() => {
      navigate("/firstlandingpage");
      setIsOpen(false);
    }}
    color="teal.300"
    fontWeight="bold"
    _hover={{ color: "teal.200" }}
  >
    Log In
  </ChakraLink>
)}
        </VStack>
      </Collapse>
    </>
  );
};

const Header = () => {
  const [transform, setTransform] = useState("translateY(0)");
  const prevScrollY = useRef(window.scrollY);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setTransform("translateY(-200px)");
      } else {
        setTransform("translateY(0)");
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const handleScrollTo = (anchor) => () => {
  const scrollToSection = () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  scrollToSection(); // ← You missed this call
};

const handleLogout = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.clear(); // Clear any leftover auth/session data
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

  return (
  <Box
  position="fixed"
  top={0}
  left={0}
  right={0}
  transform={transform}
  transition="transform 0.3s ease-in-out"
  backgroundColor="rgba(36, 36, 42, 0.6)"
  backdropFilter="blur(16px)"
  WebkitBackdropFilter="blur(16px)"
  borderBottom="1px solid rgba(255, 255, 255, 0.08)"
  zIndex={1000}
  width="100%"
  boxShadow="sm"
>
  <Box color="gray.200" maxWidth="1280px" margin="0 auto">
    <Flex
      px={{ base: 4, md: 16 }}
      py={{ base: 4, md: 6 }}
      justify="space-between"
      align="center"
    >
      {/* Left: Logo or Brand */}
      <Box
        onClick={handleScrollTo("landing")}
        cursor="pointer"
        _hover={{ color: "teal.300" }}
      >
        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
          Ren
        </Text>
      </Box>

      {/* Desktop Nav */}
      <HStack
        spacing={8}
        display={{ base: "none", md: "flex" }}
      >
        {[
          { label: "What I can do", target: "projects" },
          { label: "About Me", target: "aboutme" },
          { label: "Contact Us", target: "contactme" },
        ].map((item) => (
          <ChakraLink
            key={item.target}
            onClick={handleScrollTo(item.target)}
            cursor="pointer"
            fontSize="lg"
            color="gray.300"
            fontWeight="medium"
            _hover={{
              color: "teal.300",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
            transition="color 0.2s ease-in-out"
          >
            {item.label}
          </ChakraLink>
        ))}
      </HStack>

      {/* Log Out Desktop */}
      {user ? (
  <ChakraLink
    onClick={handleLogout}
    cursor="pointer"
    display={{ base: "none", md: "inline" }}
    fontWeight="bold"
    fontSize="lg"
    color="red.400"
    _hover={{
      color: "red.300",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
    }}
    transition="color 0.2s ease-in-out"
  >
    Log Out
  </ChakraLink>
) : (
  <ChakraLink
    onClick={() => navigate("/firstlandingpage")}
    cursor="pointer"
    display={{ base: "none", md: "inline" }}
    fontWeight="bold"
    fontSize="lg"
    color="teal.300"
    _hover={{
      color: "teal.200",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
    }}
    transition="color 0.2s ease-in-out"
  >
    Log In
  </ChakraLink>
)}

      {/* Hamburger Menu Toggle */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileMenu />
      </Box>
    </Flex>
  </Box>
</Box>
  );
};

export default Header;


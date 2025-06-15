import React, { useEffect, useRef, useState } from "react";
import { Box, HStack, Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [transform, setTransform] = useState("translateY(0)");
  const prevScrollY = useRef(window.scrollY);
  const navigate = useNavigate();
  const location = useLocation();

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

    if (location.pathname !== "/home") {
      navigate("/home", { replace: false });
      setTimeout(scrollToSection, 500);
    } else {
      scrollToSection();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    } else {
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
  backgroundColor="rgba(36, 36, 42, 0.6)" // dark gray with transparency
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
      py={{ base: 4, md: 6 }} // more padding for taller nav
      justify="space-between"
      align="center"
    >
      {/* Left: Navigation */}
      <HStack spacing={{ base: 4, md: 8 }}>
        {[
          { label: "Ren", target: "landing" },
          { label: "What I can do", target: "projects" },
          { label: "About Me", target: "aboutme" },
          { label: "Contact Us", target: "contactme" },
        ].map((item) => (
          <ChakraLink
            key={item.target}
            onClick={handleScrollTo(item.target)}
            cursor="pointer"
            fontSize={{ base: "md", md: "lg" }}
            color="gray.300"
            fontWeight={item.label === "Ren" ? "bold" : "medium"}
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

      {/* Right: Log Out */}
      <ChakraLink
        onClick={handleLogout}
        cursor="pointer"
        fontWeight="bold"
        fontSize={{ base: "md", md: "lg" }}
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
    </Flex>
  </Box>
</Box>
  );
};

export default Header;
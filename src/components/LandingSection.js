import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import avatarImage from "../images/avatar.jpg"; // Use your updated image path

const LandingSection = () => {
  
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
  
  return (
  <FullScreenSection
    isDarkBackground
    id="landing-section"
    alignItems="center"
    justifyContent="center"
  >
    <HStack spacing={16} px={8} py={16} align="center" flexWrap="wrap">
      {/* Text Section */}
      <VStack align="flex-start" spacing={6} maxW="xl">
        <Heading fontSize={{ base: "3xl", md: "5xl" }} color="white">
          I am Ren Velasco,
          <br />
          A Front-End Developer
        </Heading>
        <Button
          variant="outline"
          borderColor="whiteAlpha.500"
          color="whiteAlpha.800"
          size="lg"
          cursor="default"
          _hover={{ bg: "whiteAlpha.200" }}
        >
          React | JavaScript | HTML | CSS
        </Button>
        <Button
          colorScheme="whiteAlpha"
          variant="link"
          fontSize="lg"
          mt={4}
           onClick={handleScrollTo("contactme")}
        >
          Work with me today →
        </Button>
      </VStack>

      {/* Oval Image */}
      <Box
        boxSize={{ base: "260px", md: "360px" }}
        borderRadius="full"
        overflow="hidden"
        clipPath="ellipse(50% 70% at 50% 50%)"
        transform="skewX(-12deg)"
        bg="rgba(255,255,255,0.05)"
         mx={{ base: "auto", md: "0" }} 
        boxShadow="0 0 30px rgba(255,255,255,0.05)"
      >
        <Image
          src={avatarImage}
          alt="Ren Velasco"
          objectFit="cover"
          width="105%"
          height="105%"
          transform="skewX(12deg) scale(1.2)"
        />
      </Box>
    </HStack>
  </FullScreenSection>
)
};

export default LandingSection;
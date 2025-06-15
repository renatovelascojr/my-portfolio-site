import React from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react";

import FullScreenSection from "./FullScreenSection";
import avatarImage from "../images/aboutme.jpg";

const AboutMe = () => {
  return (
    <FullScreenSection isDarkBackground id="aboutme-section" py={20}>
      <div style={{ paddingTop: "40px" }}></div>

      <HStack
        spacing={12}
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        maxW="1000px"
        w="100%"
      >
        {/* Left Section: Text */}
        <VStack align="start" spacing={5} flex="1" px={4}>
          <Heading
            size="2xl"
            color="white"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            about me
          </Heading>

          <Text fontSize="2xl" color="gray.300" fontWeight="semibold">
            I’m a Frontend Developer from Pasig, Philippines.
          </Text>

          <Text fontSize="md" color="gray.400" lineHeight="1.8">
            I'm a career shifter from Sales and Quality Assurance, and I discovered a passion for coding that led me to pursue a path in programming.
            I enjoy building clean, user-friendly interfaces using React and JavaScript (HTML/CSS). My goal is to become a better version of myself every day, both in life and in code.
          </Text>

          <Text fontSize="md" color="gray.400" lineHeight="1.8">
            When I'm not coding, I'm probably playing with my cat 🐱, playing Dota or chess, or learning something new.
          </Text>
          
          
        </VStack>

        {/* Right Section: Image */}
        <Box flex="1" textAlign="center">
          <Image
            src={avatarImage}
            alt="Renato Velasco Jr."
            boxSize="320px" // Increased size
            objectFit="cover"
            border="5px solid rgba(255,255,255,0.08)"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
             borderRadius="full"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(52, 10, 150, 0.3)",
            }}
          />
        </Box>
      </HStack>
      
    </FullScreenSection>
  );
};

export default AboutMe;
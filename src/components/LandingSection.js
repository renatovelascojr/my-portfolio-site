import React from "react";
import { Avatar, Center, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import avatarImage from "../images/avatar.jpg";

const greeting = "Hello, I am Ren!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    background="linear-gradient(to bottom, #B66A50, #708238)"
    py={16}
    spacing={8}
  >
    <VStack spacing={6} align="center" maxW="md" textAlign="center">
      <Avatar src={avatarImage} size="2xl" />
      <Heading fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>
        {greeting}
      </Heading>
      <VStack spacing={1}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>{bio1}</Heading>
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>{bio2}</Heading>
      </VStack>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
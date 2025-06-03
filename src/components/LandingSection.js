import React from "react";
import { Avatar, Center, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import avatarImage from "../images/avatar.jpg";


const greeting = "Hello, I am Ren!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (

  
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
  background="linear-gradient(to bottom, #B66A50, #708238)"
    py={16}
  spacing={8}
 
  >
    <Avatar src={avatarImage} size="2xl" />
    <VStack spacing={8}>
      <div><b>{greeting}</b></div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Heading>{bio1}</Heading>
        <Heading>{bio2}</Heading>
      </div>
    </VStack>
    

  </FullScreenSection>
);

export default LandingSection;

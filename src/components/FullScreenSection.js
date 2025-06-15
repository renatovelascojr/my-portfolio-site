import * as React from "react";
import { VStack } from "@chakra-ui/react";

/**
 * Illustrates the use of children prop and spread operator
 */
const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  return (
    <VStack
      minHeight="100vh"
      width="100vw"
      backgroundColor={boxProps.backgroundColor}
      backgroundImage={boxProps.backgroundImage} // allow backgroundImage prop
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      color={isDarkBackground ? "white" : "black"}
      {...boxProps}
    >
      <VStack maxWidth="1280px" width="100%" px={4}>
        {children}
      </VStack>
    </VStack>
  );
};

export default FullScreenSection;

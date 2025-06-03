import * as React from "react";
import { VStack } from "@chakra-ui/react";

/**
 * Illustrates the use of children prop and spread operator
 */
const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  return (
    <VStack
      minHeight="100vh"           // fill full viewport height
      width="100vw"               // fill full viewport width
      backgroundColor={boxProps.backgroundColor}
      color={isDarkBackground ? "white" : "black"}
      {...boxProps}               // spread rest props here to allow overrides
    >
      <VStack maxWidth="1280px" width="100%" px={4}>
        {children}
      </VStack>
    </VStack>
  );
};

export default FullScreenSection;

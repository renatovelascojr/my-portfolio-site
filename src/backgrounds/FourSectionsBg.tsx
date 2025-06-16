import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import bg1 from "../images/bg1.jpg";
import bg2 from "../images/bg2.jpg";

const FourSectionBackground = ({ children }) => {
  const [first, second, third, fourth] = React.Children.toArray(children);

  return (
    <>
      {/* First two sections with bg1 */}
      <Box
        width="100vw"
        minHeight="100vh"
        backgroundImage={`url(${bg1})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <VStack spacing={0} align="stretch">
          {first}
          {second}
        </VStack>
      </Box>

      {/* Last two sections with bg2 */}
      <Box
        width="100vw"
        minHeight="100vh"
        backgroundImage={`url(${bg2})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <VStack spacing={0} align="stretch">
          {third}
          {fourth}
        </VStack>
      </Box>
    </>
  );
};

export default FourSectionBackground;
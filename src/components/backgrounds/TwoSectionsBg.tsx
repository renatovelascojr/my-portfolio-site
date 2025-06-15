import { Box, VStack } from "@chakra-ui/react";
import bgImage from "../../images/bg1.jpg"

const TwoSectionBackground = ({ children }) => {
  return (
    <Box
      minHeight="200vh"
      width="100vw"
      backgroundImage={`url(${bgImage})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <VStack spacing={0} align="stretch">
        {children}
      </VStack>
    </Box>
  );
};

export default TwoSectionBackground;
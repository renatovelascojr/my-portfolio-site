import { Box, VStack } from "@chakra-ui/react";
import bgCombined from "../images/mergedbg.png";

const FourSectionBackground = ({ children }) => {
  return (
    <Box
        minHeight="400vh"
        width="100vw"
        backgroundImage={`url(${bgCombined})`}
        backgroundSize={{ base: "auto 100%", md: "100% 100%" }} // ✅ full width, keep image height proportion
        backgroundRepeat={{ base: "no-repeat", md: "no-repeat" }}
        backgroundPosition="top center"
    >
      <VStack spacing={0} align="stretch">
        {children}
      </VStack>
    </Box>
  );
};

export default FourSectionBackground;
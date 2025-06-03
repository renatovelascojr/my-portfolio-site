import { Box } from "@chakra-ui/react";

export const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <Box px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }} maxW="1200px" mx="auto">
    {children}
  </Box>
);
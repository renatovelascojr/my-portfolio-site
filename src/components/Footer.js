import React from "react";
import { Box, Flex, Text, HStack, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:renatovelascojr@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/renatovelascojr",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/renato-velasco-24351723b/",
  },
  {
    icon: faFacebook,
    url: "https://www.facebook.com/RenatoVelascoJr/",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Footer = () => {
  return (
    <Box backgroundColor="#18181b" color="white" py={6}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="1024px"
        mx="auto"
        px={6}
        gap={4}
      >
        {/* Left: Social Icons */}
        <HStack spacing={5}>
          {socials.map((social, index) => (
            <ChakraLink
              key={index}
              href={social.url}
              isExternal
              aria-label={`Link to ${social.url}`}
              fontSize={{ base: "lg", md: "2xl" }}
            >
              <FontAwesomeIcon icon={social.icon} />
            </ChakraLink>
          ))}
        </HStack>

        {/* Center: Phone and Email */}
        <VStack spacing={0} fontSize="sm" textAlign="center">
          <Text>📞 +63 905 335 2655</Text>
          <Text>✉️ renatovelascojr@gmail.com</Text>
        </VStack>

        {/* Right: Copyright */}
        <Text fontSize="sm" textAlign={{ base: "center", md: "right" }}>
          © 2025 RCVelasco. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
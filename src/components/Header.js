import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate, useLocation } from "react-router-dom";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: renatovelascojr@gmail.com",
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

const Header = () => {
  const [transform, setTransform] = useState("translateY(0)");
  const prevScrollY = useRef(window.scrollY);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setTransform("translateY(-200px)");
      } else {
        setTransform("translateY(0)");
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (anchor) => () => {
    const scrollToSection = () => {
      const id = `${anchor}-section`;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/home") {
      navigate("/home", { replace: false });
      setTimeout(scrollToSection, 500);
    } else {
      scrollToSection();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    } else {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={{ base: transform }}
      transition="transform 0.3s ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
      width="100%"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={{ base: 4, md: 16 }}
          py={{ base: 3, md: 4 }}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <nav>
            <HStack spacing={{ base: 4, md: 8 }} wrap="wrap">
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
          </nav>
          <nav>
            <HStack spacing={{ base: 4, md: 8 }} wrap="wrap" mt={{ base: 2, md: 0 }}>
              <ChakraLink
                onClick={handleScrollTo("projects")}
                cursor="pointer"
                fontSize={{ base: "sm", md: "md" }}
              >
                Projects
              </ChakraLink>
              <ChakraLink
                onClick={handleScrollTo("blogsList")}
                cursor="pointer"
                fontSize={{ base: "sm", md: "md" }}
              >
                Writing / Blogs
              </ChakraLink>
              <ChakraLink
                onClick={handleScrollTo("contactme")}
                cursor="pointer"
                fontSize={{ base: "sm", md: "md" }}
              >
                Contact Us
              </ChakraLink>
              <ChakraLink
                onClick={handleLogout}
                cursor="pointer"
                color="tomato"
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}
              >
                Log Out
              </ChakraLink>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
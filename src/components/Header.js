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
import { Box, HStack } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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

    // If not on the homepage, redirect to it first
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
      transform={transform}
      transition="transform 0.3s ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack px={16} py={4} justifyContent="space-between" alignItems="center">
          <nav>
            <HStack spacing={8}>
              {socials.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a onClick={handleScrollTo("projects")} style={{ cursor: "pointer" }}>
                Projects
              </a>
              <a onClick={handleScrollTo("blogsList")} style={{ cursor: "pointer" }}>
                Writing / Blogs
              </a>
              <a onClick={handleScrollTo("contactme")} style={{ cursor: "pointer" }}>
                Contact Us
              </a>
              <a
                onClick={handleLogout}
                style={{ cursor: "pointer", color: "tomato", fontWeight: "bold" }}
              >
                Log Out
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
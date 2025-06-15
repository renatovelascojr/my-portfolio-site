import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import BlogModalContent from "./BlogModalContent.tsx";

// Import your images
import reactFirebaseIcon from "../images/react-firebase-supabase.png";
import uiWireframeIcon from "../images/ui-wireframe.png";
import dbDiagramIcon from "../images/database-diagram.png";
import chatBubbleIcon from "../images/chat-bubble.png";
import projectThumbIcon from "../images/project-thumbnails.png";
import forumCrudIcon from "../images/forum.png"; // You can update this to a better icon if needed

const skills = [
  {
    title: "React, JavaScript, Firebase & Supabase",
    description:
      "Develop robust apps using React and JavaScript. Integrate authentication and database functionality with Firebase and Supabase.",
    image: reactFirebaseIcon,
  },
  {
    title: "Frontend Development",
    description:
      "Build responsive, accessible, and beautiful UIs using Chakra UI and modern design principles.",
    image: uiWireframeIcon,
  },
  {
    title: "Backend & Database",
    description:
      "Implement secure data handling, authentication, and cloud database logic with tools like Supabase.",
    image: dbDiagramIcon,
  },
  {
    title: "Communication & Collaboration",
    description:
      "Strong communication from sales and support background. Able to translate technical ideas clearly.",
    image: chatBubbleIcon,
  },
  {
    title: "Project Portfolio",
    description:
      "Built multiple apps like a Pet Adoption Platform, Portfolio Site, and Blog App.",
    image: projectThumbIcon,
  },
];

const ProjectsSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <FullScreenSection
      isDarkBackground
      p={8}
      alignItems="center"
      spacing={8}
      id="projects-section"
    >
    

      <Heading as="h1" mb={12} paddingTop="40px">
        What I Can Do
      </Heading>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gridGap={8}
        width="100%"
      >
        {skills.map((skill, idx) => (
          <VStack
            key={idx}
            bg="#262626"
            borderRadius="xl"
            p={6}
            spacing={4}
            boxShadow="lg"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image src={skill.image} alt={skill.title} boxSize="60px" />
            <Heading size="md" color="white" textAlign="center">
              {skill.title}
            </Heading>
            <Text fontSize="sm" color="gray.300" textAlign="center">
              {skill.description}
            </Text>
          </VStack>
        ))}

        {/* 6th Card for Blog CRUD with Modal */}
        <VStack
          bg="#262626"
          borderRadius="xl"
          p={6}
          spacing={4}
          boxShadow="lg"
          transition="all 0.2s"
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
              bg: "#0a2540",           // navy blue shade
              color: "white",              // text color on hover
            }}
          onClick={onOpen}
        >
          <Image src={forumCrudIcon} alt="Forum CRUD" boxSize="60px" />
          <Heading size="md" color="white" textAlign="center">
            Click me! Tell me what you think!
          </Heading>
          <Text fontSize="sm" color="gray.300" textAlign="center">
            Full Create, Read, Update, Delete implementation using Supabase, React, Chakra UI — shown in a forum-style blog section.
          </Text>
        </VStack>
      </Box>

      {/* Modal with Blog Content */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay />
       <ModalContent
          bg="rgba(45, 45, 45, 0.3)" // semi-transparent dark
          color="white"
          borderRadius="xl"
          backdropFilter="blur(16px)" // frosted glass blur
          border="1px solid rgba(255, 255, 255, 0.1)" // subtle border
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)" // deep shadow
          paddingBottom="50px"
        >
          <ModalHeader>Forum / Blog Showcase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BlogModalContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </FullScreenSection>
  );
};

export default ProjectsSection;
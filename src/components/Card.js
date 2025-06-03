import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px' }}>
      <Image
        src={imageSrc}
          alt={title}
          style={{
            borderRadius: '8px',
          }}
      />
      <div style={{padding: '17px'}}>
    <VStack align="start">
      <Heading color="black" size="1">{title}</Heading>
      <Text color="gray" fontSize="15">{description}</Text>
      <Text color="black" fontSize="13">See more <FontAwesomeIcon icon={faArrowRight} size="1x" /></Text>
    </VStack>
    </div>
    </div>
  );
};

export default Card;

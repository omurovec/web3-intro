import { Box, Image, Center } from "@chakra-ui/react";
import logo from "../logo.png";

const ContentContainer = ({ children }) => (
  <Box bg="gray.50" w="100%" h="100%">
    <Image
      src={logo}
      boxShadow="lg"
      borderRadius={200}
      w={400}
      pos="absolute"
      left={5}
      top={5}
    />
    <Center w="100%" h="100%">
      <Center bg="white" boxShadow="lg" borderRadius={16} padding={15}>
        {children}
      </Center>
    </Center>
  </Box>
);

export default ContentContainer;

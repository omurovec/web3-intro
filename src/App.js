import { Heading } from "@chakra-ui/react";
import { ContentContainer } from "./components";

function App() {
  return (
    <ContentContainer>
      <Heading minWidth={400} color="gray.500" textAlign="center">
        Let's Get Started!
      </Heading>
    </ContentContainer>
  );
}

export default App;

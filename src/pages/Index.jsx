import { Box, Container, Flex, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Box bg="white" minH="100vh">
      <Flex
        as="nav"
        bg="gray.100"
        w="100%"
        p={4}
        justifyContent="center"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold">
          Blank Canvas App
        </Text>
      </Flex>
      <Container
        centerContent
        maxW="container.md"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={10}
      >
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to Your Blank Canvas</Text>
          <Text>Start creating your masterpiece.</Text>
          <Link to="/events">
            <Button>Go to Events</Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
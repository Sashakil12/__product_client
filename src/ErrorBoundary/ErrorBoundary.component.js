import React from "react";
import { Text, Flex } from "@chakra-ui/react";
class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <Flex justify="center" mt="2vh">
            <Text size="lg" color="red">
              An error occurred!
            </Text>
          </Flex>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

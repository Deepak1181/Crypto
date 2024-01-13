import React from 'react'
import { Alert, AlertIcon } from "@chakra-ui/react";
const Error = () => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      bottom={""}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={"container.lg"}
    >
      <AlertIcon />
      Error while data is fetching
    </Alert>
  );
}

export default Error
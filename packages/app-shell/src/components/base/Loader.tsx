import * as React from "react";

import axios from "axios";
import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  H1,
  Button,
  PlusIcon,
  Spinner
} from "@bigcommerce/big-design";
import { PropagateLoader } from "react-spinners";

export const Loader: React.FC = () => {
  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex style={{height:"40vh"}} justifyContent="center" alignItems="center">
        <Flex.Item>
          <PropagateLoader color="#3C64F4" />
        </Flex.Item>
      </Flex>
    </Box>
  );
};
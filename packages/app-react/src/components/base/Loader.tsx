import * as React from "react";

import axios from "axios";
import useAxios from "axios-hooks";

import {
  Box,
  Flex
} from "@bigcommerce/big-design";
import { PropagateLoader } from "react-spinners";

export interface LoaderProps {
  height?: string
}

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex style={{ height: props.height }} justifyContent="center" alignItems="center">
        <Flex.Item>
          <PropagateLoader color="#3C64F4" />
        </Flex.Item>
      </Flex>
    </Box>
  );
};
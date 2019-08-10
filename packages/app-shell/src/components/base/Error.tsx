import * as React from "react";

import  image from '../../assets/undraw_server_down_s4lk.svg'

import {
  Box,
  Flex,
  H1
} from "@bigcommerce/big-design";
import { PropagateLoader } from "react-spinners";

interface ErrorProps {
  message: string
}

export const Error: React.FC<ErrorProps> = (props) => {
  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex  justifyContent="center" alignItems="center" direction="column">
        <Flex.Item marginVertical="xxxLarge">
          <img width="50%" style={{marginLeft: '25%', marginRight: '25%'}} src={image} />
        </Flex.Item>

        <Flex.Item  marginVertical="xLarge">
          <H1>{props.message}</H1>
        </Flex.Item>
      </Flex>
    </Box>
  );
};

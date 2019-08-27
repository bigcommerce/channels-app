import * as React from "react";

import { Box, Flex, ProgressCircle } from "@bigcommerce/big-design";

export interface LoaderProps {
  height?: string;
}

export const Loader: React.FC<LoaderProps> = props => {
  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex
        style={{ height: props.height }}
        justifyContent="center"
        alignItems="center"
      >
        <Flex.Item>
          <ProgressCircle size="large" />
        </Flex.Item>
      </Flex>
    </Box>
  );
};

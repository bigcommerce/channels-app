import * as React from "react";

import { Box, Flex, Button } from "@bigcommerce/big-design";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ChannelListHeaderProps {
  createAction: Function
}

export const ChannelListHeader: React.FC<ChannelListHeaderProps> = (props) => {
  return (
    <Box borderBottom="box" margin="none" padding="none">
      <Flex justifyContent="left" backgroundColor="primary20">
        <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
          <Box style={{ lineHeight: "36px" }}>Channel Name</Box>
        </Flex.Item>
        <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
          <Box style={{ lineHeight: "36px" }}>Channel Platform</Box>
        </Flex.Item>
        <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
          <Box style={{ lineHeight: "36px" }}>Channel Type</Box>
        </Flex.Item>
        <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
          <Flex justifyContent="left">
            <Flex.Item margin="none">
              <Box style={{ lineHeight: "36px" }}>External Id</Box>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
          <Flex justifyContent="center">
            <Flex.Item margin="none">
              <Box style={{ lineHeight: "36px" }}>Channel Enabled</Box>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item margin="small" style={{ height: 36, width: "10%" }}>
          <Flex justifyContent="right">
            <Flex.Item margin="none">
              <Button variant="primary" onClick={() => {props.createAction()}}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
};

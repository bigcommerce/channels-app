import * as React from "react";

import axios from "axios";
import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  H1,
  Button,
  PlusIcon
} from "@bigcommerce/big-design";
import { Loader } from "../components/base/Loader";
import { Error } from "../components/base/Error";

import { ChannelList } from "../components/channels/ChannelList";
import { ChannelCreateModal } from "../components/channels/ChannelCreateModal";
import { useContext } from "react";
import { ChannelsContext } from "../components/base/ChannelContext";

export const ChannelListPage: React.FC = () => {

  // TODO Move to API Layer
  const [{ data, loading, error }, refetch] = useAxios({
    url: "https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });

  const channelsContext = useContext(ChannelsContext)
  const [isCreateChannelOpen, setCreateChannelOpen] = React.useState(false);

  const closeCreate = (actionTaken: boolean) => {
    if (actionTaken) {
      refetch()
    }

    setCreateChannelOpen(false);
  };


  React.useEffect(() => {
    refetch()
    channelsContext.clear()
  }, [])

  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item grow={1}>
          <Box marginTop="medium">
            <H1>Channels</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            <Button
              // disabled={loading && !error}
              onClick={() => {
                setCreateChannelOpen(true);
              }}
            >
              <PlusIcon /> Create Channel
                  </Button>
          </Box>
        </Flex.Item>
      </Flex>

      {loading ? <Loader height="40vh"/> : ""}
      {error ? <Error message="Error Fetching Data" /> : ""}
      {data && !loading ? <ChannelList /> : ""}

      <ChannelCreateModal
        isOpen={isCreateChannelOpen}
        closeAction={closeCreate}
      />
    </Box>
  );
};

import * as React from "react";

import { useAsync } from "react-async";

import { Box, Flex, H1, Button } from "@bigcommerce/big-design";
import { AddIcon } from "@bigcommerce/big-design-icons";

import { ChannelsAPI, SitesAPI } from "../api";

import { ChannelList } from "../components/channels/ChannelList";
import { ChannelCreateModal } from "../components/channels/ChannelCreateModal";

export const ChannelListPage: React.FC = () => {
  const { data, error, isLoading, reload } = useAsync({
    promiseFn: ChannelsAPI.fetchAllChannels
  });

  const {
    data: sitesData,
    error: sitesError,
    isLoading: isSitesLoading,
    reload: sitesReload
  } = useAsync({
    promiseFn: SitesAPI.fetchAllSites
  });

  const [isCreateChannelOpen, setCreateChannelOpen] = React.useState(false);

  const closeCreate = (actionTaken: boolean) => {
    if (actionTaken) {
      reload();
      sitesReload();
    }

    setCreateChannelOpen(false);
  };

  return (

    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item flexGrow={1}>
          <Box marginTop="medium">
            <H1>Channels</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            <Button
              disabled={isLoading && !error}
              onClick={() => {
                setCreateChannelOpen(true);
              }}
            >
              <AddIcon /> Create Channel
            </Button>
          </Box>
        </Flex.Item>
      </Flex>

      {data && !isLoading ? (
        sitesData && !isSitesLoading ? (
          <ChannelList
            isChannelsLoading={isLoading}
            isSitesLoading={isSitesLoading}
            channels={data.data}
            sites={sitesData && sitesData.data && sitesData.data.length > 0 ? sitesData.data : []}
          />
        ) : (
          <ChannelList
            isChannelsLoading={isLoading}
            isSitesLoading={isSitesLoading}
            channels={data.data}
            sites={[]}
          />
        )
      ) : (
        <ChannelList
          isChannelsLoading={isLoading}
          isSitesLoading={isSitesLoading}
          channels={[]}
          sites={[]}
        />
      )}

      <ChannelCreateModal
        isOpen={isCreateChannelOpen}
        closeAction={closeCreate}
      />
    </Box>
  );
};

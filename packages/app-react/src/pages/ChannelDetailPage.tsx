import * as React from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import axios from "axios";

import { Box, Flex, H1, H2, Text, Tabs, Panel } from "@bigcommerce/big-design";

import { ChannelList } from "../components/channels/ChannelList";
import { Channel } from "../models/Channel";
import { ChannelDetailView } from "../components/channels/ChannelDetailView";
import { SiteView } from "../components/sites/SiteView";
import { RoutesListView } from "../components/sites/RoutesListView";

import { Site } from "../models/Site";
import { ChannelsContextProvider, ChannelsContext } from "../components/base/ChannelContext";
import { useEffect } from "react";
import useAxios from "axios-hooks";

export interface ChannelDetailPageProps extends RouteComponentProps {
}

export const ChannelDetailPage: React.FC<ChannelDetailPageProps> = props => {
  let channel: Channel = props.location.state.channel;

    // TODO Move to API Layer
  const [{ data, loading, error }, refetch] = useAxios({
    url: `https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels_channel?channel_id=${channel.id}`,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });

  const channelsContext = React.useContext(ChannelsContext)

  React.useMemo(
    () => {
      console.log(JSON.stringify(data))
      if (data) {
        channelsContext.setActiveChannel(data.data)
      }
    },
    [data]
  );

  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex justifyContent="left">
        <Flex.Item flexGrow={1}>
          <Box marginTop="medium">
            <Flex>
              <Flex.Item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <H1>Channels</H1>
                </Link>
              </Flex.Item>
              <Flex.Item marginHorizontal="small">
                {channelsContext.activeChannel ? <H1>/</H1> : ""}
              </Flex.Item>

              <Flex.Item>
                {channelsContext.activeChannel ? <H1>{channelsContext.activeChannel.name}</H1> : ""}
              </Flex.Item>
            </Flex>
          </Box>
        </Flex.Item>
        <Flex.Item />
      </Flex>

      <Box marginTop="large">
        <Panel>

          {data ? <ChannelDetailView /> : ""}
        </Panel>

        {channel.type === "storefront" ?
          <Box>
            <Panel>
              <SiteView channelData={channel} />
            </Panel>
            {/* <Panel>
              <RoutesListView siteData={mockSite} />
            </Panel> */}
          </Box>
          : ""}
      </Box>
    </Box>
  );
};

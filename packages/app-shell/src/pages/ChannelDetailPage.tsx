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

export interface ChannelDetailPageProps extends RouteComponentProps {
  // channel: Channel
}

export const ChannelDetailPage: React.FC<ChannelDetailPageProps> = props => {
  const [activeTab, setActiveTab] = React.useState("channel_details");

  let channel: Channel = props.location.state.channel;

  const mockSite: Site = {
    id: 1,
    url: "https://www.my-awesome-site.com",
    channel_id: 18735,
    created_at: "2019-08-05T18:26:21Z",
    updated_at: "2019-08-05T18:26:21Z"
  };

  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex justifyContent="left">
        <Flex.Item grow={1}>
          <Box marginTop="medium">
            <Flex>
              <Flex.Item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <H1>Channels</H1>
                </Link>
              </Flex.Item>
              <Flex.Item marginHorizontal="small">
                <H1>/</H1>
              </Flex.Item>

              <Flex.Item>
                <H1>{channel.name}</H1>
              </Flex.Item>
            </Flex>
          </Box>
        </Flex.Item>
        <Flex.Item />
      </Flex>

      <Box marginTop="large">
        <Panel>
          <ChannelDetailView channelData={channel} />
        </Panel>
        <Panel>
          <SiteView siteData={mockSite} />
        </Panel>
        <Panel>
          <RoutesListView siteData={mockSite} />
        </Panel>
      </Box>
    </Box>
  );
};

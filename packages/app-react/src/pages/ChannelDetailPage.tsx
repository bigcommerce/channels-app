import * as React from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import { Box, Flex, H1, Panel } from "@bigcommerce/big-design";

import { Channel } from "../models/Channel";

import { ChannelDetailView } from "../components/channels/ChannelDetailView";
import { SiteView } from "../components/sites/SiteView";
import { RoutesListView } from "../components/routes/RoutesListView";
import { useChannelContext } from "../contexts/ChannelContext";

export interface ChannelDetailPageProps extends RouteComponentProps {}

export const ChannelDetailPage: React.FC<ChannelDetailPageProps> = props => {
  let channel: Channel = props.location.state.channel;

  const channelContext = useChannelContext();

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
                {channelContext.channel ? <H1>/</H1> : ""}
              </Flex.Item>

              <Flex.Item>
                <H1>
                  {channelContext.channel ? channelContext.channel.name : ""}
                </H1>
              </Flex.Item>
            </Flex>
          </Box>
        </Flex.Item>
        <Flex.Item />
      </Flex>

      <Box marginTop="large">
        <Panel>
          <ChannelDetailView />
        </Panel>

        {channel.type === "storefront" ? (
          <Box>
            <Panel>
              <SiteView />
            </Panel>
            <Panel>
              <RoutesListView />
            </Panel>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

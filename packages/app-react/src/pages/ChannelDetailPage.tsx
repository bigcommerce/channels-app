import * as React from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import { useAsync } from "react-async";

import { Box, Flex, H1, Panel } from "@bigcommerce/big-design";

import { Channel } from "../models/Channel";
import { Site } from "../models/Site";
import { ChannelsAPI, SitesAPI } from "../api";
import { ChannelDetailView } from "../components/channels/ChannelDetailView";
import { SiteView } from "../components/sites/SiteView";
import { useMemo } from "react";

const fetchChannel = async ({ channelId }: any) => {
  return await ChannelsAPI.fetchChannel(channelId);
};

const fetchSite = async ({ site }: any) => {
  if (site) {
    return await SitesAPI.fetchSite(site.id);
  }

  return Promise.resolve;
};

export interface ChannelDetailPageProps extends RouteComponentProps {}

export const ChannelDetailPage: React.FC<ChannelDetailPageProps> = props => {
  let channel: Channel = props.location.state.channel;
  let site: Site = props.location.state.site;

  const { data, error, isLoading, reload } = useAsync({
    promiseFn: fetchChannel,
    channelId: channel.id
  });

  const {
    data: siteData,
    error: siteError,
    isLoading: isSiteLoading,
    reload: siteReload
  } = useAsync({
    promiseFn: fetchSite,
    deferFn: fetchSite,
    site: site
  });

  useMemo(() => {
    if (channel) {
      reload();
    }
    if (site) {
      siteReload();
    }
  }, [site, channel]);

  const channelSave = (actionTaken: boolean) => {
    if (actionTaken) {
      reload();
    }
  };

  const siteSave = (actionTaken: boolean) => {
    if (actionTaken) {
      siteReload();
    }
  };

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
                {channel ? <H1>/</H1> : ""}
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
          {isLoading ? (
            <ChannelDetailView
              channel={data}
              isLoading={isLoading}
              saveAction={channelSave}
            />
          ) : (
            <ChannelDetailView
              channel={data.data}
              isLoading={isLoading}
              saveAction={channelSave}
            />
          )}
        </Panel>

        {channel.type === "storefront" ? (
          <Box>
            <Panel>
              {isSiteLoading ? (
                <SiteView
                  site={siteData}
                  isLoading={isSiteLoading}
                  saveAction={siteSave}
                />
              ) : (
                <SiteView
                  site={siteData.data}
                  isLoading={isSiteLoading}
                  saveAction={siteSave}
                />
              )}
            </Panel>
            {/* <Panel>
      <RoutesListView siteData={mockSite} />
    </Panel> */}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

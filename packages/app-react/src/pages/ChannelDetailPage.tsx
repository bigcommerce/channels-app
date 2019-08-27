import * as React from "react";

import { Link, RouteComponentProps } from "react-router-dom";

import { useAsync } from "react-async";

import { Box, Flex, H1, Panel } from "@bigcommerce/big-design";

import { Channel } from "../models/Channel";
import { Site } from "../models/Site";

import { ChannelsAPI, SitesAPI, RoutesAPI } from "../api";
import { ChannelDetailView } from "../components/channels/ChannelDetailView";
import { SiteView } from "../components/sites/SiteView";
import { useMemo } from "react";
import { RoutesListView } from "../components/routes/RoutesListView";
import { useChannelContext } from "../contexts/ChannelContext";

const fetchChannel = async ({ channelId }: any) => {
  return await ChannelsAPI.fetchChannel(channelId);
};

const fetchSite = async ({ site, channel }: any) => {
  console.log("Bang");
  if (site) {
    return await SitesAPI.fetchSite(site.id);
  } else if (channel) {
    console.log("Bang Bang");

    return await SitesAPI.fetchSiteForChannel(channel.id);
  }

  return Promise.resolve;
};

const fetchRoutes = async ({ site }: any) => {
  if (site) {
    return await RoutesAPI.fetchAllRoutes(site.id);
  }

  return Promise.resolve;
};

export interface ChannelDetailPageProps extends RouteComponentProps {}

export const ChannelDetailPage: React.FC<ChannelDetailPageProps> = props => {
  let channel: Channel = props.location.state.channel;

  const channelContext = useChannelContext();

  // const { data, error, isLoading, reload } = useAsync({
  //   promiseFn: fetchChannel,
  //   channelId: channel.id
  // });

  // const {
  //   data: siteData,
  //   error: siteError,
  //   isLoading: isSiteLoading,
  //   reload: siteReload
  // } = useAsync({
  //   promiseFn: fetchSite,
  //   deferFn: fetchSite,
  //   site: site,
  //   channel: channel
  // });

  // const {
  //   data: routesData,
  //   error: routesError,
  //   isLoading: isRoutesLoading,
  //   reload: routesReload
  // } = useAsync({
  //   promiseFn: fetchRoutes,
  //   deferFn: fetchRoutes,
  //   site: site
  // });

  // useMemo(() => {
  //   if (channel) {
  //     reload();
  //   }
  //   if (site) {
  //     siteReload();
  //   }
  // }, [site, channel]);

  const siteSave = (actionTaken: boolean) => {
    if (actionTaken) {
      console.log("asdfasdf");
      // siteReload();
    }
  };

  const routeSave = (actionTaken: boolean) => {
    if (actionTaken) {
      // routesReload();
    }
  };

  const routeDelete = (siteId: number, routeId: number) => {
    RoutesAPI.deleteRoute(siteId, routeId);
    // routesReload();
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
              <SiteView saveAction={siteSave} />
            </Panel>
            <Panel>
              <RoutesListView />
            </Panel>
          </Box>
        ) : (
          ""
        )}

        {/* {JSON.stringify(isSiteLoading)} */}
        {/* {channel.type === "storefront" ? (
          <Box>
            <Panel>
              {isSiteLoading ? (
                <SiteView saveAction={siteSave} />
              ) : (
                <SiteView saveAction={siteSave} />
              )}
            </Panel>

            {!isSiteLoading &&
            siteData &&
            siteData.data &&
            Object.entries(siteData.data).length !== 0 &&
            siteData.constructor === Object ? (
              <Panel>
                {!isRoutesLoading && routesData ? (
                  <Box>
                    <RoutesListView
                      siteId={siteData.data.id}
                      routes={routesData.data}
                      isLoading={isRoutesLoading}
                      saveAction={routeSave}
                      deleteAction={routeDelete}
                    />
                  </Box>
                ) : (
                  <RoutesListView
                    siteId={-1}
                    routes={[]}
                    isLoading={isRoutesLoading}
                    saveAction={routeSave}
                    deleteAction={routeDelete}
                  />
                )}
              </Panel>
            ) : (
              ""
            )}
          </Box>
        ) : (
          ""
        )} */}
      </Box>
    </Box>
  );
};

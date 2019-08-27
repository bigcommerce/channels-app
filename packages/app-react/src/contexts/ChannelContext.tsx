import React, { useState, useContext, createContext, useMemo } from "react";

import { Channel } from "../models/Channel";
import { Site } from "../models/Site";
import { Route } from "../models/Route";

import { ChannelsAPI, SitesAPI, RoutesAPI } from "../api";

const noop = () => {};

interface ChannelState {
  channel: undefined | Channel;
  site: undefined | Site;
  routes: undefined | Array<Route>;

  isChannelLoading: boolean;
  isSiteLoading: boolean;
  isRoutesLoading: boolean;

  fetchData: Function;
  fetchChannel: Function;
  fetchSite: Function;
  reloadRoutes: Function;

  createRoute: Function;

  updateChannel: Function;
  updateSite: Function;

  deleteSite: Function;
  deleteRoute: Function;
}

const ChannelContext = createContext<ChannelState>({
  channel: undefined,
  site: undefined,
  routes: undefined,

  isChannelLoading: false,
  isSiteLoading: false,
  isRoutesLoading: false,

  fetchData: noop,
  fetchChannel: noop,
  fetchSite: noop,
  reloadRoutes: noop,

  createRoute: noop,

  updateChannel: noop,
  updateSite: noop,

  deleteSite: noop,
  deleteRoute: noop
});

export const ChannelProvider = (props: any) => {
  const [channel, setChannel] = useState<Channel>();
  const [site, setSite] = useState<Site>();
  const [routes, setRoutes] = useState<Array<Route>>();

  const [isChannelLoading, setIsChannelLoading] = useState(false);
  const [isSiteLoading, setIsSiteLoading] = useState(false);
  const [isRoutesLoading, setIsRoutesLoading] = useState(false);

  const state = useMemo<ChannelState>(() => {
    return {
      channel: channel,
      site: site,
      routes: routes,

      isChannelLoading: isChannelLoading,
      isSiteLoading: isSiteLoading,
      isRoutesLoading: isRoutesLoading,

      fetchData: async (channelId: number) => {
        setIsChannelLoading(true);
        setIsSiteLoading(true);
        setIsRoutesLoading(true);

        const channelData = await ChannelsAPI.fetchChannel(channelId);

        setChannel(channelData.data);

        setIsChannelLoading(false);

        // TODO make platform constant
        if (channelData.data && channelData.data.type === "storefront") {
          const siteData = await SitesAPI.fetchSiteForChannel(
            channelData.data.id
          );

          setSite(siteData.data);

          setIsSiteLoading(false);

          if (siteData.data) {
            const routesData = await RoutesAPI.fetchAllRoutes(siteData.data.id);

            setRoutes(routesData.data);
          }

          setIsRoutesLoading(false);
        } else {
          setIsSiteLoading(false);
          setIsRoutesLoading(false);
        }
      },

      fetchChannel: async (channelId: number) => {
        setIsChannelLoading(true);

        const data = await ChannelsAPI.fetchChannel(channelId);

        setChannel(data.data);

        setIsChannelLoading(false);
      },

      fetchSite: async (siteId: number) => {
        setIsSiteLoading(true);

        const data = await SitesAPI.fetchSite(siteId);

        setSite(data.data);

        setIsSiteLoading(false);
      },

      reloadRoutes: async () => {
        if (state.site) {
          setIsRoutesLoading(true);

          const routesData = await RoutesAPI.fetchAllRoutes(state.site.id);

          setRoutes(routesData.data);

          setIsRoutesLoading(false);
        }
      },

      createRoute: async (type: string, matching: string, route: string) => {
        if (state.site) {
          setIsRoutesLoading(true);

          await RoutesAPI.createRoute(state.site.id, type, matching, route);

          const routesData = await RoutesAPI.fetchAllRoutes(state.site.id);

          setRoutes(routesData.data);
        }

        setIsRoutesLoading(false);
      },

      updateChannel: async (
        name: string,
        externalId: string,
        enabled: boolean
      ) => {
        if (state.channel) {
          setIsChannelLoading(true);

          await ChannelsAPI.updateChannel(
            state.channel.id,
            name,
            externalId,
            enabled
          );
          await state.fetchChannel(state.channel.id);
        }

        setIsChannelLoading(false);
      },

      updateSite: async (url: string) => {
        if (state.site) {
          setIsSiteLoading(true);

          await SitesAPI.updateSite(state.site.id, url);

          await state.fetchSite(state.site.id);
        }

        setIsSiteLoading(false);
      },

      deleteSite: async () => {
        if (state.routes && state.site) {
          setIsSiteLoading(true);

          await SitesAPI.deleteSite(state.site.id);

          setSite(undefined);

          setIsSiteLoading(false);
        }
      },

      deleteRoute: async (routeId: number) => {
        if (state.routes && state.site) {
          setIsRoutesLoading(true);

          await RoutesAPI.deleteRoute(state.site.id, routeId);

          await state.reloadRoutes();

          setIsRoutesLoading(false);
        }
      }
    };
  }, [channel, isChannelLoading, site, isSiteLoading, routes, isRoutesLoading]);

  return <ChannelContext.Provider value={state} {...props} />;
};

export const useChannelContext = () => useContext(ChannelContext);

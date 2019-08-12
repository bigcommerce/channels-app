import * as React from 'react';

import { Channel } from '../../models/Channel';
import Axios from 'axios';
import { Site } from '../../models/Site';

export interface ChannelsContextInterface {
  activeChannel?: Channel,
  activeSite?: Site,
  setActiveChannel: Function,
  setActiveSite: Function,
  updateChannel: Function,
  fetchChannel: Function,
  updateSite: Function,
  clear: Function

  channelLoading: boolean
  siteLoading: boolean
}

export interface ChannelsContextProps {
  children: React.ReactNode
}

export interface ChannelsContextState {
  activeChannel?: Channel,
  activeSite?: Site,
  setActiveChannel: Function,
  setActiveSite: Function,
  updateChannel: Function
}

const noop = () => { };

export const ChannelsContext = React.createContext<ChannelsContextInterface>({
  setActiveChannel: noop,
  setActiveSite: noop,
  updateChannel: noop,
  fetchChannel: noop,
  updateSite: noop,
  clear: noop,

  channelLoading: false,
  siteLoading: false
});

export const ChannelsContextConsumer = ChannelsContext.Consumer;

export const ChannelsContextProvider: React.FC = (props) => {

  const [activeChannel, setActiveChannel] = React.useState<Channel>();
  const [activeSite, setActiveSite] = React.useState<Site>();
  const [siteLoading, setSiteLoading] = React.useState(true);
  const [channelLoading, setChannelLoading] = React.useState(true);

  const state: ChannelsContextInterface = {
    activeChannel: activeChannel,
    activeSite: activeSite,
    siteLoading: siteLoading,
    channelLoading: channelLoading,
    setActiveChannel: async (e: Channel) => {
      setChannelLoading(true)
      await setActiveChannel(e)
      setChannelLoading(false)


      if (activeChannel) {
        setSiteLoading(true)

          // TODO Move to API Layer
        const s = await Axios({
          url: `https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels_site?channel_id=${activeChannel.id}`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        });

        setActiveSite(s.data.data)

        setSiteLoading(false)
      }
    },

    updateChannel: async (name: string, externalId: string, channelId: number, isEnabled: boolean) => {
      setChannelLoading(true)

      // TODO Move to API Layer
      const d = await Axios({
        url: "https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels_channel/",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        method: "PUT",
        data: {
          channel_name: name,
          external_id: externalId,
          channel_id: channelId,
          is_enabled: isEnabled
        }
      });

      console.log(d.data.data)

      setActiveChannel(d.data.data)

      setChannelLoading(false)


      if (activeChannel) {
        setSiteLoading(true)
        // TODO Move to API Layer
        const s = await Axios({
          url: `https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels_site?channel_id=${activeChannel.id}`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        });

        setActiveSite(s.data.data)

        setSiteLoading(false)

      }
    },
    fetchChannel: async (channelId: string) => {
      setSiteLoading(true)
      // TODO Move to API Layer
      const c = await Axios({
        url: `https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels_site?channel_id=${channelId}`,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });

      setActiveSite(c.data.data)

      setSiteLoading(false)
    },
    updateSite: async (channelId: number, url: string) => {
      setSiteLoading(true)
      // TODO Move to API Layer
      const s = await Axios({
        url: `https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels_site?channel_id=${channelId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        method: "PUT",
        data: {
          url: url,

        }
      });

      setActiveSite(s.data.data)
      setSiteLoading(false)
    },
    setActiveSite: (s: Site) => { setActiveSite(s) },
    clear: () => {
      setActiveChannel(undefined)
      setActiveSite(undefined)
    }
  }

  return <ChannelsContext.Provider value={state}>{props.children}</ChannelsContext.Provider>
}

import * as React from "react";

import {
  Box,
  Flex,
  Panel,
  H2,
  Button,
  Badge,
  Link
} from "@bigcommerce/big-design";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { OpenInNewIcon } from "@bigcommerce/big-design-icons";

import { Channel } from "../../models/Channel";

import logo from "../../assets/Storefront.svg";
import { Link as RouterLink } from "react-router-dom";

import { Loader } from "../base/Loader";
import { Site } from "../../models/Site";
import { useChannelContext } from "../../contexts/ChannelContext";

interface ChannelListProperties {
  channels: Array<Channel>;
  isChannelsLoading: boolean;

  sites: Array<Site>;
  isSitesLoading: boolean;
}
export const ChannelList: React.FC<ChannelListProperties> = props => {
  const channelContext = useChannelContext();

  const filterByType = (list: Array<Channel>, type: string): Array<Channel> => {
    return list.reduce((accum: Array<Channel>, ele: Channel) => {
      if (ele.type === type) {
        accum.push(ele);
      }
      return accum;
    }, []);
  };

  const renderSiteUrl = (channelId: number) => {
    const site = props.sites.find(ele => {
      return ele.channel_id === channelId;
    });

    return site ? (
      <Link href={site.url} target="_blank">
        {site.url} <OpenInNewIcon />
      </Link>
    ) : (
      ""
    );
  };

  const renderChannelList = (channelList: Array<Channel>) => {
    return channelList.map((channel: Channel) => {
      return (
        <Box
          key={channel.id}
          borderBottom="box"
          borderLeft="none"
          borderRight="none"
          backgroundColor="white"
        >
          <Flex justifyContent="center" alignItems="center">
            <Flex.Item margin="small">
              <img height="24" src={logo} alt="Storefront Channel Logo Image" />
            </Flex.Item>
            <Flex.Item
              margin="small"
              style={{ minWidth: "224px" }}
              flexGrow={channel.type === "storefront" ? 0 : 1}
            >
              <Box style={{ lineHeight: "36px" }}>{channel.name}</Box>{" "}
            </Flex.Item>

            {channel.type === "storefront" ? (
              <Flex.Item margin="small" flexGrow={1}>
                {props.isSitesLoading ? "Loading" : renderSiteUrl(channel.id)}
              </Flex.Item>
            ) : (
              ""
            )}

            <Flex.Item marginHorizontal="medium">
              {channel.is_enabled ? (
                <Badge variant="success">Active</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </Flex.Item>

            <Flex.Item marginHorizontal="large">
              <RouterLink
                onClick={() => channelContext.fetchData(channel.id)}
                to={{
                  pathname: "/channel/",
                  state: {
                    channel: channel,
                    site: props.sites.find(ele => {
                      return ele.channel_id === channel.id;
                    })
                  }
                }}
              >
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </RouterLink>
            </Flex.Item>
          </Flex>
        </Box>
      );
    });
  };

  return (
    <Box marginVertical="xxxLarge" marginHorizontal="none">
      <Panel>
        <Flex justifyContent="space-between">
          <H2>Storefronts</H2>
        </Flex>
        {props.isChannelsLoading ? <Loader height="50px" /> : ""}
        {/* {error ? <Error message="Error Fetching Data" /> : ""} */}
        {props.channels && !props.isChannelsLoading
          ? renderChannelList(filterByType(props.channels, "storefront"))
          : ""}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Marketplaces</H2>
        </Flex>
        {props.isChannelsLoading ? <Loader height="50px" /> : ""}
        {/* {error ? <Error message="Error Fetching Data" /> : ""} */}
        {props.channels && !props.isChannelsLoading
          ? renderChannelList(filterByType(props.channels, "marketplace"))
          : ""}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Point of Sale (POS)</H2>
        </Flex>
        {/* {error ? <Error message="Error Fetching Data" /> : ""} */}
        {props.channels && !props.isChannelsLoading
          ? renderChannelList(filterByType(props.channels, "pos"))
          : ""}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Marketing</H2>
        </Flex>
        {props.isChannelsLoading ? <Loader height="50px" /> : ""}
        {/* {error ? <Error message="Error Fetching Data" /> : ""} */}
        {props.channels && !props.isChannelsLoading
          ? renderChannelList(filterByType(props.channels, "marketing"))
          : ""}
      </Panel>
    </Box>
  );
};

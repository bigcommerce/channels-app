import * as React from "react";

import { Box, Flex, Panel, H2, Button, Badge } from "@bigcommerce/big-design";

import useAxios from "axios-hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { Channel } from "../../models/Channel";

import logo from "../../assets/Storefront.svg";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { ChannelsContext } from "../base/ChannelContext";
import { useContext } from "react";

import { Error } from "../../components/base/Error";
import { Loader } from "../base/Loader";


interface ChannelListProperties {

}
export const ChannelList: React.FC<ChannelListProperties> = props => {
  // const [{ data: siteData, loading: siteLoading, error: siteError }, siteRefetch] = useAxios({
  //   url: "https://channelsapp.ngrok.io/.netlify/functions/bigcommerce_sites/",
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Content-Type": "application/json"
  //   }
  // });

  const [{ data, loading, error }, refetch] = useAxios({
    url: "https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });

  const filterByType = (list: Array<Channel>, type: string): Array<Channel> => {
    return list.reduce((accum: Array<Channel>, ele: Channel) => {
      if (ele.type === type) {
        accum.push(ele);
      }
      return accum;
    }, []);
  };

  const channelsContext = useContext(ChannelsContext)

  const preload = (c: Channel) => {
    channelsContext.fetchChannel(c.id)
  }

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
            <Flex.Item margin="small" style={{ minWidth: "200px" }} flexGrow={channel.type === "storefront" ? 0 : 1}>
              <Box style={{ lineHeight: "36px" }}>{channel.name}</Box>{" "}
            </Flex.Item>

            {channel.type === "storefront" ? <Flex.Item margin="small" flexGrow={1}>
              {/* {siteLoading ? <Loader size={10} color="#3C64F4" />
                : ""}
              {siteData ? <Loader size={10} color="#3C64F4" />
                : ""} */}
            </Flex.Item> : ""}

            <Flex.Item marginHorizontal="medium">
              {channel.is_enabled ? (
                <Badge variant="success">Active</Badge>
              ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
            </Flex.Item>

            <Flex.Item marginHorizontal="large">
                <Link onClick={() => {preload(channel)}} to={{ pathname: "/channel/", state: { channel: channel } }}>
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </Link>
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
        {loading ? <Loader height="50px" /> : ""}
        {error ? <Error message="Error Fetching Data" /> : ""}
        {data && !loading ? renderChannelList(filterByType(data.data, "storefront")) : ""}

      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Marketplaces</H2>
        </Flex>
        {loading ? <Loader height="50px" /> : ""}
        {error ? <Error message="Error Fetching Data" /> : ""}
        {data && !loading ? renderChannelList(filterByType(data.data, "marketplace")) : ""}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Point of Sale (POS)</H2>
        </Flex>
        {error ? <Error message="Error Fetching Data" /> : ""}
        {data && !loading ? renderChannelList(filterByType(data.data, "pos")) : ""}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Marketing</H2>
        </Flex>
        {loading ? <Loader height="50px" /> : ""}
        {error ? <Error message="Error Fetching Data" /> : ""}
        {data && !loading ? renderChannelList(filterByType(data.data, "marketing")) : ""}
      </Panel>
    </Box>
  );
};

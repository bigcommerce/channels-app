import * as React from "react";

import axios from "axios";
import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  H1,
  Button,
  PlusIcon
} from "@bigcommerce/big-design";
import { Loader } from "../components/base/Loader";
import { Error } from "../components/base/Error";

import { ChannelList } from "../components/channels/ChannelList";
import { Channel } from "../models/Channel";
import { ChannelEditModal } from "../components/channels/ChannelEditModal";
import { ChannelCreateModal } from "../components/channels/ChannelCreateModal";

export const ChannelListPage: React.FC = () => {
  const [{ data, loading, error }, refetch] = useAxios({
    url: "https://sampleapp.ngrok.io/bigcommerce/channels/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });

  const [isCreateChannelOpen, setCreateChannelOpen] = React.useState(false);

  const openCreate = (channel: Channel) => {
    setCreateChannelOpen(true);
  };

  const closeCreate = () => {
    setCreateChannelOpen(false);
  };

  var mock = [
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9462,
      is_enabled: false,
      name: "Cats US",
      platform: "wordpress",
      type: "storefront"
    },
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9463,
      is_enabled: false,
      name: "Dogs US",
      platform: "wordpress",
      type: "storefront"
    },
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9464,
      is_enabled: false,
      name: "Amazon NA",
      platform: "amazon",
      type: "marketplace"
    },
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9465,
      is_enabled: false,
      name: "Facebook",
      platform: "facebook",
      type: "marketplace"
    },
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9466,
      is_enabled: false,
      name: "Square",
      platform: "square",
      type: "pos"
    },
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9467,
      is_enabled: true,
      name: "Clover",
      platform: "clover",
      type: "pos"
    },
    {
      date_created: "2018-11-14T03:38:13Z",
      date_modified: "2019-04-11T16:18:53Z",
      external_id: "",
      id: 9468,
      is_enabled: false,
      name: "Facebook",
      platform: "facebook",
      type: "marketing"
    }
  ];

  return (
    <Box marginVertical="xxLarge" marginHorizontal="xxxLarge">
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item grow={1}>
          <Box marginTop="medium">
            <H1>Channels</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            <Button
              // disabled={loading && !error}
              onClick={() => {
                setCreateChannelOpen(true);
              }}
            >
              <PlusIcon /> Create Channel
            </Button>
          </Box>
        </Flex.Item>
      </Flex>

      {/* {loading ? <Loader /> : ""}
      {error ? <Error message="Error Fetching Data" /> : ""}

      {data ? <ChannelList channels={data.data} /> : ""} */}
      <ChannelList channels={mock} />
      <ChannelCreateModal
        isOpen={isCreateChannelOpen}
        closeAction={closeCreate}
      />
    </Box>
  );
};

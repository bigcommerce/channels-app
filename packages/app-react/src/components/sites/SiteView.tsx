import * as React from "react";

import axios from "axios";
import useAxios from "axios-hooks";

import {
  Box,
  Flex,
  H1,
  Button,
  PlusIcon,
  Panel,
  H2,
  H4,
  Form,
  Input
} from "@bigcommerce/big-design";

import { Site } from "../../models/Site";

import { Loader } from "../../components/base/Loader";
import { Error } from "../../components/base/Error";
import { Channel } from "../../models/Channel";
import { useContext } from "react";
import { ChannelsContext } from "../base/ChannelContext";
import { useEffect } from "react";

interface SiteViewProps {
  channelData: Channel;
}

export const SiteView: React.FC<SiteViewProps> = props => {

  const channelsContext = React.useContext(ChannelsContext)

  const [editEnabled, setEditEnabled] = React.useState(false);

  const [url, setUrl] = React.useState();

  const enableEdit = () => {
    setEditEnabled(true)
  }

  const cancelEdit = () => {
    setEditEnabled(false)
  }

  const saveEdit = async () => {
    try {
      if (channelsContext.activeChannel) {
        channelsContext.updateSite(
          channelsContext.activeChannel.id,
          url
        )
      }

      setEditEnabled(false)

    } catch (err) {
      console.log(err);
      setEditEnabled(false)
    }
  }

  useEffect(() => {
    if (channelsContext.activeSite && !editEnabled) {
      setUrl(channelsContext.activeSite.url)
    }
  });


  React.useMemo(
    () => {
      if (channelsContext.activeSite) {
        setUrl(channelsContext.activeSite.url)
      }
    },
    [channelsContext.activeChannel]
  );

  return (
    <Box>
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item grow={1}>
          <Box marginTop="medium">
            <H1>Site</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            {!channelsContext.activeSite ? <Button variant="secondary">Create</Button> :
              editEnabled ? <Box>
                <Button margin="small" variant="secondary" onClick={cancelEdit}>Cancel</Button>
                <Button onClick={saveEdit}>Save</Button></Box> : <Button variant="secondary" onClick={enableEdit}>Edit</Button>}
          </Box>
        </Flex.Item>
      </Flex>

      {channelsContext.siteLoading ? <Loader height="150px" /> : ""}

      {channelsContext.activeSite && !channelsContext.siteLoading ?
        <Form>
          <Form.Fieldset>
            <Form.Row>
              <Input label="Site Id" value={channelsContext.activeSite.id} disabled />
              <Input label="Channel Id" value={channelsContext.activeSite.channel_id} disabled />
            </Form.Row>
            <Form.Row>
              <Input label="URL/Domain" value={url} onChange={e => setUrl(e.target.value)} disabled={!editEnabled} />
            </Form.Row>
            <Form.Row>
              <Input label="Created At" value={channelsContext.activeSite.created_at} disabled />
              <Input label="Modified At" value={channelsContext.activeSite.updated_at} disabled />
            </Form.Row>
          </Form.Fieldset>
        </Form>
        : ""}
    </Box>
  );
};
import * as React from "react";

import axios from "axios";
import useAxios from "axios-hooks";

import {
  Modal,
  Button,
  Form,
  Input,
  Box,
  Panel,
  Flex,
  H2,
  H1,
  PlusIcon,
  Checkbox
} from "@bigcommerce/big-design";

import { Loader } from "../../components/base/Loader";
import { Error } from "../../components/base/Error";


import { Channel } from "../../models/Channel";
import { useEffect } from "react";
import { useContext } from "react";
import { ChannelsContext } from "../base/ChannelContext";

interface ChannelDetailViewProps {
  // channelData: Channel;
  // refetch: Function
}

export const ChannelDetailView: React.FC<ChannelDetailViewProps> = props => {

  const channelsContext = React.useContext(ChannelsContext)

  const [editEnabled, setEditEnabled] = React.useState(false);

  const [enabled, setEnabled] = React.useState();
  const [name, setName] = React.useState();
  const [externalId, setExternalId] = React.useState();

  useEffect(() => {
    if (channelsContext.activeChannel && !editEnabled) {
      setEnabled(channelsContext.activeChannel.is_enabled)
      setName(channelsContext.activeChannel.name)
      setExternalId(channelsContext.activeChannel.external_id)
    }
  });


  React.useMemo(
    () => {
      if (channelsContext.activeChannel) {
        setEnabled(channelsContext.activeChannel.is_enabled)
        setName(channelsContext.activeChannel.name)
        setExternalId(channelsContext.activeChannel.external_id)
      }
    },
    [channelsContext.activeChannel]
  );

  const enableEdit = () => {
    setEditEnabled(true)
  }

  const cancelEdit = () => {
    if (channelsContext.activeChannel) {
      setEnabled(channelsContext.activeChannel.is_enabled)
      setName(channelsContext.activeChannel.name)
      setExternalId(channelsContext.activeChannel.external_id)
    }

    setEditEnabled(false)
  }

  const saveEdit = async () => {
    try {
      if (channelsContext.activeChannel) {
        channelsContext.updateChannel(
          name,
          externalId,
          channelsContext.activeChannel.id,
          enabled
        )
      }

      setEditEnabled(false)

    } catch (err) {
      console.log(err);
      setEditEnabled(false)
    }
  }


  return (
    <Box>
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item grow={1}>
          <Box marginTop="medium">
            <H1>Channels</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            {editEnabled ? <Box>
              <Button margin="small" variant="secondary" onClick={cancelEdit}>Cancel</Button>
              <Button onClick={saveEdit}>Save</Button></Box> :
              <Button variant="secondary" onClick={enableEdit}>Edit</Button>}
          </Box>
        </Flex.Item>
      </Flex>

      {channelsContext.channelLoading ? <Loader height="250px" /> : ""}
      {channelsContext.activeChannel && !channelsContext.channelLoading ?
        <Form>
          <Form.Fieldset>
            <Form.Row>
              <Input
                label="Channel Name"
                disabled={!editEnabled}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Row>
            <Form.Row>
              <Input
                label="Channel Platform"
                value={channelsContext.activeChannel.platform}
                disabled
              />
            </Form.Row>
            <Form.Row>
              <Input
                label="Channel Type"
                value={channelsContext.activeChannel.type}
                disabled
              />
            </Form.Row>
            <Form.Row>
              <Input label="Channel Id" value={channelsContext.activeChannel.id} disabled />
              <Input
                label="External Id"
                value={externalId}
                onChange={e => setExternalId(e.target.value)}
                disabled={!editEnabled}
              />
              <Form.Fieldset legend="Status">
                <Form.Row>
                  <Checkbox
                    label="Enabled"
                    checked={enabled}
                    onChange={_ => {
                      if (editEnabled) setEnabled(!enabled)
                    }}
                  />
                </Form.Row>
              </Form.Fieldset>
            </Form.Row>

            <Form.Row>

              <Input
                label="Created At"
                value={channelsContext.activeChannel.date_created}
                disabled
              />
              <Input
                label="Modified At"
                value={channelsContext.activeChannel.date_modified}
                disabled
              />
            </Form.Row>

            <Form.Row />
          </Form.Fieldset>
        </Form>
        : ""}
    </Box>
  );
};

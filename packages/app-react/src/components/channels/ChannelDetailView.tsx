import * as React from "react";

import {
  Button,
  Form,
  Input,
  Box,
  Flex,
  H1,
  Checkbox
} from "@bigcommerce/big-design";

import { Loader } from "../../components/base/Loader";

import { Channel } from "../../models/Channel";
import { ChannelsAPI } from "../../api";
import { useMemo } from "react";

interface ChannelDetailViewProps {
  channel: Channel;
  isLoading: boolean;
  saveAction: Function;
}

export const ChannelDetailView: React.FC<ChannelDetailViewProps> = props => {
  const [editEnabled, setEditEnabled] = React.useState(false);

  const [enabled, setEnabled] = React.useState();
  const [name, setName] = React.useState();
  const [externalId, setExternalId] = React.useState();

  useMemo(() => {
    if (props.channel) {
      setEnabled(props.channel.is_enabled);
      setName(props.channel.name);
      setExternalId(props.channel.external_id);
    }
  }, [props.channel]);

  const enableEdit = () => {
    setEditEnabled(true);
  };

  const cancelEdit = () => {
    setEnabled(props.channel.is_enabled);
    setName(props.channel.name);
    setExternalId(props.channel.external_id);

    setEditEnabled(false);
  };

  const saveEdit = async () => {
    try {
      await ChannelsAPI.updateChannel(
        props.channel.id,
        name,
        externalId,
        enabled
      );

      props.saveAction(true);

      setEditEnabled(false);
    } catch (err) {
      console.log(err);
      setEditEnabled(false);
    }
  };

  return (
    <Box>
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item flexGrow={1}>
          <Box marginTop="medium">
            <H1>Channel Details</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            {editEnabled ? (
              <Box>
                <Button margin="small" variant="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button onClick={saveEdit}>Save</Button>
              </Box>
            ) : (
              <Button variant="secondary" onClick={enableEdit}>
                Edit
              </Button>
            )}
          </Box>
        </Flex.Item>
      </Flex>

      {props.isLoading ? <Loader height="250px" /> : ""}
      {!props.isLoading && props.channel ? (
        <Form>
          <Form.Fieldset>
            <Form.Group>
              <Input
                label="Channel Name"
                disabled={!editEnabled}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Input
                label="Channel Platform"
                value={props.channel.platform}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Input label="Channel Type" value={props.channel.type} disabled />
            </Form.Group>
            <Form.Group>
              <Input label="Channel Id" value={props.channel.id} disabled />
              <Input
                label="External Id"
                value={externalId}
                onChange={e => setExternalId(e.target.value)}
                disabled={!editEnabled}
              />
              <Form.Fieldset legend="Status">
                <Form.Group>
                  <Checkbox
                    label="Enabled"
                    checked={enabled}
                    onChange={_ => {
                      if (editEnabled) setEnabled(!enabled);
                    }}
                  />
                </Form.Group>
              </Form.Fieldset>
            </Form.Group>

            <Form.Group>
              <Input
                label="Created At"
                value={props.channel.date_created}
                disabled
              />
              <Input
                label="Modified At"
                value={props.channel.date_modified}
                disabled
              />
            </Form.Group>

            <Form.Group />
          </Form.Fieldset>
        </Form>
      ) : (
        ""
      )}
    </Box>
  );
};

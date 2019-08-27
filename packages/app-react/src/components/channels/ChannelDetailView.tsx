import * as React from "react";

import {
  Button,
  Form,
  Input,
  Box,
  Flex,
  H1,
  Checkbox,
  ProgressCircle
} from "@bigcommerce/big-design";

import { Loader } from "../../components/base/Loader";

import { useChannelContext } from "../../contexts/ChannelContext";

import { useMemo } from "react";

export const ChannelDetailView: React.FC = () => {
  const [editEnabled, setEditEnabled] = React.useState(false);

  const [enabled, setEnabled] = React.useState();
  const [name, setName] = React.useState();
  const [externalId, setExternalId] = React.useState();

  const channelContext = useChannelContext();

  useMemo(() => {
    if (channelContext.channel) {
      setEnabled(channelContext.channel.is_enabled);
      setName(channelContext.channel.name);
      setExternalId(channelContext.channel.external_id);
    }
  }, [channelContext.channel]);

  const enableEdit = () => {
    setEditEnabled(true);
  };

  const cancelEdit = () => {
    if (channelContext.channel) {
      setEnabled(channelContext.channel.is_enabled);
      setName(channelContext.channel.name);
      setExternalId(channelContext.channel.external_id);
    }

    setEditEnabled(false);
  };

  const saveEdit = async () => {
    try {
      await channelContext.updateChannel(name, externalId, enabled);

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
                {!channelContext.isChannelLoading ? (
                  <Button
                    margin="small"
                    variant="secondary"
                    onClick={cancelEdit}
                    disabled={channelContext.isChannelLoading}
                  >
                    Cancel
                  </Button>
                ) : (
                  ""
                )}
                <Button onClick={saveEdit}>
                  {channelContext.isChannelLoading ? (
                    <ProgressCircle size={"xSmall"} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Box>
            ) : (
              <Button variant="secondary" onClick={enableEdit}>
                Edit
              </Button>
            )}
          </Box>
        </Flex.Item>
      </Flex>
      {channelContext.isChannelLoading ? <Loader height="250px" /> : ""}
      {!channelContext.isChannelLoading && channelContext.channel ? (
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
                value={channelContext.channel.platform}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Input
                label="Channel Type"
                value={channelContext.channel.type}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Input
                label="Channel Id"
                value={channelContext.channel.id}
                disabled
              />
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
                value={channelContext.channel.date_created}
                disabled
              />
              <Input
                label="Modified At"
                value={channelContext.channel.date_modified}
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

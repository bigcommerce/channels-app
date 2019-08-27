import * as React from "react";

import { useMemo } from "react";

import {
  Box,
  Flex,
  H1,
  Link,
  Text,
  Button,
  Form,
  Input,
  ProgressCircle,
  Dropdown
} from "@bigcommerce/big-design";

import { Loader } from "../../components/base/Loader";
import { Site } from "../../models/Site";
import { SitesAPI } from "../../api";

import { SiteCreateModal } from "./SiteCreateModal";
import { SiteDeleteModal } from "./SiteDeleteModal";

import { useChannelContext } from "../../contexts/ChannelContext";
import { MoreHorizIcon } from "@bigcommerce/big-design-icons";

interface SiteViewProps {
  saveAction: Function;
}

export const SiteView: React.FC<SiteViewProps> = props => {
  const [editEnabled, setEditEnabled] = React.useState(false);

  const [url, setUrl] = React.useState();

  const [isCreateOpen, setCreateOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const channelContext = useChannelContext();

  useMemo(() => {
    if (channelContext.site) {
      setUrl(channelContext.site.url);
    }
  }, [channelContext.site]);

  const enableEdit = () => {
    setEditEnabled(true);
  };

  const cancelEdit = () => {
    setEditEnabled(false);
  };

  const saveEdit = async () => {
    try {
      await channelContext.updateSite(url);

      setEditEnabled(false);
    } catch (err) {
      console.log(err);
      setEditEnabled(false);
    }
  };

  const createChannel = async (actionTaken: boolean) => {
    props.saveAction(actionTaken);
    setCreateOpen(false);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
  };

  const applyDelete = () => {
    channelContext.deleteSite();

    setDeleteOpen(false);
  };

  return (
    <Box>
      <Box>
        <Flex justifyContent="left" alignItems="center">
          <Flex.Item flexGrow={1}>
            <Box marginTop="medium">
              <H1>Site Details</H1>
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box>
              {!channelContext.isSiteLoading && !channelContext.site ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCreateOpen(true);
                  }}
                >
                  Create
                </Button>
              ) : editEnabled ? (
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

        {channelContext.isSiteLoading ? <Loader height="150px" /> : ""}

        {!channelContext.isSiteLoading && channelContext.site ? (
          <Form>
            <Form.Fieldset>
              <Form.Group>
                <Input
                  label="Site Id"
                  value={channelContext.site.id}
                  disabled
                />
                <Input
                  label="Channel Id"
                  value={channelContext.site.channel_id}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Input
                  label="URL/Domain"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  disabled={!editEnabled}
                />
              </Form.Group>
              <Form.Group>
                <Input
                  label="Created At"
                  value={channelContext.site.created_at}
                  disabled
                />
                <Input
                  label="Modified At"
                  value={channelContext.site.updated_at}
                  disabled
                />
              </Form.Group>
            </Form.Fieldset>
          </Form>
        ) : (
          ""
        )}

        <SiteCreateModal
          channelId={12}
          isOpen={isCreateOpen}
          closeAction={createChannel}
        />
      </Box>
    </Box>
  );
};

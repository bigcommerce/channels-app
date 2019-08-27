import * as React from "react";

import { Box, Flex, H1, Button, Form, Input } from "@bigcommerce/big-design";

import { Loader } from "../../components/base/Loader";
import { Site } from "../../models/Site";
import { SitesAPI } from "../../api";
import { useMemo } from "react";

interface SiteViewProps {
  site: Site;
  isLoading: boolean;
  saveAction: Function;
}

export const SiteView: React.FC<SiteViewProps> = props => {
  const [editEnabled, setEditEnabled] = React.useState(false);

  const [url, setUrl] = React.useState();

  useMemo(() => {
    if (props.site) {
      setUrl(props.site.url);
    }
  }, [props.site]);

  const enableEdit = () => {
    setEditEnabled(true);
  };

  const cancelEdit = () => {
    setEditEnabled(false);
  };

  const saveEdit = async () => {
    try {
      await SitesAPI.updateSite(props.site.id, url);

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
            <H1>Site Details</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            {!props.site ? (
              <Button variant="secondary">Create</Button>
            ) : editEnabled ? (
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

      {props.isLoading ? <Loader height="150px" /> : ""}

      {!props.isLoading && props.site ? (
        <Form>
          <Form.Fieldset>
            <Form.Group>
              <Input label="Site Id" value={props.site.id} disabled />
              <Input
                label="Channel Id"
                value={props.site.channel_id}
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
                value={props.site.created_at}
                disabled
              />
              <Input
                label="Modified At"
                value={props.site.updated_at}
                disabled
              />
            </Form.Group>
          </Form.Fieldset>
        </Form>
      ) : (
        ""
      )}
    </Box>
  );
};

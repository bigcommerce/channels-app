import * as React from "react";

import Async from "react-async";

import {
  Modal,
  Button,
  Form,
  Input,
  Box,
  ProgressCircle
} from "@bigcommerce/big-design";

interface SiteCreateModalProperties {
  channelId: number;
  isOpen: boolean;
  closeAction: Function;
}

export const SiteCreateModal: React.FC<SiteCreateModalProperties> = props => {
  const [url, setUrl] = React.useState<string>("");

  const clear = () => {
    setUrl("");
  };

  const cancelAction = () => {
    clear();
    props.closeAction(false);
  };

  const applyAction = async () => {
    try {
      // await SitesAPI.createSite(props.channelId, url);
      clear();
      props.closeAction(true);
    } catch (err) {
      clear();
      props.closeAction(false);
      console.log(err);
      return err;
    }
  };

  return (
    <Async deferFn={applyAction}>
      {({ error, isLoading, run }) => (
        <Modal
          isOpen={props.isOpen}
          onClose={() => {
            props.closeAction();
          }}
          closeOnEscKey={true}
          closeOnClickOutside={false}
        >
          <Modal.Header>Site Details</Modal.Header>

          <Modal.Body>
            <Box margin="large">
              <Form>
                <Form.Fieldset>
                  <Form.Group>
                    <Input
                      label="URL"
                      placeholder=""
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      disabled={isLoading}
                    />
                  </Form.Group>
                </Form.Fieldset>
              </Form>
            </Box>
          </Modal.Body>

          <Modal.Actions>
            <Button
              marginHorizontal="xxSmall"
              variant="subtle"
              onClick={() => {
                cancelAction();
              }}
              marginBottom="xSmall"
            >
              Cancel
            </Button>

            <Button
              marginHorizontal="xxSmall"
              onClick={run}
              disabled={isLoading}
            >
              {isLoading ? <ProgressCircle size={"xSmall"} /> : "Save"}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Async>
  );
};

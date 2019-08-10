import * as React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Box,
  Checkbox
} from "@bigcommerce/big-design";
import { Channel } from "../../models/Channel";

interface ChannelDetailViewModalProperties {
  isOpen: boolean;
  closeAction: Function;
  channelData?: Channel;
}

export const ChannelDetailViewModal: React.FC<
  ChannelDetailViewModalProperties
> = props => {
  if (props.channelData !== undefined) {
    return (
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.closeAction();
        }}
        closeOnEscKey={true}
        closeOnClickOutside={true}
      >
        <Modal.Header>Channel Details</Modal.Header>

        <Modal.Body>
          <Box margin="large">
            <Form>
              <Form.Fieldset>
                <Form.Row>
                  <Input
                    label="Channel Name"
                    value={props.channelData.name}
                    disabled
                  />
                </Form.Row>
                <Form.Row>
                  <Input
                    label="Channel Platform"
                    value={props.channelData.platform}
                    disabled
                  />
                </Form.Row>
                <Form.Row>
                  <Input
                    label="Channel Type"
                    value={props.channelData.type}
                    disabled
                  />
                </Form.Row>
                <Form.Row>
                  <Input
                    label="Channel Id"
                    value={props.channelData.id}
                    disabled
                  />
                  <Input
                    label="External Id"
                    value={props.channelData.external_id}
                    disabled
                  />
                  <Form.Fieldset legend="Status">
                    <Form.Row>
                      <Checkbox
                        label="Enabled"
                        readOnly
                        checked={props.channelData.is_enabled}
                      />
                    </Form.Row>
                  </Form.Fieldset>
                </Form.Row>

                <Form.Row>
                  <Input
                    label="Modified At"
                    value={props.channelData.date_modified}
                    disabled
                  />
                  <Input
                    label="Created At"
                    value={props.channelData.date_created}
                    disabled
                  />
                </Form.Row>

                <Form.Row />
              </Form.Fieldset>
            </Form>
          </Box>
        </Modal.Body>

        <Modal.Actions>
          <Button
            marginHorizontal="xxSmall"
            variant="subtle"
            onClick={() => {
              props.closeAction();
            }}
            marginBottom="xSmall"
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else {
    return (
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.closeAction();
        }}
        closeOnEscKey={true}
        closeOnClickOutside={true}
      >
        <Modal.Header>Channel Details</Modal.Header>

        <Modal.Body>Error</Modal.Body>

        <Modal.Actions>
          <Button
            variant="subtle"
            onClick={() => {
              props.closeAction();
            }}
            marginBottom="xSmall"
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
};

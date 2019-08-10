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

interface ChannelEditModalProperties {
  isOpen: boolean;
  closeAction: Function;
  channelData?: Channel;
}

export const ChannelEditModal: React.FC<ChannelEditModalProperties> = props => {
  const [enabled, setEnabled] = React.useState(
    props.channelData ? props.channelData.is_enabled : false
  );

  const [name, setName] = React.useState(
    props.channelData ? props.channelData.name : undefined
  );

  const [externalId, setExternalId] = React.useState(
    props.channelData ? props.channelData.external_id : undefined
  );

  const applyAction = () => {
    let newName = undefined
    let newExternalId = undefined
    if(name !== undefined && props.channelData &&  name !== props.channelData.name){
      newName = name
    }

    if(externalId !== undefined && props.channelData &&  name !== props.channelData.external_id){
      newExternalId = externalId
    }

    
  };

  if (props.channelData !== undefined) {
    return (
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.closeAction();
        }}
        closeOnEscKey={true}
        closeOnClickOutside={false}
      >
        <Modal.Header>Channel Details</Modal.Header>

        <Modal.Body>
          <Box margin="large">
            <Form>
              <Form.Fieldset>
                <Form.Row>
                  <Input
                    label="Channel Name"
                    placeholder={props.channelData.name}
                    value={name}
                    onChange={target => setName(target.currentTarget.value)}
                  />
                </Form.Row>
                <Form.Row>
                  <Input
                    label="External Id"
                    placeholder={props.channelData.external_id}
                    value={externalId}
                    onChange={target => setExternalId(target.currentTarget.value)}
                  />
                </Form.Row>

                <Form.Fieldset legend="Status">
                  <Form.Row>
                    <Checkbox
                      label="Enabled"
                      checked={enabled}
                      onChange={() => {
                        setEnabled(!enabled);
                      }}
                    />
                  </Form.Row>
                </Form.Fieldset>
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

          <Button
            marginHorizontal="xxSmall"
            onClick={() => {
              applyAction();
            }}
          >
            Apply
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

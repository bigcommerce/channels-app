import * as React from "react";
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
import { Channel } from "../../models/Channel";

interface ChannelDetailViewProps {
  channelData: Channel;
}

export const ChannelDetailView: React.FC<ChannelDetailViewProps> = props => {
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
            <Button variant="secondary">Edit</Button>
          </Box>
        </Flex.Item>
      </Flex>

      <Form>
        <Form.Fieldset className="test">
          <Form.Row className="test">
            <Input
              label="Channel Name"
              value={props.channelData.name}
              disabled
              className="test"
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
            <Input label="Channel Id" value={props.channelData.id} disabled />
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
  );
};

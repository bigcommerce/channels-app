import * as React from "react";

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

interface SiteViewProps {
  siteData: Site;
}

export const SiteView: React.FC<SiteViewProps> = props => {
  return (
    <div>
      <Box>
        <Flex justifyContent="left" alignItems="center">
          <Flex.Item grow={1}>
            <Box marginTop="medium">
              <H1>Site</H1>
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box>
              <Button variant="secondary">Edit</Button>
            </Box>
          </Flex.Item>
        </Flex>
        <Form>
          <Form.Fieldset>
            <Form.Row>
              <Input label="Site Id" value={props.siteData.id} disabled />
              <Input label="Channel Id" value={props.siteData.channel_id} disabled />
            </Form.Row>
            <Form.Row>
              <Input label="URL/Domain" value={props.siteData.url} disabled />
            </Form.Row>
            <Form.Row>
              <Input label="Created At" value={props.siteData.created_at} disabled />
              <Input label="Updated At" value={props.siteData.updated_at} disabled />
            </Form.Row>
          </Form.Fieldset>
        </Form>
      </Box>
    </div>
  );
};

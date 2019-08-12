import * as React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Box,
  Checkbox,
  Select
} from "@bigcommerce/big-design";

import { Channel } from "../../models/Channel";
import { string } from "prop-types";
import useAxios from "axios-hooks";
import Axios from "axios";


interface ChannelEditModalProperties {
  isOpen: boolean;
  closeAction: Function;
}

interface SelectOption {
  value: string;
  label: string;
}

interface Type {
  select: SelectOption;
  platforms: Array<SelectOption>;
}

export const ChannelCreateModal: React.FC<
  ChannelEditModalProperties
> = props => {
  const [enabled, setEnabled] = React.useState(false);
  const [name, setName] = React.useState();
  const [externalId, setExternalId] = React.useState();
  const [channelType, setChannelType] = React.useState();
  const [channelPlatform, setChannelPlatform] = React.useState();
  const [url, setUrl] = React.useState();


  const clear = () => {
    setEnabled(false)
    setName("")
    setExternalId("")
    setChannelType("")
    setChannelPlatform("")
    setUrl("")

  }

  const applyAction = async () => {

    try {
      const result = await Axios({
        url: "https://focused-torvalds-8d8f01.netlify.com/.netlify/functions/bigcommerce_channels/",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          channel_name: name,
          external_id: externalId,
          channel_type: channelType,
          channel_platform: channelPlatform,
          enabled: enabled,
          url: url
        }
      });

      console.log(JSON.stringify(result))

      clear()
      props.closeAction(true);

    } catch (err) {
      clear()
      props.closeAction(false);
      console.log(err);
    }


  };

  // TODO move this to db?
  // TODO icon links?

  let types: { [key: string]: Type } = {
    pos: {
      select: { value: "pos", label: "Point Of Sale (POS)" },
      platforms: [
        { value: "square", label: "Square" },
        { value: "vend", label: "Vend" },
        { value: "clover", label: "Clover" }
      ]
    },
    marketplace: {
      select: { value: "marketplace", label: "Marketplace" },
      platforms: [
        { value: "facebook", label: "Facebook" },
        { value: "amazon", label: "Amazon" },
        { value: "ebay", label: "Ebay" }
      ]
    },
    storefront: {
      select: { value: "storefront", label: "Storefront" },
      platforms: [
        { value: "bigcommerce", label: "BigCommerce" },
        { value: "wordpress", label: "WordPress" },
        { value: "drupal", label: "Drupal" },
        { value: "acquia", label: "Acquia" },
        { value: "bloomreach", label: "Bloomreach" },
        { value: "deity", label: "Deity" }
      ]
    },
    marketing: {
      select: { value: "marketing", label: "Marketing" },
      platforms: [
        { value: "facebook", label: "Facebook" },
        { value: "google_shopping", label: "Google Shopping" }
      ]
    }
  };

  const renderTypes = () => {
    console.log(JSON.stringify(types));
    return Object.values(types).map((t: Type) => {
      return (
        <Select.Option key={t.select.value} value={t.select.value}>
          {t.select.label}
        </Select.Option>
      );
    });
  };

  const renderPlatform = () => {
    console.log(channelType)
    if (channelType) {
      return types[channelType].platforms.map((p: SelectOption) => {
        return (
          <Select.Option key={p.value} value={p.value}>
            {p.label}
          </Select.Option>
        );
      });
    } else {
      return [];
    }
  };

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
                <Input label="Channel Name" placeholder="" value={name} onChange={e => setName(e.target.value)} />
              </Form.Row>
              <Form.Row>
                <Input label="External Id" placeholder="" value={externalId} onChange={e => setExternalId(e.target.value)} />
              </Form.Row>

              <Form.Row>
                <Select
                  label="Channel Type"
                  onActionClick={inputText => inputText}
                  onItemChange={(selectedValue: string) =>
                    setChannelType(selectedValue)
                  }
                  placeholder={"Choose Type"}
                  value={channelType}
                >
                  {renderTypes()}
                </Select>

                <Select
                  label="Channel Platform"
                  onActionClick={inputText => inputText}
                  onItemChange={(selectedValue: string) =>
                    setChannelPlatform(selectedValue)
                  }
                  placeholder={
                    channelType === undefined ? "Choose Type" : "Choose Platform"
                  }
                  value={channelPlatform}
                >
                  {renderPlatform()}
                </Select>
              </Form.Row>

              {channelType === "storefront" ? <Form.Fieldset>
                <Form.Row>
                  <Input label="URL/Domain" placeholder="" value={url} onChange={e => setUrl(e.target.value)} />
                </Form.Row>
              </Form.Fieldset> : ""}

              <Form.Fieldset legend="Status">
                <Form.Row>
                  <Checkbox
                    label="Enabled"
                    onChange={() => setEnabled(!enabled)}
                    checked={enabled}
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
            props.closeAction(false);
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
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

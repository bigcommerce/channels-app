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
  const [enabled, setEnabled] = React.useState();
  const [name, setName] = React.useState();
  const [externalId, setExternalId] = React.useState();
  const [channelType, setChannelType] = React.useState();
  const [channelPlatform, setChannelPlatform] = React.useState();

  const applyAction = async () => {
    
    try {
      const result = await Axios({
        url: "https://sampleapp.ngrok.io/bigcommerce/channels/",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          firstName: "Fred",
          lastName: "Flintstone"
        }
      });

      console.log(JSON.stringify(result))

    } catch (err) {
      console.log(err);
    }
    //   const name: HTMLInputElement | null = nameRef.current;
    //   const externalId: HTMLInputElement | null = externalIdRef.current;

    //   if (name !== null) {
    //     console.log(name["value"]);
    //   }

    //   if (externalId !== null) {
    //     console.log(externalId["value"]);
    //   }

    //   props.closeAction();
  };

  let [type, setType] = React.useState("storefront");
  let [platform, setPlatform] = React.useState();

  // TODO make this stored in firestore
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
    if (type) {
      return types[type].platforms.map((p: SelectOption) => {
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
                <Input label="Channel Name" placeholder="" />
              </Form.Row>
              <Form.Row>
                <Input label="External Id" placeholder="" />
              </Form.Row>

              <Form.Row>
                <Select
                  label="Channel Type"
                  onActionClick={inputText => inputText}
                  onItemChange={(selectedValue: string) =>
                    setType(selectedValue)
                  }
                  placeholder={"Choose Type"}
                  value={type}
                >
                  {renderTypes()}
                </Select>

                <Select
                  label="Channel Platform"
                  // maxHeight={number("maxHeight", 300)}
                  onActionClick={inputText => inputText}
                  onItemChange={(selectedValue: string) =>
                    setPlatform(selectedValue)
                  }
                  placeholder={
                    type === undefined ? "Choose Type" : "Choose Platform"
                  }
                  // placement={select("placement", placement, "bottom-start")}
                  value={platform}
                >
                  {renderPlatform()}
                </Select>
              </Form.Row>

              <Form.Row>
                
              </Form.Row>

              <Form.Fieldset>
                <Form.Row>
                  <Input label="URL/Domain" placeholder="" />
                </Form.Row>
              </Form.Fieldset>

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
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

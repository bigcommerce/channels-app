import * as React from "react";

import Async from "react-async";

import {
  Modal,
  Button,
  Form,
  Input,
  Box,
  Checkbox,
  Select,
  ProgressCircle
} from "@bigcommerce/big-design";
import { ChannelsAPI, SitesAPI } from "../../api";

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
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [externalId, setExternalId] = React.useState<string>("");
  const [channelType, setChannelType] = React.useState<string>("");
  const [channelPlatform, setChannelPlatform] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");

  const clear = () => {
    setEnabled(false);
    setName("");
    setExternalId("");
    setChannelType("");
    setChannelPlatform("");
    setUrl("");
  };

  const applyAction = async () => {
    try {
      const channel = await ChannelsAPI.createChannel(
        name,
        externalId,
        channelType,
        channelPlatform,
        enabled
      );

      if (url) {
        console.log(JSON.stringify(channel));

        await SitesAPI.createSite(channel.id, url);
      }

      clear();
      props.closeAction(true);
    } catch (err) {
      clear();
      props.closeAction(false);

      console.log(err);
      return err;
    }
  };

  // TODO icon links
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
    return Object.values(types).map((t: Type) => {
      return (
        <Select.Option key={t.select.value} value={t.select.value}>
          {t.select.label}
        </Select.Option>
      );
    });
  };

  const renderPlatform = () => {
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
          <Modal.Header>Channel Details</Modal.Header>

          <Modal.Body>
            <Box margin="large">
              <Form>
                <Form.Fieldset>
                  <Form.Group>
                    <Input
                      label="Channel Name"
                      placeholder=""
                      value={name}
                      onChange={e => setName(e.target.value)}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Input
                      label="External Id"
                      placeholder=""
                      value={externalId}
                      onChange={e => setExternalId(e.target.value)}
                      disabled={isLoading}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Select
                      label="Channel Type"
                      onActionClick={inputText => inputText}
                      onItemChange={(selectedValue: string) =>
                        setChannelType(selectedValue)
                      }
                      placeholder={"Choose Type"}
                      value={channelType}
                      disabled={isLoading}
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
                        channelType === undefined
                          ? "Choose Type"
                          : "Choose Platform"
                      }
                      value={channelPlatform}
                      disabled={isLoading}
                    >
                      {renderPlatform()}
                    </Select>
                  </Form.Group>

                  {channelType === "storefront" ? (
                    <Form.Fieldset>
                      <Form.Group>
                        <Input
                          label="URL/Domain"
                          placeholder=""
                          value={url}
                          onChange={e => setUrl(e.target.value)}
                          disabled={isLoading}
                        />
                      </Form.Group>
                    </Form.Fieldset>
                  ) : (
                    ""
                  )}

                  <Form.Fieldset legend="Status">
                    <Form.Group>
                      <Checkbox
                        label="Enabled"
                        onChange={() => setEnabled(!enabled)}
                        checked={enabled}
                        disabled={isLoading}
                      />
                    </Form.Group>
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

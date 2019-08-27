import * as React from "react";

import {
  Modal,
  Button,
  Form,
  Input,
  Box,
  Select
} from "@bigcommerce/big-design";

import { RouteTypeSelections, SelectOption } from "../../models/Route";

interface RouteCreateModalProperties {
  isOpen: boolean;
  closeAction: Function;
  applyAction: Function;
}

export const RouteCreateModal: React.FC<RouteCreateModalProperties> = props => {
  const [matching, setMatching] = React.useState<string>("");
  const [route, setRoute] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");

  const clear = () => {
    setMatching("");
    setRoute("");
    setType("");
  };

  const applyAction = async () => {
    props.applyAction(type, matching, route);
    clear();
  };

  const renderTypes = () => {
    return Object.values(RouteTypeSelections).map((t: SelectOption) => {
      return (
        <Select.Option key={t.value} value={t.value}>
          {t.label}
        </Select.Option>
      );
    });
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
      <Modal.Header>Route Details</Modal.Header>

      <Modal.Body>
        <Box margin="large">
          <Form>
            <Form.Fieldset>
              <Form.Group>
                <Select
                  label="Route Type"
                  onActionClick={inputText => inputText}
                  onItemChange={(selectedValue: string) =>
                    setType(selectedValue)
                  }
                  placeholder={"Choose Type"}
                  value={type}
                >
                  {renderTypes()}
                </Select>
              </Form.Group>
              <Form.Group>
                <Input
                  label="Matching Pattern"
                  placeholder=""
                  value={matching}
                  onChange={e => setMatching(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Input
                  label="Route"
                  placeholder=""
                  value={route}
                  onChange={e => setRoute(e.target.value)}
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
            clear();
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

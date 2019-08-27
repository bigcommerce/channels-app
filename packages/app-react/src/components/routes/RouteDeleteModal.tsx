import * as React from "react";

import { Modal, Text, Button } from "@bigcommerce/big-design";

interface RouteDeleteModalProperties {
  route: string;
  isOpen: boolean;
  cancelAction: Function;
  confirmAction: Function;
}

export const RouteDeleteModal: React.FC<RouteDeleteModalProperties> = props => {
  return (
    <Modal
      isOpen={props.isOpen}
      closeOnEscKey={true}
      closeOnClickOutside={false}
      variant="dialog"
    >
      <Modal.Header>Delete {props.route}?</Modal.Header>

      <Modal.Body>
        <Text>
          By deleting {props.route} the paths created by it will no longer be
          available in your Storefront.
        </Text>
      </Modal.Body>

      <Modal.Actions>
        <Button variant="subtle" onClick={() => props.cancelAction()}>
          Cancel
        </Button>
        <Button onClick={() => props.confirmAction()}>Apply</Button>
      </Modal.Actions>
    </Modal>
  );
};

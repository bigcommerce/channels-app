import * as React from "react";

import { Modal, Text, Button } from "@bigcommerce/big-design";

interface SiteDeleteModalProperties {
  isOpen: boolean;
  cancelAction: Function;
  confirmAction: Function;
}

export const SiteDeleteModal: React.FC<SiteDeleteModalProperties> = props => {
  return (
    <Modal
      isOpen={props.isOpen}
      closeOnEscKey={true}
      closeOnClickOutside={false}
      variant="dialog"
    >
      <Modal.Header>Delete Site?</Modal.Header>

      <Modal.Body>
        <Text>
          Deleting the site will remove the site and all paths created by it
          will no longer be available in your Storefront.
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

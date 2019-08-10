import * as React from "react";

import { Button, Dropdown, Link } from "@bigcommerce/big-design";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

interface ChannelListMenuProps {
  // viewDetailsAction: Function;
  // editAction: Function;
}

export const ChannelListMenu: React.FC<ChannelListMenuProps> = props => {
  return (
    <Dropdown
      placement="bottom-end"
      trigger={
        <Button variant="secondary">
          <FontAwesomeIcon icon={faEllipsisH} />
        </Button>
      }
    >
      <Dropdown.Item>
        <Link
          onClick={() => {
            // props.viewDetailsAction();
          }}
        >
          View Details
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link
          onClick={() => {
            // props.editAction();
          }}
        >
          Edit Channel
        </Link>
      </Dropdown.Item>
    </Dropdown>
  );
};

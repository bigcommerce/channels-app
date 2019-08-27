import * as React from "react";

import {
  Box,
  Flex,
  Button,
  Link,
  Dropdown,
  Text,
  Input,
  ProgressCircle,
  Select
} from "@bigcommerce/big-design";

import { MoreHorizIcon } from "@bigcommerce/big-design-icons";

import { Route, RouteTypeSelections, SelectOption } from "../../models/Route";

import { RouteDeleteModal } from "./RouteDeleteModal";
import { RoutesAPI } from "../../api";
import { useChannelContext } from "../../contexts/ChannelContext";

interface RoutesListElementProps {
  siteId: number;
  route: Route;
}

export const RouteListElement: React.FC<RoutesListElementProps> = props => {
  const channelContext = useChannelContext();

  const [editEnabled, setEditEnabled] = React.useState(false);

  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const cancelDelete = () => {
    setDeleteOpen(false);
  };

  const applyDelete = async () => {
    channelContext.deleteRoute(props.route.id);
    setDeleteOpen(false);
  };

  const [type, setType] = React.useState(props.route.type);
  const [matching, setMatching] = React.useState(props.route.matching);
  const [route, setRoute] = React.useState(props.route.route);

  const [isLoading, setIsLoading] = React.useState(false);

  const cancelEdit = () => {
    setType(props.route.type);
    setMatching(props.route.matching);
    setRoute(props.route.route);

    setEditEnabled(false);
  };

  const saveEdit = async () => {
    setIsLoading(true);

    const data = await RoutesAPI.updateRoute(
      props.siteId,
      props.route.id,
      type,
      matching,
      route
    );

    setType(data.data.type);
    setMatching(data.data.matching);
    setRoute(data.data.route);

    setIsLoading(false);
    setEditEnabled(false);
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

  const findType = (value: string) => {
    const result = RouteTypeSelections.find(ele => {
      return value === ele.value;
    });

    console.log(result);

    return result === undefined ? value : result.label;
  };

  return (
    <Box>
      <Box
        borderBottom="box"
        borderLeft="none"
        borderRight="none"
        backgroundColor="white"
      >
        <Flex justifyContent="left" alignItems="center">
          <Flex.Item margin="small">
            <Box style={{ lineHeight: "36px", width: "120px" }}>
              {editEnabled ? (
                <Select
                  onActionClick={inputText => inputText}
                  onItemChange={(selectedValue: string) =>
                    setType(selectedValue)
                  }
                  value={type}
                  disabled={!editEnabled}
                >
                  {renderTypes()}
                </Select>
              ) : (
                <Input disabled value={findType(type)} />
              )}
            </Box>
          </Flex.Item>
          <Flex.Item margin="small">
            <Box style={{ lineHeight: "36px", width: "100px" }}>
              <Input
                disabled={!editEnabled}
                value={matching}
                onChange={e => setMatching(e.target.value)}
              />
            </Box>
          </Flex.Item>
          <Flex.Item margin="small" flexGrow={1}>
            <Box style={{ lineHeight: "36px" }}>
              <Input
                disabled={!editEnabled}
                value={route}
                onChange={e => setRoute(e.target.value)}
              />
            </Box>
          </Flex.Item>

          <Flex.Item marginHorizontal="large">
            {editEnabled ? (
              <Box>
                <Button variant="secondary" onClick={() => cancelEdit()}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => saveEdit()}>
                  {isLoading ? <ProgressCircle size={"xSmall"} /> : "Save"}
                </Button>
              </Box>
            ) : (
              <Dropdown
                trigger={
                  <Button variant="secondary">
                    <MoreHorizIcon />
                  </Button>
                }
                placement="auto-start"
              >
                <Dropdown.Item value={1}>
                  <Link
                    onClick={() => {
                      setEditEnabled(true);
                    }}
                  >
                    Edit
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item value={2}>
                  <Link
                    onClick={() => {
                      setDeleteOpen(true);
                    }}
                  >
                    <Text color="danger">Delete</Text>
                  </Link>
                </Dropdown.Item>
              </Dropdown>
            )}
          </Flex.Item>
        </Flex>
      </Box>
      <RouteDeleteModal
        route={route}
        isOpen={isDeleteOpen}
        cancelAction={cancelDelete}
        confirmAction={applyDelete}
      />
    </Box>
  );
};

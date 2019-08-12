import * as React from "react";

import {
  Box,
  Flex,
  H1,
  Button,
  PlusIcon,
  Panel,
  H2,
  H4
} from "@bigcommerce/big-design";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { Site } from "../../models/Site";
import { Route } from "../../models/Route";

import { Loader } from "../base/Loader";

interface RoutesListViewProps {
  siteData: Site;
}

export const RoutesListView: React.FC<RoutesListViewProps> = props => {
  const mockRoutes: Array<Route> = [
    {
      id: 1,
      type: "product",
      matching: "5",
      route: "/products?id={id}"
    },
    {
      id: 2,
      type: "category",
      matching: "44",
      route: "/category/{slug}"
    }
  ];

  const renderRoutesList = (routeList: Array<Route>) => {
    return routeList.map((route: Route) => {
      return (
        <Box
          key={route.id}
          borderBottom="box"
          borderLeft="none"
          borderRight="none"
          backgroundColor="white"
        >
          <Flex justifyContent="left" alignItems="center">
            <Flex.Item margin="small">
              <Box style={{ lineHeight: "36px", width: "100px" }}>
                {route.type}
              </Box>
            </Flex.Item>
            {/* <Flex.Item margin="small">
              <Box style={{ lineHeight: "36px", width: "100px" }}>
                {route.matching}
              </Box>
            </Flex.Item> */}
            <Flex.Item margin="small" grow={1}>
              <Box style={{ lineHeight: "36px" }}>{route.route}</Box>
            </Flex.Item>

            <Flex.Item marginHorizontal="large">
              {/* <Link to={{ pathname: "/channel/", state: { channel: channel } }}> */}
              <Button variant="secondary">
                <FontAwesomeIcon icon={faEllipsisH} />
              </Button>
              {/* </Link> */}
            </Flex.Item>
            {/* <Flex.Item margin="small">
              <img height="24" src={logo} alt="Storefront Channel Logo Image" />
            </Flex.Item>
            <Flex.Item margin="small" grow={1}>
              <Box style={{ lineHeight: "36px" }}>{channel.name}</Box>{" "}
            </Flex.Item>

            <Flex.Item marginHorizontal="medium">
              {channel.is_enabled ? (
                <Lozenge variant="success">Active</Lozenge>
              ) : (
                <Lozenge variant="secondary">Inactive</Lozenge>
              )}
            </Flex.Item>

            <Flex.Item marginHorizontal="large">
              <Link to={{ pathname: "/channel/", state: { channel: channel } }}>
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </Link>
            </Flex.Item> */}
          </Flex>
        </Box>
      );
    });
  };

  return (
    <Box>
      <Flex justifyContent="left" alignItems="center">
          <Flex.Item grow={1}>
            <Box marginTop="medium">
              <H1>Routes</H1>
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box>
              <Button variant="secondary"> <PlusIcon /> Create Route</Button>
            </Box>
          </Flex.Item>
        </Flex>
      <Box
          borderBottom="box"
          borderLeft="none"
          borderRight="none"
          backgroundColor="white"
        >
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item margin="small">
          <Box style={{ lineHeight: "36px", width: "100px" }}><H4>Type</H4></Box>
        </Flex.Item>
        {/* <Flex.Item margin="small">
          <Box style={{ lineHeight: "36px", width: "100px" }}><H4>Matching</H4></Box>
        </Flex.Item> */}
        <Flex.Item margin="small" grow={1}>
          <Box style={{ lineHeight: "36px" }}><H4>Route</H4></Box>
        </Flex.Item>
      </Flex>
      </Box>
      {renderRoutesList(mockRoutes)}
    </Box>
  );
};

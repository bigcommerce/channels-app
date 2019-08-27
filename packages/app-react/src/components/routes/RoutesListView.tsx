import * as React from "react";

import { Box, Flex, H1, Button, H4 } from "@bigcommerce/big-design";

import { AddIcon } from "@bigcommerce/big-design-icons";

import { Route } from "../../models/Route";

import { Loader } from "../base/Loader";

import { RouteCreateModal } from "./RouteCreateModal";
import { RouteListElement } from "./RouteListElement";

import { useChannelContext } from "../../contexts/ChannelContext";
import { RoutesAPI } from "../../api";

export const RoutesListView: React.FC = props => {
  const channelContext = useChannelContext();

  const [isCreateOpen, setCreateOpen] = React.useState(false);

  const closeCreate = () => {
    setCreateOpen(false);
  };

  const applyCreate = (type: string, matching: string, route: string) => {
    if (channelContext.site) {
      RoutesAPI.createRoute(channelContext.site.id, type, matching, route);
      channelContext.reloadRoutes();
    }

    setCreateOpen(false);
  };

  const renderRoutesList = (routeList: Array<Route>) => {
    if (routeList && channelContext.site) {
      return routeList.map((route: Route) => {
        if (channelContext.site) {
          return (
            <RouteListElement
              key={route.id}
              siteId={channelContext.site.id}
              route={route}
            />
          );
        } else {
          return;
        }
      });
    }
  };

  return (
    <Box>
      <Flex justifyContent="left" alignItems="center">
        <Flex.Item flexGrow={1}>
          <Box marginTop="medium">
            <H1>Routes</H1>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Box>
            <Button
              variant="secondary"
              disabled={channelContext.isRoutesLoading}
              onClick={() => {
                setCreateOpen(true);
              }}
            >
              <AddIcon /> Create Route
            </Button>
          </Box>
        </Flex.Item>
      </Flex>

      {channelContext.isRoutesLoading ? <Loader height="150px" /> : ""}

      {!channelContext.isRoutesLoading &&
      channelContext.routes &&
      channelContext.routes.length > 0 ? (
        <Box
          borderBottom="box"
          borderLeft="none"
          borderRight="none"
          backgroundColor="white"
        >
          <Flex justifyContent="left" alignItems="center">
            <Flex.Item margin="small">
              <Box style={{ lineHeight: "36px", width: "120px" }}>
                <H4>Type</H4>
              </Box>
            </Flex.Item>
            <Flex.Item margin="small">
              <Box style={{ lineHeight: "36px", width: "100px" }}>
                <H4>Matching</H4>
              </Box>
            </Flex.Item>
            <Flex.Item margin="small" flexGrow={1}>
              <Box style={{ lineHeight: "36px" }}>
                <H4>Route</H4>
              </Box>
            </Flex.Item>
          </Flex>
        </Box>
      ) : (
        ""
      )}

      {!channelContext.isRoutesLoading && channelContext.routes
        ? renderRoutesList(channelContext.routes)
        : ""}

      <RouteCreateModal
        isOpen={isCreateOpen}
        closeAction={closeCreate}
        applyAction={applyCreate}
      />
    </Box>
  );
};

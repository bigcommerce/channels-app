import {
  RoutesPostRequestPayload,
  RoutesPutRequestPayload
} from "./interfaces";

export function fetchAll(bigCommerceClient, siteId: number) {
  return bigCommerceClient.get(`/sites/${siteId}/routes`);
}

export function fetchRoute(bigCommerceClient, siteId: number, routeId: number) {
  return bigCommerceClient.get(`/sites/${siteId}/routes/${routeId}`);
}

export function createRoute(
  bigCommerceClient,
  siteId: number,
  matching: string,
  route: string,
  type: string
) {
  const requestPayload: RoutesPostRequestPayload = {
    matching: matching,
    route: route,
    type: type
  };

  return bigCommerceClient.post(`/sites/${siteId}/routes`, requestPayload);
}

export function updateRoute(
  bigCommerceClient,
  siteId: number,
  routeId: number,
  matching: string,
  route: string,
  type: string
) {
  const requestPayload: RoutesPutRequestPayload = {
    id: routeId,
    matching: matching,
    route: route,
    type: type
  };

  return bigCommerceClient.put(`/sites/${siteId}/routes/${routeId}`, requestPayload);
}

export function deleteRoute(
  bigCommerceClient,
  siteId: number,
  routeId: number
) {
  console.log(`/sites/${siteId}/routes${routeId}`);
  return bigCommerceClient.delete(`/sites/${siteId}/routes/${routeId}`);
}

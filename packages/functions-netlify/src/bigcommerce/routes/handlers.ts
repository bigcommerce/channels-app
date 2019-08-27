import * as routesRepo from "./repository";

export async function RootHandler(event, bigCommerce) {
  if (event.httpMethod === "GET") {
    const data = await routesRepo.fetchAll(
      bigCommerce,
      event.queryStringParameters.site_id
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  if (event.httpMethod === "POST") {
    const payload = JSON.parse(event.body);

    const data = await routesRepo.createRoute(
      bigCommerce,
      event.queryStringParameters.site_id,
      payload.matching,
      payload.route,
      payload.type
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  if (event.httpMethod === "DELETE") {
    const data = await routesRepo.deleteRoute(
      bigCommerce,
      event.queryStringParameters.site_id,
      event.queryStringParameters.route_id
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  if (event.httpMethod === "PUT") {
    const payload = JSON.parse(event.body);

    const data = await routesRepo.updateRoute(
      bigCommerce,
      event.queryStringParameters.site_id,
      event.queryStringParameters.route_id,
      payload.matching,
      payload.route,
      payload.type
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  return {
    statusCode: 404,
    body: "Method Not Supported"
  };
}

export async function RoutesHandler(event, bigCommerce) {
  if (event.httpMethod === "GET") {
    const data = await routesRepo.fetchRoute(
      bigCommerce,
      event.queryStringParameters.site_id,
      event.queryStringParameters.route_id
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  return {
    statusCode: 404,
    body: "Method Not Supported"
  };
}

import * as siteRepo from "./repository";

export async function RootHandler(event, bigCommerce) {
  if (event.httpMethod === "GET") {
    const data = await siteRepo.fetchAll(bigCommerce);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }
  if (event.httpMethod === "POST") {
    console.log(JSON.stringify(JSON.parse(event.body), null, 2));

    const payload = JSON.parse(event.body);

    const data = await siteRepo.createSite(
      bigCommerce,
      payload.channel_id,
      payload.url
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

export async function SiteHandler(event, bigCommerce) {
  if (event.httpMethod === "GET") {
    const data = await siteRepo.fetchSite(
      bigCommerce,
      event.queryStringParameters.site_id
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  if (event.httpMethod === "PUT") {
    const payload = JSON.parse(event.body);

    const data = await siteRepo.updateSite(
      bigCommerce,
      payload.site_id,
      payload.url
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

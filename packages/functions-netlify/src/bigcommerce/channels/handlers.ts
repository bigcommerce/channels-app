import * as channelRepo from "./repository";

export async function RootHandler(event, bigCommerce) {
  if (event.httpMethod === "GET") {
    const data = await channelRepo.fetchAll(bigCommerce);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  if (event.httpMethod === "POST") {
    console.log(JSON.stringify(JSON.parse(event.body), null, 2));

    const payload = JSON.parse(event.body);

    const data = await channelRepo.createChannel(
      bigCommerce,
      payload.external_id,
      payload.is_enabled,
      payload.channel_name,
      payload.channel_platform,
      payload.channel_type
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

export async function ChannelHandler(event, bigCommerce) {
  if (event.httpMethod === "GET") {
    const data = await channelRepo.fetchChannel(
      bigCommerce,
      event.queryStringParameters.channel_id
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }

  if (event.httpMethod === "PUT") {
    const payload = JSON.parse(event.body);

    const data = await channelRepo.updateChannel(
      bigCommerce,
      payload.channel_id,
      payload.channel_name,
      payload.external_id,
      payload.is_enabled
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  }
}

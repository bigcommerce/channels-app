require("dotenv").config();

import * as BigCommerce from "node-bigcommerce";

import { auth } from "./auth";
import { handlers } from "./bigcommerce/routes";

exports.handler = async (event, context, callback) => {
  try {
    const session = auth.verify(event.headers.cookie);

    const bigCommerce = new BigCommerce({
      logLevel: "debug",
      clientId: process.env.BC_CLIENT_ID,
      accessToken: session.access_token,
      storeHash: session.store_id,
      responseType: "json",
      apiVersion: "v3"
    });

    switch (event.queryStringParameters.path) {
      case "/":
        return handlers.RootHandler(event, bigCommerce);

      case "/routes":
        return handlers.RoutesHandler(event, bigCommerce);
    }
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return {
      statusCode: 500,
      body: "Error"
    };
  }
};

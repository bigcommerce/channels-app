import * as BigCommerce from "node-bigcommerce"

import { repository as siteRepo } from "./bigcommerce/sites"

import { auth } from './auth';

exports.handler = async (event, context, callback) => {
    try {
        const session = auth.verify(event.headers.cookie)

        const bigCommerce = new BigCommerce({
            logLevel: "debug",
            clientId: process.env.BC_CLIENT_ID,
            accessToken: session.access_token,
            storeHash: session.store_id,
            responseType: "json",
            apiVersion: "v3"
        });

        if (event.httpMethod === "GET") {
            const data = await siteRepo.fetchAll(bigCommerce)

            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
        }

        return {
            statusCode: 404,
            body: "Method Not Supported"
        }

    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}
const util = require("util");

import faunadb from 'faunadb'

import * as BigCommerce from "node-bigcommerce"

import { repository } from "./bigcommerce/channels"
import { auth } from './auth';


const q = faunadb.query
const faunadbClient = new faunadb.Client({
    secret: process.env.FN_BC_AUTH_FAUNADB
})

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
            const data = await repository.fetchChannel(bigCommerce, event.queryStringParameters.channel_id)

            console.log(JSON.stringify(data, null, 2))

            // const data = {}
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
        }

        if (event.httpMethod === "PUT") {
            console.log(JSON.stringify(JSON.parse(event.body), null, 2))

            const payload = JSON.parse(event.body)

            const data = await repository.updateChannel(bigCommerce, payload.channel_id, payload.channel_name, payload.external_id, payload.is_enabled)

            console.log(JSON.stringify(data, null, 2))

            // const data = {}
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
            body: "Error"
        }
    }
}
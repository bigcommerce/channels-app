const util = require("util");

import faunadb from 'faunadb'

import * as BigCommerce from "node-bigcommerce"

import { repository, interfaces } from "./bigcommerce/app"


const q = faunadb.query
const faunadbClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

const bigCommerce = new BigCommerce({
    logLevel: "debug",
    clientId: process.env.BC_CLIENT_ID,
    secret: process.env.BC_CLIENT_SECRET,
    callback: process.env.BC_AUTH_CALLBACK,
    responseType: "json",
    apiVersion: "v3"
});

exports.handler = async (event, context, callback) => {
    try {
        const payload: interfaces.UninstallRequest = bigCommerce.verify(event.queryStringParameters.signed_payload)

        console.log(JSON.stringify(payload, null, 2))

        await repository.deleteRecord(faunadbClient, payload.store_hash)

        return {
            statusCode: 200,
            body: JSON.stringify({"status":"success"})
        }
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
        return {
            statusCode: 500,
            body: "Error Uninstalling App"
        }
    }
}
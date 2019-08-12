import faunadb from 'faunadb'

import * as BigCommerce from "node-bigcommerce"

import { repository } from "./bigcommerce/app"
import { auth } from './auth';

const faunadbClient = new faunadb.Client({
    secret: process.env.FN_BC_AUTH_FAUNADB
})

const bigCommerce = new BigCommerce({
    logLevel: "debug",
    clientId: process.env.BC_CLIENT_ID,
    secret: process.env.BC_CLIENT_SECRET,
    callback: process.env.BC_CALLBACK,
    responseType: "json",
    apiVersion: "v3"
});

exports.handler = async (event, context, callback) => {
    try {
        const payload = bigCommerce.verify(event.queryStringParameters.signed_payload)
       
        const storeData = await repository.fetchRecord(faunadbClient, payload.store_hash)

        try {
            auth.verify(event.headers.cookie)

            return {
                statusCode: 302,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Location': process.env.URL
                },
                body: ""
            }
        } catch (err) {
            return {
                statusCode: 302,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache',
                    'Set-Cookie': auth.generateCookie(storeData.store_hash, storeData.access_token),
                    'Location': process.env.URL
                },
                body: ""
            }
        }
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
        return {
            statusCode: 500,
            body: "Error Loading App"
        }
    }
}
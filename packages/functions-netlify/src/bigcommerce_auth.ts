require('dotenv').config()

import faunadb from 'faunadb'

import * as BigCommerce from "node-bigcommerce"

import { repository, models, interfaces } from "./bigcommerce/app"
import { auth } from "./auth"

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
    console.info("Bang")
    console.info(process.env.BC_CLIENT_ID)
    try {
        const authorizationData: interfaces.AuthResponse = await bigCommerce.authorize(event.queryStringParameters)

        const storeData: models.StoreData = {
            access_token: authorizationData.access_token,
            scope: authorizationData.scope,
            context: authorizationData.context,
            store_hash: authorizationData.context.split('/')[1],
            owner_id: authorizationData.user.id,
            active: true,
            users: [authorizationData.user]
        }

        await repository.createRecord(faunadbClient, storeData)

        return {
            statusCode: 302,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'Set-Cookie': auth.generateCookie(storeData.store_hash, authorizationData.access_token),
                'Location': process.env.APP_URL
            },
            body: ""
        }
    } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`)
        return {
            statusCode: 500,
            body: "Error Installing App"
        }
    }
}
const util = require("util");

import faunadb from 'faunadb'

import * as BigCommerce from "node-bigcommerce"

import { repository, models, interfaces } from "./bigcommerce/app"
import { auth } from "./auth"

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
    console.log(process.env.BC_CLIENT_ID)
    console.log(process.env.BC_CLIENT_SECRET)
    console.log(process.env.BC_CALLBACK)
    console.log(process.env.URL)



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
                'Location': process.env.URL
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
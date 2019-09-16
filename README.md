# Overview

The Channels App serves two main purposes, as:

 -  A reference implementation for:
	- Channel, Sites, and Routes APIs 
	- BigDesign React Components
 -	A way to manage the channels connected to a BC storefront and their corresponding sites and routes

## App Installation

It can be installed on a BC storefront [here](https://apps.bigcommerce.com/details/18212).

## Local Development & Testing

To get the app running locally, you'll need the following dependencies:

 - A BigCommerce Store: you can sign up for a trial [here](https://www.bigcommerce.com/essentials/) or use an existing store / sandbox store
 - Create API credentials: you can find instructions [here](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials)
 - A Netlify account: Sign Up for netlify [here](https://app.netlify.com/signup)
 - ngrok: You can install using homebrew `brew cask install ngrok`

### Setup Project

Run the following commands:

 1. `npm install netlify-cli -g`

 2. `netlify init`

	Notes:  

	 - You can use most of the specified defaults when prompted
	 - Build command should be `yarn build`
	 - Directory should be `packages/app-react/build`

 3. `netlify addons:create fauna`

 4. `netlify addons:auth fauna`

	 Notes:

	  - You need to agree to import the database
	  - It is recommended to rename the database to <username>-channels-app

### Setup FaunaDB DB and Index

 1. Log into FaunaDB and go to the db that was created from netlify
 2. Create a collection named `bigcommerce_stores` using defaults. To create a collection, click on the name of the database

![Create Collection Image](./instructions/create_collection.png)

 3. Create Index `store_hash` in `bigcommerce_stores`

![Create Index Image](./instructions/create_index.png)

	 Notes:

	  - Make sure to add data.store_hash to both terms and values
	  - Select the unique checkbox

### Setup ngrok tunnel for app

 1. `cp ngrok-sample.yml ngrok.yml` 
 2. Retrieve and replace the auth token in the `ngrok.yml` file
 3. Set `authtoken` in `ngrok.yml` file with value from https://dashboard.ngrok.com/get-started
 4. Set hostname to `<username>channelsdevapp.ngrok.io` in the `ngrok.yml` file.

	 Notes: 

	  - The username can be whatever you like

### Setup BC App

 1. Log into your store's [dev tools](https://devtools.bigcommerce.com/my/apps)
 2. Create an app and in the "Technical" section, set the following URLs:

	  - Auth Callback URL: `https://<username>channelsdevapp.ngrok.io/.netlify/functions/bigcommerce_auth`
	  - Load Callback URL: `https://<username>channelsdevapp.ngrok.io/.netlify/functions/bigcommerce_load`
	  - Uninstall Callback URL: `https://<username>channelsdevapp.ngrok.io/.netlify/functions/bigcommerce_uninstall`

 3. Select "modify" permissions for the following scopes:

	  - Channel Settings
	  - Sites & Routes

### Setup .env

 1. `cp .env-sample .env`

 2. Update and replace the following in `.env`:

	- BC_CLIENT_ID: BigCommerce App Client Id
	- BC_CLIENT_SECRET: BigCommerce App Secret

	- BC_AUTH_CALLBACK: Replace with Auth Callback URL from above
	- APP_URL= Replace with ngrok hostname from above `https://<username>_channelsappdev.ngrok.io/`

Note: The environment variables in `.env` will also need to be set in Netlify in order for the deployed version to work. [TODO]

### Start Service

In a terminal, execute the following in the root of the project directory to start ngrok: 

`ngrok start --config ngrok.yml site`

*Note*: if you stop and restart this process, it will give you a new host domain that you will need to update for each of the 3 Callback URLs in your app's dev tools section

In another terminal execute in the root of the project directory to start the service: 

`yarn netlify:dev`

The service will live reload on saved changes.  If you want to restart simply stop the `yarn netlify:dev` process and restart it, 
there should be no need to restart ngrok.

Reference: 
- https://docs.fauna.com/fauna/current/start/netlify




'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const knex = require('knex');
const schema = require('./schema');
const createDataSources = require('./data-sources');
const knexConfig = require('./knexfile');

const server = new ApolloServer({
	schema,
	dataSources: createDataSources(knex(knexConfig)),
});

server.listen().then(({ url }) => {
	console.info(`Apollo listening on: ${url}`);
});

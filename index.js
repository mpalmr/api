'use strict';

require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const knex = require('knex');
const schema = require('./schema');
const createDataSources = require('./data-sources');
const knexConfig = require('./knexfile');

function context() {
	return { user: null };
}

const server = new ApolloServer({
	schema,
	context,
	dataSources: createDataSources(knex(knexConfig)),
});

server.listen().then(({ url }) => {
	console.info(`Apollo listening on: ${url}`);
});

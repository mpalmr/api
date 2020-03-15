'use strict';

const { ApolloServer } = require('apollo-server');
const knex = require('knex');
const knexConfig = require('../../knexfile');
const schema = require('../../schema');
const createDataSources = require('../../data-sources');

module.exports = function createTestServer() {
	return new ApolloServer({
		schema,
		dataSources: createDataSources(knex(knexConfig)),
	});
};

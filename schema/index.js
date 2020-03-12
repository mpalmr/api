'use strict';

const path = require('path');
const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const { DateTimeResolver } = require('graphql-scalars');

const { Query: DrugQuery, Mutations: DrugMutations } = require('./drug');

const typeDefs = gql`
	${importSchema(path.resolve('src/apollo/schema/schema.graphql'))}
`;

const resolvers = {
	DateTime: DateTimeResolver,
	Query: {
		...DrugQuery,
	},
	Mutations: {
		...DrugMutations,
	},
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

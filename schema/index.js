'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = gql`
	type Query {
		test: String!
	}
`;

const resolvers = {
	Query: {
		test() {
			return 'AYYY!';
		},
	},
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { DateTimeResolver } = require('graphql-scalars');

const {
	typeDefs: drugTypeDefs,
	Query: DrugQuery,
	Mutations: DrugMutations,
	...drugTypeResolvers
} = require('./drug');

module.exports = makeExecutableSchema({

	typeDefs: gql`
		scalar DateTime;
		${drugTypeDefs}
	`,

	resolvers: {
		DateTime: DateTimeResolver,
		Query: {
			...DrugQuery,
		},
		Mutations: {
			...DrugMutations,
		},
		...drugTypeResolvers,
	},

});

'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { DateTimeResolver, EmailAddressResolver } = require('graphql-scalars');

const {
	typeDefs: userTypeDefs,
	Query: UserQuery,
	Mutation: UserMutation,
	...userTypeResolvers
} = require('./user');
const {
	typeDefs: drugTypeDefs,
	Query: DrugQuery,
	Mutation: DrugMutation,
	...drugTypeResolvers
} = require('./drug');

module.exports = makeExecutableSchema({

	typeDefs: gql`
		scalar DateTime
		scalar EmailAddress
		${drugTypeDefs}
	`,

	resolvers: {
		Query: {
			...UserQuery,
			...DrugQuery,
		},
		Mutation: {
			...UserMutation,
			...DrugMutation,
		},
		...userTypeResolvers,
		...drugTypeResolvers,
		DateTime: DateTimeResolver,
		EmailAddress: EmailAddressResolver,
	},

});

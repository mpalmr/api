'use strict';

const { gql } = require('apollo-server');

exports.typeDefs = gql`
	type Mutation {
		login(username: String!, password: String!): User!
		register(username: String!, email: EmailAddress, password: String!): User!
	}

	type User {
		id: ID!
		username: String!
		email: EmailAddress!
		createdAt: DateTime!
		updatedAt: DateTime!
	}
`;

exports.Mutation = {
	async login(root, { username, password }, { dataSources }) {},

	async register(root, { username, email, password }, { dataSources }) {},
};

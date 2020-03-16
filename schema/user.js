'use strict';

const { gql } = require('apollo-server');
const { createError } = require('apollo-errors');
const yup = require('yup');
const argon = require('argon2');
const { baseResolver, createYupValidationResolver } = require('./resolvers');

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

const InvalidCredentials = createError('InvalidCredentiails', { message: 'Invalid credentiails.' });

exports.Mutation = {
	login: createYupValidationResolver(
		baseResolver,
		yup.object().shape({
			username: yup.string().required().min(4),
			password: yup.string().required().min(6),
		}),
	)
		.createResolver(async (root, { username, password }, { dataSources }) => dataSources.db.user
			.getLoginUserPassword(username)
			.then(hash => argon.verify(hash, password))
			.then((isValid) => {
				if (!isValid) throw new InvalidCredentials();
			})),

	async register(root, { username, email, password }, { dataSources }) {},
};

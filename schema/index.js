'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = gql`
	type Query {
		getDrugById(drugId: ID!): Drug!
	}

	type Drug {
		id: ID!
		name: String!
		summary: String
		effects: String
		detection: String
		avoid: String
		pubchemCid: String
		referencesAndNotes: String
		createdAt: Date!
		updatedAt: Date!
	}
`;

const resolvers = {
	Query: {
		async getDrugById(root, { drugId }, { dataSources }) {
			return dataSources.db.drug.getById(drugId);
		},
	},
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

'use strict';

const { gql } = require('apollo-server');

exports.typeDefs = gql`
	type Query {
		getDrugById(drugId: ID!): Drug!
	}

	type Mutation {
		createDrug(drug: DrugInput!): Drug!
	}

	input DrugInput {
		name: String!
		summary: String
		effects: String
		detection: String
		avoid: String
		pubchemCid: String
		referencesAndNotes: String
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

exports.Query = {
	async getDrugById(root, { drugId }, { dataSources }) {
		return dataSources.db.drug.getById(drugId);
	},
};

exports.Mutation = {
	async createDrug(root, { newDrug }, { dataSources }) {
		return dataSources.db.drug
			.create(newDrug)
			.returning('*')
			.then(([createdDrug]) => createdDrug);
	},
};

'use strict';

const { gql } = require('apollo-server');
const { createTestClient, uuidRegex } = require('apollo-server-testing');
const createTestServer = require('./utils/create-test-server');

describe('Mutations', () => {
	test('Can create a new drug', async () => {
		const server = createTestServer();
		const { mutate } = createTestClient(server);

		const { id, ...drug } = await mutate({
			variables: {
				name: 'Lubetazerpine',
				summary: 'Slippery when wet',
				effects: 'Whoaaa',
			},
			mutation: gql`
				mutation CreateDrug($newDrug: DrugInput!) {
					createDrug(newDrug: $newDrug) {
						id
						name
						summary
						effects
						detection
						avoid
						pubchemCid
						referencesAndNotes
						createdAt
						updatedAt
					}
				}
			`,
		})
			.then(res => res.data.createDrug);

		expect(id).toMatch(uuidRegex);
		expect(drug).toEqual({
			name: 'Lubetazerpine',
			summary: 'Slippery when wet',
			effects: 'Whoaaa',
		});
	});
});

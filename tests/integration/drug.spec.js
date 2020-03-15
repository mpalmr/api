'use strict';

const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const knex = require('knex');
const knexConfig = require('../../knexfile');
const { createTestServer, uuidRegex, isoDateRegex } = require('./utils');

let db;
beforeAll(() => {
	db = knex(knexConfig);
});

describe('Mutations', () => {
	test('Can create a new drug', async () => {
		const server = createTestServer();
		const { mutate } = createTestClient(server);

		const {
			id,
			createdAt,
			updatedAt,
			...drug
		} = await mutate({
			mutation: gql`
				mutation CreateDrug($drug: DrugInput!) {
					createDrug(drug: $drug) {
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
			variables: {
				drug: {
					name: 'Lubetazerpine',
					summary: 'Slippery when wet',
					effects: 'Whoaaa',
				},
			},
		})
			.then(res => res.data.createDrug);

		expect(id).toMatch(uuidRegex);
		expect(createdAt).toMatch(isoDateRegex);
		expect(updatedAt).toMatch(isoDateRegex);
		expect(drug).toEqual({
			name: 'Lubetazerpine',
			summary: 'Slippery when wet',
			effects: 'Whoaaa',
			avoid: null,
			detection: null,
			pubchemCid: null,
			referencesAndNotes: null,
		});

		const record = await db('drug').where('id', id).first();
		expect(record).toEqual({
			id,
			name: 'Lubetazerpine',
			summary: 'Slippery when wet',
			effects: 'Whoaaa',
			avoid: null,
			detection: null,
			pubchemCid: null,
			referencesAndNotes: null,
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
		});
	});
});

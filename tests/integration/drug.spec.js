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

afterEach(async () => db('drug').truncate());

describe('Query', () => {
	test('getDrugById', async () => {
		const drugId = await db('drug')
			.insert({
				name: 'Rickazalam',
				summary: 'Rowdy',
				effects: 'AY',
			})
			.returning('id')
			.then(([a]) => a);

		const server = createTestServer();
		const { query } = createTestClient(server);
		const { createdAt, updatedAt, ...payload } = await query({
			query: gql`
				query GetDrugById($drugId: ID!) {
					getDrugById(drugId: $drugId) {
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
			variables: { drugId },
		})
			.then(res => res.data.getDrugById);

		expect(createdAt).toMatch(isoDateRegex);
		expect(updatedAt).toMatch(isoDateRegex);
		expect(payload).toEqual({
			id: drugId,
			name: 'Rickazalam',
			summary: 'Rowdy',
			effects: 'AY',
			avoid: null,
			detection: null,
			pubchemCid: null,
			referencesAndNotes: null,
		});
	});
});

describe('Mutations', () => {
	test('createDrug', async () => {
		const server = createTestServer();
		const { mutate } = createTestClient(server);
		const {
			id,
			createdAt,
			updatedAt,
			...payload
		} = await mutate({
			mutation: gql`
				mutation CreateDrug($drug: CreateDrugInput!) {
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
		expect(payload).toEqual({
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

	test('updateDrug', async () => {
		const record = await db('drug')
			.insert({
				name: 'A-Cheeseburger',
				summary: 'Delcicious grease',
				effects: 'Early death',
				detection: 'Urine',
				avoid: 'Motorcycles',
				pubchemCid: 1800,
				referencesAndNotes: 'Encyclopedia Dramatica',
			})
			.returning('*')
			.then(([a]) => a);

		const server = createTestServer();
		const { mutate } = createTestClient(server);
		const { detection, effects, updatedAt } = await mutate({
			mutation: gql`
				mutation UpdateDrug($drugId: ID!, $updates: UpdateDrugInput!) {
					updateDrug(drugId: $drugId, updates: $updates) {
						id
						name
						summary
						effects
						detection
						updatedAt
					}
				}
			`,
			variables: {
				drugId: record.id,
				updates: {
					detection: 'Angry dad',
					effects: 'Bad times',
				},
			},
		})
			.then(res => res.data.updateDrug);

		expect(detection).toBe('Angry dad');
		expect(effects).toBe('Bad times');
		expect(new Date(updatedAt)).toEqual(record.updatedAt); // TODO

		const updatedRecord = await db('drug')
			.select('detection', 'effects')
			.where('id', record.id)
			.first();
		expect(updatedRecord).toEqual({
			detection: 'Angry dad',
			effects: 'Bad times',
		});
	});
});

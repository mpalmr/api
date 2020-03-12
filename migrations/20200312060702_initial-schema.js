'use strict';

exports.up = async function (knex) {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	return knex.schema.createTable('drug', (table) => {
		table
			.uuid('id')
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.notNullable()
			.primary();
		table.text('name').notNullable().unique();
		table.text('summary');
		table.text('effects');
		table.text('detection');
		table.text('avoid');
		table.integer('pubchem_cid').unsigned();
		table.text('references_and_notes');
		table.timestamps(true, true);
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('drug');
	return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};

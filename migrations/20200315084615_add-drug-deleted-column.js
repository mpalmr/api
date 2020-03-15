'use strict';

exports.up = async function (knex) {
	return knex.schema.alterTable('drug', (table) => {
		table
			.boolean('deleted')
			.defaultTo(false)
			.notNullable();
	});
};

exports.down = async function (knex) {
	return knex.schema.alterTable('drug', (table) => {
		table.dropColumn('deleted');
	});
};

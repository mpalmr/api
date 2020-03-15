'use strict';

const knex = require('knex');
const knexConfig = require('../knexfile');

module.exports = async function globalTestTeardown() {
	const db = knex(knexConfig);
	return db.migrate.rollback();
};

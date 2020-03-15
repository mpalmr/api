'use strict';

if (!process.env.DB_USER) require('dotenv').config(); // eslint-disable-line global-require
const knexStringcase = require('knex-stringcase');

const defaults = {
	client: 'pg',
	connection: {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
	},
};

module.exports = knexStringcase({
	development: defaults,
	production: defaults,
	test: {
		...defaults,
		connection: {
			...defaults.connection,
			database: process.env.POSTGRES_TEST_DB,
		},
	},
}[process.env.NODE_ENV]);

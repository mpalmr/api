'use strict';

if (!process.env.DB_USER) require('dotenv').config(); // eslint-disable-line global-require
const knexStringcase = require('knex-stringcase');

module.exports = knexStringcase({
	client: 'pg',
	connection: {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
	},
});

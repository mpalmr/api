'use strict';

const createDatabaseDataSource = require('./db');

module.exports = function createDataSources(db) {
	return { db: createDatabaseDataSource(db) };
};

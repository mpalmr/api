'use strict';

const createDatabaseDataSource = require('./database');

module.exports = function createDataSources(db) {
	return { db: createDatabaseDataSource(db) };
};

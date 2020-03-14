'use strict';

const createDrugDataSource = require('./drug');

module.exports = function createDatabaseDataSource(...args) {
	return { drug: createDrugDataSource(...args) };
};

'use strict';

module.exports = function createDrugDataSource(db) {
	return {
		async getById(id) {
			return db('drug').select('*').where('id', id);
		},
	};
};

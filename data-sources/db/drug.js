'use strict';

module.exports = function createDrugDataSource(db) {
	return {
		getById(id) {
			return db('drug').where('id', id).first();
		},

		create(drug) {
			return db('drug').insert(drug);
		},
	};
};

'use strict';

exports.Query = {
	async getDrugById(root, { drugId }, { dataSources }) {
		return dataSources.db.drug.getById(drugId);
	},
};

exports.Mutation = {
	async createDrug(root, { newDrug }, { dataSources }) {

	},
};

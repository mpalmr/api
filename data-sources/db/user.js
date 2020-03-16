'use strict';

module.exports = function createUserDataSource(db) {
	return {
		getLoginUserPassword(username) {
			return db('user')
				.select('password')
				.where('username', username)
				.where('deleted', false)
				.first();
		},
	};
};

'use strict';

module.exports = {
  root: true,
	extends: 'airbnb-base',
	env: { node: true },
	parserOptions: { sourceType: 'script' },
	rules: {
		strict: [2, 'global'],
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-console': 0,
	},
  overrides: [
    {
			files: ['**/*.spec.js'],
			env: { jest: true },
			plugins: ['jest'],
		},
  ],
};

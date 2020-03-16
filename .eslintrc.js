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
		'func-names': 0,
		'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
	},
  overrides: [
		{
			files: ['**/*.spec.js', '**/__mocks__/*.js'],
			env: { jest: true },
			plugins: ['jest'],
		},
  ],
};

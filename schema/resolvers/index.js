'use strict';

const { createResolver } = require('apollo-resolvers');
const { createError, isInstance } = require('apollo-errors');

const UnknownError = createError('UnknownError', { message: 'An unknown error has occured.' });
const baseResolver = createResolver(null, (root, args, ctx, error) => {
	console.error(error);
	return isInstance(error) ? error : new UnknownError();
});

const UnauthorizedError = createError('UnauthorizedError', { message: 'Unauthorized.' });
const isAuthenticatedResolver = baseResolver.createResolver((root, args, { user }) => {
	if (!user) throw new UnauthorizedError();
});

const BadRequestError = createError('BadRequestError');
function createYupValidationResolver(resolver, schema, {
	getArgs = a => a,
	resolveError = null,
} = {}) {
	return resolver.createResolver(
		async (parent, args) => schema
			.validate(getArgs(args))
			.catch((error) => {
				console.error(error);
				if (isInstance(error)) throw new BadRequestError();
				return Promise.reject(error);
			}),
		resolveError,
	);
}

module.exports = { baseResolver, isAuthenticatedResolver, createYupValidationResolver };

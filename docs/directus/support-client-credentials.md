# Supporting Client Credentials flow for BCC Apis

## Summary

By default Directus only supports custom tokens and password flow for authenticating api requests. This document describes how to add support for client credentials flow.


### Steps

1. Creating a custom extension in Directus
2. Add initial support for client credentials flow
3. Scopes and documentation
4. Building and testing

## 1. Creating a custom hook extension for Directus

To create a new extension run:
```sh
npx create-directus-extension@latest
```

then follow the prompts to match:
```text
? Choose the extension type         -> hook
? Choose a name for the extension   -> auth-client-credentials
? Choose the language to use        -> typescript
? Auto install dependencies         -> Yes
✔ Done
```

For more information on how to create a custom extension in Directus, please refer to the [official documentation](https://docs.directus.io/extensions/creating-extensions.html).

## 2. Add the logic for client credentials flow

- Navigate into the newly created extension's directory then run the following command to install the required dependencies:

```sh
npm install jwks-rsa -S -D
npm install jsonwebtoken uuid --save-peer
```

- Now open the `src/index.ts` file. Replace the content with the following code:

```typescript
import { defineHook } from '@directus/extensions-sdk';
import jwksRsa from 'jwks-rsa';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Accountability } from '@directus/types';
import { NIL, v5 } from 'uuid';

export default defineHook(({ filter, action }, { env, services, getSchema }) => {
	const { UsersService } = services;
	const issuer = env['BCC_AUTH_ISSUER'];
	const audience = env['BCC_AUTH_AUDIENCE'];

	if (!audience || !issuer) throw new Error(`Missing audience or issuer`);

	const algorithms: jwt.Algorithm[] = ['RS256'];

	const JwksClient = jwksRsa({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 10,
		// Note: Add forward slash if your issuer doesn't have it
		jwksUri: `${issuer}.well-known/jwks.json`,
	});
	

	filter('authenticate', async (accountabilityIn, meta, context) => {
		const { req } = meta as { req: Request & { token: string } };
		if (!req.token) return accountabilityIn;

		const decoded = jwt.decode(req.token, { complete: true });
		if (!decoded?.payload) return accountabilityIn;

		const payload = decoded?.payload as JwtPayload & {
			iss: string;
			aud: string;
			gty: string; // Grant type
			sub: string; // Auth0 ClientId
			scope: string;
		};

		// We only support client credentials
		if (payload.gty !== 'client-credentials') return accountabilityIn;
		if (payload.iss !== issuer || payload.aud !== audience) return accountabilityIn;

		try {
			const key = await JwksClient.getSigningKey(decoded.header.kid);

			jwt.verify(req.token, key.getPublicKey(), { audience, issuer, algorithms });
		} catch (err) {
			console.error(err);
			return accountabilityIn;
		}

		const scopes = payload.scope.split(' ')
		// Change this to the scope you want to check
    // Optionally map different scopes to different roles
		if (!scopes.includes('my_service#read')) return accountabilityIn;
		const role = 'THE-UUID-OF-THE-ROLE-FOR-API-ACCESS';

		const { database } = context;
		const schema = await getSchema();
		const usersSvc = new UsersService({ knex: database, schema });

		const identifier = payload.sub;
		const userId = v5(identifier, NIL);

		const user = await usersSvc
			.readOne(userId, {
				fields: ['id', 'role', 'last_access', 'organizations.organization'],
			})
			.catch(() => null);

		// Orgs have been changed to uids and since we don't have that we disable this for now
		const issuedAtDate = payload.iat ? new Date(payload.iat * 1000) : new Date();

		if (!user) {
			await usersSvc.createOne({
				id: userId,
				provider: 'bcc-client-credentials',
				first_name: 'External',
				last_name: 'Client',
				external_identifier: identifier,
				last_access: issuedAtDate.toISOString(),
				role
			});
		} else {
			const updateUser: any = {};
			if (new Date(user.last_access) !== issuedAtDate) {
				updateUser.last_access = issuedAtDate.toISOString();
			}

			if (user.role !== role) {
				updateUser.role = role;
			}

			if (Object.keys(updateUser).length > 0) {
				await usersSvc.updateOne(userId, updateUser);
			}
		}

		return Object.assign({}, accountabilityIn, {
			user: userId,
			role: role,
			roles: [role],
		} as Accountability);
	});
});
```

## 3. Scopes and documentation

The scopes you have defined in your hook, need to be added to the Core Api documentation. 
It is a good idea to contact the core team if your api is going to be apart of the bcc api. eg. `api.bcc.no/your_service`


## 4. Building and testing

Please refer to the [official documentation on building-your-extension](https://docs.directus.io/extensions/creating-extensions.html#building-your-extension)


You would either have to add it to your Dockerfile or install it locally.

### Docker

```md
FROM directus/directus:11.x.y

USER root
RUN corepack enable
USER node

COPY ./auth-client-credentials ./auth-client-credentials
RUN pnpm install ./auth-client-credentials
```

### Local

```sh
npm install ./auth-client-credentials
```

Read here for more general info on [installing-extensions](https://docs.directus.io/extensions/installing-extensions.html)

## Older Directus Versions

This guide assumes you are running at least Directus 11. If you are running Directus 9 or 10, you will have to adjust the return of the hook to match the expected format.
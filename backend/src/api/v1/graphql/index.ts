// Apollo & GraphQL Imports
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Express Import
import express from 'express';

// CORS Import
import cors from 'cors';

// HTTP Server Import
import { createServer as createServerHTTP } from 'http';

// Constants, Helpers & Types
import { API_VERSION, SERVER_PORT, SERVER_HOST, PROTOCOL, serverReadyMessage, isDevelopment } from '../constants';

// Initialize and configure the Express app
const initializeApp = () => {
  const app = express();

  // Define a whitelist of allowed origins for CORS
  const whitelist = [
    'http://localhost:3000', // Default React development port
    `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`, // Your server address
    'https://studio.apollographql.com', // Apollo Studio
  ];

  // Enable trust proxy if running behind a proxy (e.g., Nginx)
  app.enable('trust proxy');

  // Configure CORS with credentials and allowed origins
  app.use(
    cors({
      credentials: true,
      origin: whitelist,
    }),
  );

  // Middleware to parse JSON requests
  app.use(express.json());

  // Endpoint for server status (useful for container health checks)
  app.get(API_VERSION + '/status', (_, res) => {
    res.send(serverReadyMessage);
  });

  return app;
};

// Start and configure the Apollo Server
export const startApolloServer = async () => {
  const app = initializeApp();

  // Create an HTTP server instance
  const httpServer = createServerHTTP(app);

  // Build the GraphQL schema from type definitions and resolvers
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Initialize Apollo Server with configuration
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true, // Enables CSRF protection for mutations
    cache: 'bounded', // Use a bounded in-memory cache
    debug: isDevelopment, // Enable detailed error messages in development
    plugins: [
      // Plugin for proper shutdown of the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Show playground only in development
      isDevelopment
        ? ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: true })
        : ApolloServerPluginLandingPageDisabled(),
    ],
  });

  // Start the Apollo Server
  await apolloServer.start();

  // Apply Apollo Server middleware to Express app
  apolloServer.applyMiddleware({
    app,
    path: API_VERSION, // Set the GraphQL endpoint path
    cors: false, // Disable CORS as it's already handled by Express
  });

  // Start the HTTP server
  await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));

  // Log server readiness message
  // eslint-disable-next-line no-console
  console.log(serverReadyMessage);
};

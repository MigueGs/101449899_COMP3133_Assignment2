// src/server.js  este es el file del servidor S
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const authMiddleware = require("./middleware/auth");

dotenv.config();


const app = express();


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use(authMiddleware);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    
    return { user: req.user };
  },
  formatError: (err) => {
    
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  },
});

async function initServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  connectDB();

  app.get("/", (req, res) => {
    res.send(
      "Employee Management System API is Live! Visit /graphql to access the GraphQL API."
    );
  });

  return app;
}

if (process.env.NODE_ENV !== "production") {
  (async () => {
    const localApp = await initServer();
    const PORT = process.env.PORT || 4000;
    localApp.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  })();
}
module.exports = initServer;

const { ApolloServer, AuthenticationError, gql } = require('apollo-server');

const graphql = require('graphql');
require('dotenv').config();
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const typeDefs = require('./schemas/typeDefs.js');
const resolvers = require('./schemas/resolvers.js');
const TrackAPI = require('./datasources/track-api');
const User = require('./datasources/userService.js');
const UserModel = require('./models/User.js');
const models = require('./models');
const ExerciseAPI = require('./datasources/exercise-api.js');
const connectDB = require('./config/db.js');
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  dataSources: () => {
    // console.log(UserModel);
    return {
      trackAPI: new TrackAPI(),
      exerciseAPI: new ExerciseAPI(),

      usersDb: new User(UserModel),
    };
  },
  context: async ({ req }) => {
    const Key = req.headers.rapidkey || '';
    // const Key = token.split(' ')[1];
    const Host = req.headers.rapidhost || '';
    // console.log('Dilip Key:', Key);
    // console.log('Dilip Host:', Host);

    const token = req.headers.authorization || '';
    const userId = token.split(' ')[1]; // get the user name after 'Bearer '
    let user = '';
    let role = '';

    if (userId) {
      // const { username, userrole } = await models.User.findById(userId);
      const { username, userrole } = await models.User.find({
        username: userId,
      });
      user = username;
      role = userrole;
    }

    return {
      Key,
      Host,
      models,
      user,
      role,
    };
  },
  cors: {
    origin: [
      // 'https://www.your-app.example',
      'http://localhost:3000',
      'https://studio.apollographql.com',
    ],
    credentials: true,
  },
});

const PORT = process.env.PORT || 4000;

server
  .listen(PORT)
  .then(({ url }) => {
    console.log(`Server is ready at ${url}`);
  })
  .catch((err) => console.error(err));

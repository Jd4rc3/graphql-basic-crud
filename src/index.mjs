import {createServer} from 'http';
import {createSchema, createYoga} from 'graphql-yoga';
import {tasks} from './sample.mjs';
import {connect} from './database.mjs';
import User from '../models/User.mjs';

createServer(
    createYoga({
      schema: createSchema({
        typeDefs: `
        type Query {
            hello: String
            required_greet(name: String!): String
            greet(name: String): String
            tasks: [Task]
            Users: [User]
        }

        type Task {
            _id: ID
            title: String!
            description: String!
            number: Int
        }

        type User {
            _id: ID
            firstName: String!
            lastName: String!
            age: Int
        }

        type Mutation {
            createTask(input: TaskInput): Task
            createUser(input: UserInput): User
            deleteUser(_id: ID): User
            updateUser(_id: ID, input: UserInput): User
        }

        input UserInput {
            firstName: String!
            lastName: String!
            age: Int!
        }

        input TaskInput {
            title: String!
            description: String!
            number: Int
        }
      `,
        resolvers: {
          Query: {
            hello: () => 'Hello Hello Hello',

            required_greet: (_, {name}) => `Hello from required greet ${name}`,

            greet: (_, {name}) => `Hello from non required greet ${name}`,

            tasks: () => tasks,

            async Users() {
              return await User.find();
            },
          },
          Mutation: {
            createTask(_, {input}) {
              input._id = tasks.length;
              tasks.push(input);
              return input;
            },
            async createUser(_, {input}) {
              const newUser = new User(input);
              await newUser.save();
              return newUser;
            },
            async deleteUser(_, {_id}) {
              return await User.findByIdAndDelete(_id);
            },
            async updateUser(_, {_id, input}) {
              return await User.findByIdAndUpdate(_id, input, {new: true});
            },
          },
        },
      }),
    }),
).listen(4000, () => {
  console.info('GraphQL Yoga is listening on http://localhost:4000/graphql');
});

connect();

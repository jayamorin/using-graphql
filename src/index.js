// Facebook: https://www.facebook.com/groups/607163139705114/
const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  input UserData {
    name: String
    lastname: String
  }

  type Address {
    street: String
    location: String
  }

  type User {
    name: String
    lastname: String
    address: Address
  }

  type Query {
    listUsers: [User]
  }

  type Mutation {
    insert(user: UserData): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const users = [
  {
    name: "Name 01",
    lastname: "Lastname 01",
    address: {
      street: "bolivar 123",
      location: "pueblo libre"
    }
  },
  {
    name: "Name 02",
    lastname: "Lastname 02",
    address: {
      street: "brasil 123",
      location: "jesus maría"
    }
  },
  {
    name: "Name 03",
    lastname: "Lastname 03",
    address: {
      street: "camino real 345",
      location: "san isidro"
    }
  }
];

var resolvers = {
  Query: {
    listUsers() {
      return users;
    }
  },
  Mutation: {
    insert(root, { user }) {
      users.push(user);
      return `User inserted: ${user.name} ${user.lastname}`;
    }
  }
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) =>
  res.send("<h1>Type: https://xnyeq.sse.codesandbox.io/graphql</h1>")
);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(3000, () => console.log("Server on running"));

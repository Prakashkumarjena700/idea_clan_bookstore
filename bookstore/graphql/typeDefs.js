const { gql } = require('apollo-server');

module.exports = gql`
  type Book {
    name: String
    description: String
    createdAt: String
    author:String,
    owner:String
  }

  input BookInput {
    name: String
    description: String
    author:String,
    owner:String
  }

  type User {
    name: String
    email: String
    password: String
    role: String
    isLogin: Int
    token: String
  }

  input UserInput {
    name: String
    email: String
    password: String
    role: String
  }

  type Query {
    book(ID: ID!): Book!
    getBooks: [Book]
    user(ID: ID!): User!
    getUsers: [User]
  }

  type Mutation {
    createBook(BookInput: BookInput): Book!
    deleteBook(ID: ID!): Boolean
    editBook(ID: ID!, BookInput: BookInput): Boolean
    register(UserInput: UserInput): User!
    login(email: String!, password: String!): User!
    logout(ID:ID!): Boolean
    editUser(ID: ID!, UserInput: UserInput): Boolean
    deleteUser(ID: ID!): Boolean
}
`;

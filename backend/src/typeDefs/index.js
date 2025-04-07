//tener  mucho cuidado aqui con este file 


const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const fs = require('fs');
const path = require('path');


const userTypeDefs = fs.readFileSync(path.join(__dirname, 'user.graphql'), 'utf8');
const employeeTypeDefs = fs.readFileSync(path.join(__dirname, 'employee.graphql'), 'utf8');


const baseTypeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = mergeTypeDefs([baseTypeDefs, userTypeDefs, employeeTypeDefs]);

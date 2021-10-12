const {  ApolloServer }= require('apollo-server');
const { ApolloServerPluginCacheControl } = require('apollo-server-core');

//graphql schema 
//has one query type that has the value String 
//string can never be null
const typeDefs =`
    type Query {
        info: String!
        feed: [Link!]!
      }

      type Mutation {
        post(url: String!, description: String!): Link!
      }
      type Link {
        id: ID!
        description: String!
        url: String!
        play: String
      }
`

const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for Graphql',
 
},{
  id: 'link-1',
  url: 'www.howtographql2.com',
  description: 'Secondary link',
  play: 'something else'
}]

//implimentation of the graphql schema
//resolver, resolves the query and returns the info field
//info field's value is a string
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
      },
      Link : {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
        play: (parent) => parent.play
      }
}

//passed in the bundled schema and resolvers 
//tells the API what operations are accepted 
//and how to resolve them
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
.listen()
.then(({url}) => console.log(`Server running on ${url}`))

const {  ApolloServer }= require('apollo-server');
const fs = require('fs');
const path = require('path');


//graphql schema 
//has one query type that has the value String 
//string can never be null


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
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
})

server
.listen()
.then(({url}) => console.log(`Server running on ${url}`))

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
        link: (parent, args) => {
         for(const item of links){
            if(item.id === args.id){
              console.log('found a match');
              return item
            } 
          }
          // return 'no link of that id';
        },
      },
      Mutation:{
        post: (parent, args)=>{
         let idCount = links.length;
          const link ={
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
          }
          links.push(link);
          return link;
        },
        updateLink: (parent, args) => {
          const link ={
            id: `link-${args.id}`,
            description: args.description,
            url: args.url,
          }
          return link;
        }
        
      },
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

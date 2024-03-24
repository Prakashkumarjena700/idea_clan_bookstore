const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const MongoDB="mongodb+srv://bookstore:bookstore@cluster0.wvlrj4s.mongodb.net/?retryWrites=true&w=majority"

const typeDefs= require('./graphql/typeDefs');
const resolvers= require('./graphql/resolvers');


const server= new ApolloServer({
    typeDefs,
    resolvers
})


mongoose.connect(MongoDB,{useNewUrlParser:true})
    .then(()=>{
        console.log('MongoDB connected successfully')
        return server.listen({port:500});
    })
    .then((res)=>{
        console.log(`Server is runing at ${res.url}`);
    })
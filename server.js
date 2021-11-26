const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require("graphql");

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

//resolver: attach function to be called when schema has to be executed
const root = {
    message: () => 
        "hello world!"
    
}


const app = express();
app.use(express.json());
const PORT = 5000;

app.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true //tool running on browser , gives UI
}));


app.listen(PORT, ()=>{
    console.log(`Server started on port : ${PORT}`);
})

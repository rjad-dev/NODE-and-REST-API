var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

var rootValue = {
  rollDice: ({ numDice, numSides }) => {
    var output = []
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  },
}

var app = express()
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
)
app.listen(000, () => {
    console.log("Running a GraphQL API server at localhost:4000/graphql")
})

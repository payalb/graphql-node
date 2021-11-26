const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require("graphql");

const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic:String): [Course]
    }

    type Mutation {
        addcourse(id: Int!, title: String!, author:String!, description: String!, topic: String!, url: String): Int
    }

    type Course{
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData  = [
    {
        id: 1,
        title: "Java Cookbook",
        author: "Ian Darwin",
        description: "Basics of Java",
        topic: "Java Intro",
        url: "https://www.oreilly.com/library/view/java-cookbook-3rd/9781449338794/"

    },{
        id: 2,
        title: "Basics of Java with Data Structures and Algorithms",
        author: "Lucy K.",
        description: "This is the course to pick if you are just getting into coding and want to build a strong foundation. Widely used in IT industry.",
        topic: "for Beginners and Experienced Learners",
        url: "https://www.codingninjas.com/courses/online-java-course?utm_source=google&utm_medium=[search]&utm_campaign=13447696943_121960398143_e_java%20course__526665571892_c&gclid=CjwKCAiA4veMBhAMEiwAU4XRr0lLYrnKDnV1X_TP0q1eSUSb8BKbncEuC_JRd1p_rkZ6JYFD0LaU-BoC9GMQAvD_BwE"

    }
]
/**
query getSingleCourse($courseId: Int!){
  	course(id: $courseId){
    	title
    	topic
    	author
    	description
    	url
  }
}
 */

function getCourse(args){
    console.log(args);
    return coursesData.filter(x => x.id === args.id )[0];
}

function getCourses(args){
    if(args.topic){
        return coursesData.filter(x=> x.topic === args.topic);
    }else{
        return coursesData;
    }
}

/**
mutation addnewcourse($id: Int!,$title: String!, $author: String!, $description: String!, $topic: String!, $url: String! ){
  addcourse(id: $id, title: $title, author:$author, description: $description, topic: $topic, url: $url)
}
*/
function addNewCourse(args){
    coursesData.push({"id": args.id, "title": args.title, "author": args.author, "description": args.description, "topic": args.topic, "url": args.url});
    return args.id;
}
//resolver: attach function to be called when schema has to be executed
const root = {
    course: getCourse,
    courses: getCourses,
    addcourse: addNewCourse
}


const app = express();
app.use(express.json());
const PORT = 5000;

app.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true 
}));


app.listen(PORT, ()=>{
    console.log(`Server started on port : ${PORT}`);
})

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const usersUrl = "https://jsonplaceholder.typicode.com/users";

const TemporaryUser = {
    id : "11",
    name : "Leonel Ceballos",
    username : "MEG Brazil",
}
const randomTakenPosts = [];
let cont = 1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));
app.set('view engine', 'ejs');

app.get("/", async (req, res)=>{
    try{
        const postResponse = await fetch(postsUrl);
        if(!postResponse.ok){
            console.error("Can not get the posts", postResponse.status, postResponse.statusText);
            return 0;
        }

        const userResponse = await fetch(usersUrl);
        if(!userResponse.ok){
            console.error("Can not get the users", userResponse.status, userResponse.statusText);
        }

        //json convertion
        const posts =  await postResponse.json();
        const users = await userResponse.json();

        //association users to posts
        const postsUsers = posts.map(post =>{
            const user = users.find(user => user.id === post.userId);
            return { ...post, user}
        })
        
        const totalPosts = posts.length;
        const limit = 25
        for(let i=0; i<=limit; i++){
            const randomIndex = Math.floor(Math.random()*((totalPosts - 1) - 0 + 1) + 0);
            randomTakenPosts.push(postsUsers[randomIndex])
        }
        res.render("index.ejs", {posts : randomTakenPosts, liked : false});
    } catch{
        console.error("Error", error.message)
    }
})

app.post('/submit', function(req, res){
    cont++;
    let title = req.body["title"];
    let postText = req.body["post"];
    let newPost = {
        user : TemporaryUser,
        id : 100 + cont,
        title : title,
        body : postText
    }
    randomTakenPosts.unshift(newPost);
    res.render("index.ejs", {posts : randomTakenPosts, liked : false});
})

app.listen(port)
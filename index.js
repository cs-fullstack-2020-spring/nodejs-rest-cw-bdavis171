// node.js REST classwork

// reference express server
const express = require('express');
const app = express();
app.use(express.json());

// define an empty variable that will store a new blog post
let blogPost;

// create an array to store all blog posts
const blogList = [];

// CREATE a new blog post. Use '/blogpost' as the route.
app.post('/blogpost', (req, res) => {
    // store each post into the array
    let newLength = blogList.push(req.body);
    blogList[newLength - 1].postId = newLength - 1;
    // store the req.body into the blogPost variable
    blogPost = blogList[newLength - 1];
    // display the new post
    res.send(blogPost);
    console.log(blogList);
})

// READ the blog post
app.get('/blogpost/:id', (req, res) => {
    // display the post entered in the url
    res.send(blogList[req.params.id]);
})

// UPDATE each blog post
app.put('/blogpost/:id', (req,res) => {
    // update the title and body of post
    blogList[req.params.id].postTitle = req.body.postTitle;
    blogList[req.params.id].postBody = req.body.postBody;
    // add update status for sanity
    blogList[req.params.id].status = 'updated';
    // display updated post
    res.send(blogList[req.params.id]);
    console.log(blogList);
})

// DELETE a blog post
app.delete('/blogpost/:id', (req,res) => {
    // delete the post selected by what was entered in the url
   blogList.forEach(
       (post,index) => {
           if(post.postId == req.params.id){
               blogList.splice(index,1);
           }
       }
   )
   res.send(blogList);
   console.log(blogList);
})

// CHALLENGE: create an endpoint that displays all post in the array
app.get('/bloglist', (req,res) => {
    res.send(blogList);
})

// listen to server
const port = 1997;
const host = 'localhost';
app.listen(port, host, () => {
    console.log(`listening to port ${port}`);
})
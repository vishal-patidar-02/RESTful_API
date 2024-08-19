const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

const port = 8080;
app.listen(port, () => {
  console.log(`server is listening to port: ${port}`);
});

let posts = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&s",
    username: "Yash",
    caption: "MY first post going to be viral",
    id: uuidv4(),
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&s",
    username: "Vivek",
    caption: "Really greatfull the i grabe my first internship",
    id: uuidv4(),
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&s",
    username: "yashi",
    caption: "So, what do you think about my looks",
    id: uuidv4(),
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Wjd-Cak78mooEfHTx64D7xhFtgBMZRFiiQ&s",
    username: "vinod",
    caption: "So, what do you think about my looks",
    id: uuidv4(),
  },
];

app.get("/posts", (req, res) => {
  res.render("show.ejs", { posts });
});

app.post("/posts", (req, res) => {
  let { username, url, caption } = req.body;
  let id = uuidv4();
  posts.push({ username, url, caption, id });
  res.redirect("/posts");
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id/edit", (req, res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id===p.id);
  res.render("edit.ejs", {post});
})

app.patch("/posts/:id", (req, res) =>{
   let {id} = req.params;
   let newCaption = req.body.caption;
   let post = posts.find((p)=>id === p.id);
   post.caption = newCaption;
   res.redirect("/posts")
});

app.delete("/posts/:id", (req, res) => {
  let {id} = req.params;
  posts = posts.filter((p)=> id !== p.id);
  res.redirect("/posts")
})

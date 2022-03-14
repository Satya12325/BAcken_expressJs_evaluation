const express =  require('express'); 
const port = 8000;
const users = require('./users.json');

function logger(req,res, next){
    console.log(`calling ${req.method} to ${req.url}`);
    next();
    console.log(`calling ${req.method} to ${req.url} sucessfully`)
}

let app = express();


app.get("/",(req,res)=>{
    // res.sendFile(`${__dirname}/index.html`);
    res.json({message:"API is Working"})
})

app.get("/api/addresses",(req,res)=>{
    // res.sendFile(`${__dirname}/index.html`);
    res.json(users)
})

app.post("/api/addresses", [logger,express.json()],(req,res)=>{
    console.log("inside post/users")
  
    users.push(req.body);
    res.json(req.body);
   
})

app.put("/api/addresses/:id",(req,res)=>{
    let {id} = req.params;
 
    let index = users.findIndex((user) => {
        return (user.id === Number(id))
    })

    if(index >= 0) {
        let user = users[index]
        
      
        res.json(user)
    }
    else {
        res.status(404)
    }

    console.log(id)
})

app.delete("/api/addresses/:id", (req,res)=>{
    let {id} = req.params;
    let index = users.findIndex((user) => {
        return (user.id === Number(id))
    })
    if(index >= 0) {
        let user = users[index]
      users.splice(index, 1)
        
      
        res.json(user)
    }
    else {
        res.status(404)
    }
})

app.listen(port,()=>{
    console.log(`Listining at port: ${port}`);
})

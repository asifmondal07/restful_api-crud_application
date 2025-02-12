const express=require("express");
const fs=require('fs')
const users=require("./MOCK_DATA.json");
const { error } = require("console");
const { stringify } = require("querystring");

const app=express();
const PORT=8000;

//middilware
app.use(express.urlencoded({extends:false}));

const saveUsers=(user)=>{
    fs.writeFileSync('./MOCK_DATA.json',JSON.stringify(user, null, 2))};

app.get('/users',(req,res)=>{
    const html=`
        <ul>
            ${users.map((user)=>`<li>${users.first_name}</li>`)}
        </ul>
    `;
    res.send(html);
})



//routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
}) ;

app.route('/api/users/:id').
get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user)
}).patch((req,res)=>{
    const id=Number(req.params.id);
    const body=req.body;
    console.log(body);

    const userIndex=users.findIndex((user)=>user.id === id);
    if(userIndex === -1)return res.status(404).json({message:"User Not Found"});

    //update User data
    users[userIndex]={...users[userIndex],...body};
    saveUsers(users)
    
    return res.json({ status: "success", updatedUser: users[userIndex] })
    
}).delete((req,res)=>{
    const id=Number(req.params.id);
    const delete_users=users.filter((user)=>user.id !==id);
    console.log(delete_users);
    if(users.length === delete_users)return res.status(404).json({message:"User Not Found"});
     
    saveUsers(delete_users)
        return res.json({ status: "success", delete:id});
    

})


app.post('/api/users',(req,res)=>{
    const body=req.body;
    console.log(body);
    users.push({id:users.length + 1 ,...body})
    saveUsers(users)
        return res.json({status:"succes",id:users.length})
    
})


app.listen(PORT,()=>console.log("Server Started At Port",PORT));

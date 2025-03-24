
const mongoose=require('mongoose');

const url='mongodb+srv://ankitjiyadav9:LXfvHSAZEFTsKoYb@cluster0.p3wf5.mongodb.net/Digital-Library-System?retryWrites=true&w=majority&appName=Cluster0'


const dbConnection=(dbUrl)=>{
  const connection=mongoose.createConnection(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true, 
  })

  connection.on('connected',()=>{
    console.log(`dbConnect Successfully ${dbUrl}`)
  })
  connection.on('error',(err)=>{
     console.error(`db connection error ${dbUrl},${err}`)
  })

  return connection

}


const db=dbConnection(url);

module.exports=db;

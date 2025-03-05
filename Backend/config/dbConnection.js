
const mongoose=require('mongoose');

const url='mongodb://localhost:27017/libraryManagement'


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

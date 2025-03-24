const condidateModel=require('../models/condidateModel');
// const cididateModel=require('../models/condidateModel');
  require('../models/sellerModel');
const condidate_detail_add= async(req,res)=>{
        try{
              const {name,mobile,libraryName,userId,address,id,status}=req.body;
              const imagePath = req.files["idImage"] ? `/uploads/idImage/${req.files["idImage"][0].filename}` : null;
              if(!name||!mobile || !mobile ||!libraryName || !userId ||!address || !id ||!status){
                return res.send({status:500,message:"All field is require.."});
              }else{
                  const newCondidate=await condidateModel.findOne({id});
                  if(newCondidate){
                    return res.send({status:500,message:"student All ready exist"});
                  }else{
                        const result=await condidateModel.create({
                            name,mobile,libraryName,userId,address,id,status,
                            idImage:imagePath
                        }) 
                        if(result){
                            return res.send({status:200,message:"student add successfully"});
                        }  else{
                            return res.send({status:500,message:"Interal server error"});
                        }                 
                  }
              }
        }catch(err){
            return res.send({status:500,message:err.message});
        }
}

const condidate_check=async(req,res)=>{
            try{
                const id=req.body.userId
                const candidates = await condidateModel.find().populate("userId");

                return res.send({status:200,data:candidates});
            }catch(err){
                return res.send({status:500,data:err.message});
            }
}


const all_condidate_detail=async (req,res)=>{
            try{
                    const result=await condidateModel.find();
                    if(result){
                        return res.send({status:200,data:result,message:"successful"})
                    }else{
                        return res.send({status:500,data:"Candidate not found"});
                    }
            }catch(err){
                 return res.send({status:500,data:err.message});   
            }
}



const edit_candidate = async (req, res) => {
    try {
        const { id: editId } = req.params; // Extract id from params
        console.log("++++", editId);

        const { name, mobile, libraryName, userId, address, id, status } = req.body;

        const imagePath = req.files?.["idImage"] 
            ? `/uploads/idImage/${req.files["idImage"][0].filename}` 
            : null;

        if (!name || !mobile || !libraryName || !userId || !address || !id || !status) {
            return res.status(400).json({ status: 400, message: "All fields are required." });
        }

        const updateData = { name, mobile, libraryName, userId, address, id, status };
        if (imagePath) updateData.idImage = imagePath;

        const result = await condidateModel.findByIdAndUpdate(editId, updateData, { new: true });

        if (result) {
            return res.status(200).json({ status: 200, message: "Candidate updated successfully", data: result });
        } else {
            return res.status(500).json({ status: 500, message: "Internal server error" });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
};


module.exports={
    condidate_detail_add,
    condidate_check,
    all_condidate_detail,
    edit_candidate
}









// const id=req.body.userId
//                 const candidates = await condidateModel.find({ userId: id })
//                 const use=candidates.userIdl
//                 const result=await sellerModel.findOne({use})
//                 return res.send({status:200,data:result});
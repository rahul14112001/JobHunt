import {Company} from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

///// REGISTER A COMPANY //////////////////////////
export const registerCompany=async(req,res)=>{
    try{
        const {companyName}=req.body;
        let companynamed=companyName;
        // console.log(companyName)
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }
        let company=await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"you can't register with same company",
                success:false
            });
        }
    
        // console.log(company)

        let companydet =await Company.create({
            name:companynamed,
            userId:req.id
        });
        return res.status(200).json({
            message:"Company registered successfully",
            companydet,
            success:true
        })
    }
    catch(err){
        // console.log(err);
        console.error(err)
    }
}


//////////////////// GET COMPANIES BY A USERID ///////////////////////////////
export const getCompany=async(req,res)=>{
    try{
        const userid=req.id; // logged in user Id
        // console.log(userid);
        const companies=await Company.find({userId:userid});
        if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success:false
            });
        }
        return res.status(200).json({
            companies,
            success:true
        })
    }
    catch(err){
        console.log(err);
    }
}


///////////////// GET COMPANY BY COMPANY ID ////////////////////////////
export const getCompanyById=async(req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            });
        }
        return res.status(200).json({
            company,
            success:true
        })
    }
    catch(err){
        console.log(err);
    }
}


////////// TO UPDATE COMPANY ////////////////////

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        // console.log(name,description,website,location);
        const file = req.file; // Assuming you're handling file uploads
        let logo=null;/// initialize logouri with null
        if(file){
            const fileUri=getDataUri(file);
            const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
            logo=cloudResponse.secure_url;
        }


        // Prepare data for update
        const updateData = { name, description, website, location ,logo};

        // Update company in the database
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // Check if the company was found and updated
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company data updated successfully",
            company,
            success: true
        });
    } catch (err) {
        console.error(err);
        
        // Return an error response
        return res.status(500).json({
            message: "An error occurred while updating the company.",
            success: false,
            error: err.message 
        });
    }
};
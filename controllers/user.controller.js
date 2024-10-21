import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

///////////// CONTROLLER FOR REGISTER i.e NEW USER /////////////////////////
export const register = async (req, res) => {
  try {
    // console.log("req body from backend",req.body);
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname, email, phoneNumber, password, role);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      /// ALL ARE MANDATORY FIELDS
      return res.status(401).json({
        message: "something is missing",
        success: false,
      });
    }
    const file = req.file; // Get the uploaded file (if any)
    let profilePhotoUrl = null; // Initialize variable for profile photo URL

    // Check if a file was uploaded
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url; // Set the URL if a photo was uploaded
    }
    const user = await User.findOne({ email }); /// IF USER ALREADY EXIST WITH THE GIVEN EMAIL ID THEN NO NEED TO REGISTER
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10); /// PASSWORD IS TO BE HASHED FOR SECURITY
    await User.create({
      /// NEW USER IS TO BE CREATED
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });
    // console.log("error ke upar hu bhai")
    return res.status(201).send({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/////////////// CONTROLLER FOR LOGIN i.e THE USER ALREADY EXIST //////////////////////////
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      //// ALL FIELDS ARE MANDATORY
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email }); // CHECK USER EXIST OR NOT WITH THE GIVEN MAILiD
    if (!user) {
      /// IF NOT EXIST THEN HAVE TO BE REGISTER FIRST
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password); /// PASSWORD MATCHING
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    //// CHECK ROLE IS CORRECT OR NOT
    if (role !== user.role) {
      return res.status(400).json({
        message: "account does not exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSize: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

///////////////////////// CONTROLLER FOR LOGOUT PAGE ///////////////////////////////////////////////

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////// CONTROLLER FOR UPDATE PROFILE //////////////////////////////////

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const resume = req.files?.resume; // Use req.files if you are uploading multiple files
    const profilePhoto = req.files?.profilePhoto; // Use req.files if you are uploading multiple files

    let resumeUrl = null; // Initialize variable for resume URL
    let profilePhotoUrl = null; // Initialize variable for profile photo URL

    // Check if a resume file was uploaded
    if (resume) {
      const resumeFileUri = getDataUri(resume[0]); // Access the first file in the array
      const cloudResponse = await cloudinary.uploader.upload(resumeFileUri.content);
      resumeUrl = cloudResponse.secure_url; // Set the URL if a resume was uploaded
    }

    // Check if a profile photo was uploaded
    if (profilePhoto) {
      const profilePhotoUri = getDataUri(profilePhoto[0]); // Access the first file in the array
      const cloudResponse = await cloudinary.uploader.upload(profilePhotoUri.content);
      profilePhotoUrl = cloudResponse.secure_url; // Set the URL if a profile photo was uploaded
    }

    let skillsArray;
    if (skills) skillsArray = skills.split(",").map(skill => skill.trim()); // Trim whitespace from skills

    const userId = req.id; // Middleware authentication should provide this value
    let user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // UPDATING DATA
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    // Update resume information only if a new resume was uploaded
    if (resumeUrl) {
      user.profile.resume = resumeUrl; // SAVE THE CLOUDINARY URL
      user.profile.resumeOriginalName = resume[0].originalname; // SAVE THE ORIGINAL NAME OF FILE
    }

    // Update profile photo information only if a new profile photo was uploaded
    if (profilePhotoUrl) {
      user.profile.profilePhoto = profilePhotoUrl; // SAVE THE CLOUDINARY URL
      user.profile.profilePhotoOriginalName = profilePhoto[0].originalname; // SAVE THE ORIGINAL NAME OF FILE
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ // Return a response with status 500 on error
      message: "Server error while updating profile",
      success: false,
    });
  }
};
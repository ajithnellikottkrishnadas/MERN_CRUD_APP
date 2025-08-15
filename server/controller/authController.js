import bcrypt from "bcryptjs"
import User from "../model/userModel"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    try {

        const { email, passwor } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "user already exist" });

        const hashedPassword = await bcrypt.hash(passwor, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "user successfully registered" })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const loginUser = async (req, res) => {

    try {

        const {email,passwor}= req.body;

        const userCheck= await User.findOne({email});
        if(!userCheck) return res.status(400).json({message:"User not exist"});

        const isMatch= await bcrypt.compare(passwor, userCheck.password);
        if(!isMatch) return res.status(400).json({message:" Wrong password "});

        const token= jwt.sign(
            {
                id: User._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        )

        res.json({message:"login succesfull", token})


    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }

}
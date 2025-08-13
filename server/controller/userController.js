import userModel from "../model/userModel.js"

const create = async (req, res) => {
    try {

        const {name,address,email } = req.body;
        const userExist = await userModel.findOne({ email });

        /* const newUser = new userModel(req.body); // Create a document in memory
            const { email } = newUser; 
            const userexist= await newuser.findone({email})
            */
        if (!name || !email || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (userExist) {
            return res.status(400).json({ message: "user alreayd exist" })
        }
        const newUser = new userModel(req.body);
        const saveData = await newUser.save();

        res.status(201).json({ message: "User created succesfully" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const getAllUser = async (req, res) => {
    try {
        const userData = await userModel.find();
        if (!userData) return res.status(404).json({ message: "user not found" });
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await userModel.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const updateUser = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await userModel.findById(id);
        const{email,name,address}= req.body;

         if (!name || !email || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!userExist) {
            return res.status(404).json({ message: "user not found" });
        }
        const updateData = await userModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
         res.status(201).json({ message: "User Updated succesfully" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
        const userCheck = await userModel.findById(id);
        if (!userCheck) {
            return res.status(404).json({ message: "user not exist" })
        }

        await userModel.findByIdAndDelete(id);
        res.status(200).json({ errorMessage: "user deleted succesfully" })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export { create, getAllUser, getUserById, updateUser, deleteUser };
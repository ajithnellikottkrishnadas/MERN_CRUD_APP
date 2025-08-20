import customerModel from "../model/customerModel.js";


const create = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const employeeId = req.employee._id; 

    if (!name || !email || !address || !phone)
      return res.status(400).json({ message: "All fields are required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const customerExist = await customerModel.findOne({ email });
    if (customerExist)
      return res.status(400).json({ message: "Customer already exists" });

    const newCustomer = new customerModel({ name, email, address, phone, employee: employeeId });
    const savedCustomer = await newCustomer.save();

    res.status(201).json({ message: "Customer created successfully", data: savedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllCustomers = async (req, res) => {
  try {
    const employeeId = req.employee._id;
    const customers = await customerModel.find({ employee: employeeId });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeId = req.employee._id;

    const customer = await customerModel.findOne({ _id: id, employee: employeeId });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone } = req.body;
    const employeeId = req.employee._id;

    const updatedCustomer = await customerModel.findOneAndUpdate(
      { _id: id, employee: employeeId },
      { name, email, address, phone },
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer updated successfully", data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeId = req.employee._id;

    const deletedCustomer = await customerModel.findOneAndDelete({ _id: id, employee: employeeId });
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { create, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer };

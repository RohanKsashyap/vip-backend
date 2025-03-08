import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());


// defining origin,and methods
const corsOption = {
  // defining origin,and methods
      origin:["https://vipkitchen.in"],
      methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
      allowedHeaders:["Content-Type", "Authorization"],
      credentials:true
  }


app.use(cors(corsOption));
app.options("*", cors(corsOption));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Define Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// POST route to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    // Save to MongoDB
    const newContact = new Contact({ name, phone, email, service, message });
    await newContact.save();

    



    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

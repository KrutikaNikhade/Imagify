import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    console.log("generateImage req.body:", req.body); // 🔍 Debug incoming body

    const { userId, prompt } = req.body;

    const user = await userModel.findById(userId);
    console.log("generateImage user:", user); // 🔍 Debug user from DB

    if (!user || !prompt) {
      console.log("❌ Missing user or prompt");
      return res.json({ success: false, message: "Missing details here" });
    }

    if (user.creditBalance <= 0) {
      console.log("❌ User has no credits left");
      return res.json({
        success: false,
        message: "No credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    console.log("✅ Image generated successfully");

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log("generateImage error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

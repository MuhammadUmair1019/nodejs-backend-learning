import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cloudinary from 'cloudinary'
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";

// Routes
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as categoryRoutes } from "./routes/categoryRoutes.js";
import { router as menuItemRoutes } from "./routes/menuItemRoutes.js";
import { router as cartRoutes } from "./routes/cartRoutes.js";
import { router as orderRoutes } from "./routes/orderRoutes.js";
import { router as inventoryRoutes } from "./routes/inventoryRoutes.js";
import { router as dashboardRoutes } from "./routes/dashboardRoutes.js";

// Middleware
import { errorHandler } from "./middleware/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const fileSchema = new mongoose.Schema(
  {
    originalName: String,
    cloudinaryUrl: String,
    cloudinaryId: String,
    fileType: String,
    fileSize: Number
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

/* ------------------ Cloudinary Config ------------------ */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get("/", (req, res) => {
  res.send("OK");
});

/* ------------------ Multer Config ------------------ */
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) cb(null, true);
//     else cb(new Error("Only image files allowed"), false);
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

/* ------------------ Upload Route ------------------ */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    // const cloudinaryResult = await new Promise((resolve, reject) => {
    //   cloudinary.v2.uploader
    //     .upload_stream(
    //       { folder: "express_uploads" },
    //       (error, result) => {
    //         if (error) reject(error);
    //         else resolve(result);
    //       }
    //     )
    //     .end(req.file.buffer);
    // });

    const cloudinaryResult = await cloudinary.uploader
      .upload(
        req.file.path,
        {
          folder: "express_upload"
        }
      )
      .catch((error) => {
        console.log(error);
      });


    // console.log("cloudinaryResult", cloudinaryResult)
    // Save file data in DB
    const savedFile = await File.create({
      originalName: req.file.originalname,
      cloudinaryUrl: cloudinaryResult.secure_url,
      cloudinaryId: cloudinaryResult.public_id,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    });

    res.status(201).json({
      message: "File uploaded & saved to DB",
      file: savedFile
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
});


// Mount routes
app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handler (must be last)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import bodyParser from "body-parser";
import express  from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import  path from "path"
import cors from "cors"
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { verifyToken } from "./src/middleware/auth.js";
import { register } from "./src/controllers/auth.js";
import authRoutes from "./src/routes/auth.js"
import userRoutes from "./src/routes/users.js"
// import postRoutes from "./src/routes/posts.js"
// import { createPost } from "./src/controllers/posts.js";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy:"cross-origin"
}))
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

// file storage_para guardar los archivos
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file ,cb){
        cb(null,file.originalname);
    },
});

const upload = multer({storage});
// routes with files
app.post("/auth/register",upload.single("picture"),register)
// app.post("/auth/register",upload.single("picture"),verifyToken,register)
// app.post("/posts",verifyToken,upload.single("picture"),createPost)
// ROUTES
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
// app.use("/posts",postRoutes)
// MONGOOSE SETUP
const PORT = process.env.PORT || 6000;
mongoose.set('strictQuery',false)
mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        app.listen(PORT,()=> console.log(`Server runnig port: ${PORT}`));
    })
    .catch((error)=>console.log(`${error} did not  connect`));



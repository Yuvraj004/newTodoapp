import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Types, Schema } from "mongoose";
import morgan from "morgan";
import cors from "cors";
import ServerlessHttp from "serverless-http";
// Create the Express app
const app = express();
const serverless =ServerlessHttp;
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
const router = express.Router();

// Connect to MongoDB

mongoose.set("strictQuery", true);

const mongoURI =
  "mongodb+srv://yuvrajchat:q7Kqsk24EWqksxS2@todosstorage.y5xvybu.mongodb.net/?retryWrites=true&w=majority";

// const options: ConnectOptions = ;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string;
  // Use `Types.ObjectId` in document interface...
  _id: Types.ObjectId;
}
// Define the user schema and model
const userSchema = new mongoose.Schema<IUser>({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId().toString(),
  },
  name: { type: String },
  email: { type: String, unique: true,required:true },
  password: { type: String },
});

const todoSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,

    default: () => new Types.ObjectId().toString(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: { type: String },
  description: { type: String },
});

const User = mongoose.model("User", userSchema,'user');
const Todo = mongoose.model("Todo", todoSchema,'todos');
// Middleware for user authentication
const authenticateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Authentication failed");

    jwt.verify(token, "secret", (err: any, payload: any) => {
      if (err) {
        return res.status(401).json({ error: err });
      }
      //finding the userdata using the id from above
      const { _id } = payload;
      User.findById(_id).then((userdata) => {
        req.user = userdata;
        next();
      });
    });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

// Routes
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name,email, password } = req.body;
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const newUser:any = new User({
      name:name,
      email: email,
      password: hashedPassword,
    });
    
    await newUser.save();
   
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {

    const user:any = await User.findOne({email:req.body.email});
    const passwordMatch = await bcryptjs.compare(req.body.password, user.password!);
    if (!passwordMatch) throw new Error("Invalid password");
    const token = jwt.sign({ _id: user._id }, "secret");
    const { _id ,email } = user;
    res.status(200).json({ token, user: { _id, email } });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
});

router.get("/todos", authenticateUser, async (req: any, res: Response) => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const userID = new Types.ObjectId(req.user._id);
  if (userID != null) {
    const todos = await Todo.find({ user: userID }); // Assuming you have a Todo model and each todo has a 'user' field representing the user who created it
    res.json({ todos });
  } else {
    res.status(401).json({ message: "Authentication fail" });
  }
});

router.post("/todos", authenticateUser, async (req: any, res: Response) => {
  const { title, description } = req.body;
  // Save the todo to the database
  const todo = new Todo({
    _id: new Types.ObjectId(),
    title,
    description,
    user: req.user._id,
  });
  const newTodo = await todo.save();
  res.json({ newTodo });
});

router.put("/updateTodo/:id", authenticateUser, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    
    if (updatedTodo) {
      console.log(updatedTodo);
      res.status(200).json({ todo: updatedTodo });
    } else {
      res.status(401).json({ message: "Updation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/todos/:id", authenticateUser, (req: Request, res: Response) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((deletedTodo) => {
      if (deletedTodo) {
        res.json({ message: "Deletion successful" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get('/',(req,res)=>{
  res.json({
    'hello':'hi'
  });
});
// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
app.use('/.netlify/functions/index',router);

module.exports.handler = serverless(app);
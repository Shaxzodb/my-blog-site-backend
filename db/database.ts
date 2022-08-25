import mongoose from "mongoose";
import dotenv from "dotenv"; // dotenv is a module for loading environment variables from a .env file into process.env.
dotenv.config(); // load the .env file
mongoose.connect(`${process.env.MONGODB_URI}`) // connect to mongodb
    .then(() => console.log("Malumotlar Bazasiga Ulandi..."))
    .catch((err: Error) => console.log(`Malumotlar Bazasida Ulanishda Xato!: => ${err}`));

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["user", "admin", "super_admin"],
        default: "user"
    }
});
const User = mongoose.model("Users", UserSchema);

const ArticleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    date: {
        type: Date,
        required: true
    },

});
const Article = mongoose.model("Articles", ArticleSchema);

export { User, Article };







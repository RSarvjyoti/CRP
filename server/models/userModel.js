const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true, 
        trim: true,     
    },
    email: {
        type: String,
        required: true, 
        unique: true,   
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], 
    },
    password: {
        type: String,
        required: true, // Make the password field mandatory
        minlength: 6,   // Require at least 6 characters for the password
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current timestamp
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = model("User", userSchema);

module.exports = User;

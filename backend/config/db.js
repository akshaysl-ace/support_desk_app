const mongoose = require("mongoose");

const connectDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.log(`Error Occured --> ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDataBase;
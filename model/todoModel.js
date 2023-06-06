// Require mongooes
// From mongoose we use a method whivh is Schema(this defines the structure of the document would liek to store in a collection,its the thing thta wraps around,note the S in Schema is capiterlised)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const traineeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    }
},{timestamps:true})

//lets create our model(model is what surrounds the Schema and provides us with an interface by which to communicate with our DB)

const Trainees =mongoose.model("Trainees",traineeSchema)

module.exports = Trainees
const { Schema, model } = require('mongoose');

const pollsSchema = new Schema({
    
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  email: {
    type: Schema.Types.String,
    ref: 'Email'
  },
  // correctpassword: {
  //   type: Schema.Types.Boolean,
  //   ref: 'CorrectPassword'
  // },
  
  name: {type: String, required: [true,'se requiere el nombre']},
  description: {type: String, required: [true,'se requiere la descripción']},
  totalVotes: Number,
  //options: [{value: String, votes: {type: Number, default: 0}}]
  optionOne: {value: {type: String, required: [true,'se requiere la opción 1']}, votes: {type: Number, default: 0}},  
  optionTwo: {value: {type: String, required: [true,'se requiere la opción 2']}, votes: {type: Number, default: 0}},
  optionThree: {value: String, votes: {type: Number, default: 0}},
  optionFour: {value: String, votes: {type: Number, default: 0}},
  status: {
        type: Boolean,
        default: false
      }
})

pollsSchema.pre('save', function (next) {
  try {
    this.name > 0
    console.log(this.password)
    next();
  } catch (error) {
    next(error)
  }
})

module.exports = model('Poll', pollsSchema)


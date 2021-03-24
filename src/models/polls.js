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
  
  name: {type: String, required: true},
  description: String,
  totalVotes: Number,
  //options: [{value: String, votes: {type: Number, default: 0}}]
  optionOne: {value: {type: String, required: true}, votes: {type: Number, default: 0}},  
  optionTwo: {value: {type: String, required: true}, votes: {type: Number, default: 0}},
  optionThree: {value: String, votes: {type: Number, default: 0}},
  optionFour: {value: String, votes: {type: Number, default: 0}},
  status: {
        type: Boolean,
        default: false
      }
})



module.exports = model('Poll', pollsSchema)


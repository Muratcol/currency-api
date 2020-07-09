const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  userName: {
    type: String,
  },
  pair: {
    type: String,
  },
  limit: {
    type: Number,
  },
  conditionName: {
    type: String,
  },
  frequency: {
    type: String,
  },
  websitePopup: {
    type: Boolean,
  },
  emailNotify: {
    type: Boolean,
  },
  alerStatus: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AlertForm", AlertSchema);

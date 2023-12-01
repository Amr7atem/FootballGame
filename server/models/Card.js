const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;

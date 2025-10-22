// models/derivationCounterModel.js
const mongoose = require("mongoose");

const DerivationCounterSchema = new mongoose.Schema(
  {
    walletSlot: { type: Number, unique: true, required: true }, // 1..4
    nextIndex: { type: Number, required: true, default: 0 },    // next index to allocate
  },
  { timestamps: true }
);


module.exports = mongoose.model("DerivationCounter", DerivationCounterSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { randomUUID } = require('crypto');

const ticketSchema = new Schema({
    code: {
        type: mongoose.Schema.Types.UUID,
        default: () => randomUUID(),
        index: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: () => new Date()
    },
    amount: {
        type: Number,
        required: [true, "el precio es obligatorio"]
    },
    purchaser: {
        type: String,
        required: [true, "el email del comprador es obligatorio"]
    }
}, { timestamps: true });

module.exports = mongoose.model('ticket', ticketSchema);
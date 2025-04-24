const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    category_description: { type: String, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    is_active: { type: Boolean, default: true },    
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);

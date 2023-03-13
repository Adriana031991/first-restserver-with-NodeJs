const {Schema, model } = require('mongoose')

const ProductSchema = Schema({ 
    name: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true, 
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: { type: String,},
    available: { type: String, default:true},
    image: { type: String, 
        // default: ''
    },
    
}, { versionKey: false})

ProductSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();
    return data
}

module.exports = model('Product', ProductSchema)
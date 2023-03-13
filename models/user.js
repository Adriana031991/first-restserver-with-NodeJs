const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, ' the name is required']
    },
    email: {
        type: String,
        required: [true, 'the email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'the password is required'],
    },
    image: {
        type: String,
        // default: ''
    },
    role: {
        type: String,
        required: [true, 'the role is required'],
        enum: ['Admin_Role', 'User_Role']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
}, { versionKey: false})

// para que no  se vea la propiedad __v y password del modelo creado

UserSchema.methods.toJSON = function () {
    const { __v, password, ...userData } = this.toObject();
    return userData
}


module.exports = model('User', UserSchema);
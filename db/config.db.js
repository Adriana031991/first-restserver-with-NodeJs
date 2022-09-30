
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN_VISUAL_ESTUDIO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: true,
        });

        console.log('conexion lista')


    } catch (error) {
        console.log('error', error)
        throw new Error('Error in connection with database')
    }
}


module.exports = {
    dbConnection
}
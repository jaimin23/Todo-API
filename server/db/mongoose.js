var mongoose = require('mongoose');

mongoose.Promoise = global.Promoise;
mongoose.connect(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });


module.exports = {
    mongoose
};
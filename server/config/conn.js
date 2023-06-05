const mongoose = require('mongoose');

function dbConnect() {
  mongoose.connect("mongodb://localhost:27017/event").then(()=>{
      console.log('Database connected');
    })
    .catch((err) => {
      console.log('Database error:\n' + err);
    });
}

module.exports = dbConnect;
              
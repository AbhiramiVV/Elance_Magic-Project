const mongoose = require('mongoose');

function dbConnect() {
  mongoose.connect(process.env.MONGOOSE_CONNECT).then(()=>{
      console.log('Database connected');
    })
    .catch((err) => {
      console.log('Database error:\n' + err);
    });
}

module.exports = dbConnect;
              
var createConnection = require('typeorm').createConnection;

createConnection().then(()=>{
    console.log("Conected successfully");
}).catch((err)=>{
    console.log(err)
});  

// module.exports = createConnection;
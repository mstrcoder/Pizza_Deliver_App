const mongoose = require('mongoose');
const app= require('./app');
mongoose
  .connect(
    "mongodb+srv://admin:Ifham@786@cluster0.mhiok.mongodb.net/Pizza_Delivery_App?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => {
    // console.log(con.connection);
    console.log("We are Connected to the Database");
  });


const PORT=process.env.PORT||5000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})
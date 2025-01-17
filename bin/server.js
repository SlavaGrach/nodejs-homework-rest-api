const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });

const app = require('../app');

const { DB_HOST, PORT = 3000 } = process.env;

//connect to database
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Error: ${error.message}`);
    server.close(() => {
      return process.exit(1);
    });
  });

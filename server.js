const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 8002;

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => console.log('Connected successfully'));
  })
  .catch(error => {
    console.log({ error });
  });

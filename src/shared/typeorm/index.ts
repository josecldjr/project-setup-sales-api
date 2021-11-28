import { createConnection } from 'typeorm';

const connection = createConnection();

connection
  .then(() => {
    console.log('Connected successfully to database');
  })
  .catch(err => {
    console.log(err);

    return err;
  });

export default connection;

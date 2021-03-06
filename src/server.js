import './setup.js';
import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(process.env.NODE_ENV);
  console.log(process.env.DB_DATABASE);
});

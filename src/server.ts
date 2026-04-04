import app from './app.js';
import conf from './config/index.js';

const port = conf.PORT

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

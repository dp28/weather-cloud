'use strict';
import * as express from 'express';

import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;
const FORCE_IPv4 = '0.0.0.0';

app.use('/', routes);

const server = app.listen(PORT, FORCE_IPv4, () => {
  const {address, port} = server.address();

  console.log(`weather-cloud listening at http://${address}:${port}`);
});

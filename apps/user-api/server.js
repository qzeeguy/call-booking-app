const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();
app.use(cors())

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const client = require('prom-client');
const { httpRequestTimer, counter } = require('./metrics');
const register = new client.Registry();

// Register the histogram
register.registerMetric(httpRequestTimer);
register.registerMetric(counter);

//connectDB();
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('⚠️ MongoDB not connected (no MONGO_URI)');
}

app.use(express.json());

app.use('/api', routes);

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
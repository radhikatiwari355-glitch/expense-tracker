const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const expensesRouter = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/expenses', expensesRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1);
  });

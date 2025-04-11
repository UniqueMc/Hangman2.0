
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

mongoose.set('strictQuery', false);


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/hangman_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const customerSchema = new mongoose.Schema({
  name: String,
  wins: { type: Number, default: 0 },
  totalGames: { type: Number, default: 0 },
});

const Customer = mongoose.model('Customer', customerSchema);


app.post('/api/update-win', async (req, res) => {
  const { customerId, didWin } = req.body;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    customer.totalGames += 1;
    if (didWin) {
      customer.wins += 1;
    }
    await customer.save();
    res.json({ wins: customer.wins, totalGames: customer.totalGames });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Backend API running on port ${port}`);
});

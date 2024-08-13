const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/reservation', (req, res) => {
  res.render('reservation', { order: null }); // Updated to 'order'
});

app.get('/payment', (req, res) => {
  res.render('payment', { paymentStatus: null });
});

app.get('/manage', (req, res) => {
  res.render('manage', { manageStatus: null });
});

app.get('/api/check-order', (req, res) => { // Updated from 'check-reservation' to 'check-order'
  const { orderId } = req.query; // Updated from 'reservationId' to 'orderId'
  if (orderId === '1305TO52') {
    const order = { // Updated from 'reservation' to 'order'
      orderNumber: '1305TO52',
      productName: 'Sea-Doo GTX Limited 300', // Example product
      quantity: 1,
      price: '$249' // Updated price
    };
    res.render('reservation', { order }); // Updated to 'order'
  } else {
    res.render('reservation', { order: null }); // Updated to 'order'
  }
});

app.get('/api/check-payment', (req, res) => {
  const { paymentId } = req.query;
  const paymentStatus = {
    status: 'Paid',
    paymentId
  };
  res.render('payment', { paymentStatus });
});

app.post('/api/manage-order', (req, res) => { // Updated from 'manage-booking' to 'manage-order'
  const { orderId, changes } = req.body; // Updated from 'bookingId' to 'orderId'
  const manageStatus = {
    status: 'Success',
    orderId,
    changes
  };
  res.render('manage', { manageStatus });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const path = require('path');

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB()

app.use(cors());

app.use(express.json({ extended: true }));

// Imágenes para las categorías
app.use('/assets', express.static('public/assets'));

// Rutas de las categorías
app.use('/api/categories', require('./routes/categories'));

// Rutas de los platos
app.use('/api/platos', require('./routes/platos'));

app.use('api/carrito', require('./routes/carritos'));

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/pedidos', require('./routes/pedido'));

app.use('/uploads', express.static(path.resolve('./public/assets/categorias')));




app.post('/checkout', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.items.map((items) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: items.name,
              images: [items.img],
            },
            unit_amount: items.price * 100,
          },
          quantity: items.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:4000/success.html',
        cancel_url: 'http://localhost:4000/cancel.html',
      });
  
      res.status(200).json(session);
    } catch (error) {
      console.log(error);
    }
  });

app.listen(4000, () => {
    console.log("Server is running on port: ", 4000);
    
})
import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
const PORT = 8000;
//const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('/public'));
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

app.listen(PORT, () => {console.log(`Sevidor eschuchando en el puerto ${PORT}`)});


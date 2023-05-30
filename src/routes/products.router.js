import {Router } from 'express';

const router = Router();
const products = []

router.get('/', (req, res) => {
    const limit = req.query.limit || products.length;
    res.send(products.slice(0, limit));
});

router.get('/:pid', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.pid));
    if (!product) {
        res.status(404).json({error: 'Producto no encontrado'});
    } else {
        res.json(product);
    }
});

router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbails } = req.body;
    
    if (!title || !description || !code || !price || !status || !stock || !category) {
        res.status(400).json({error: 'Faltan campos obligatorios'});
       } else {
        const newProduct = {
            title,
            description,
            code,
            price,
            status: true, 
            stock,
            category,
            thumbails: thumbails || []
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
        
    }
});

router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const { title, description, code, price, status, stock, category, thumbails } = req.body;

    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        res.status(404).json({error: 'Producto no encontrado'});
    } else {
        products[productIndex] = {
            ...products[productIndex],
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbails
        }; 
        res.json(products[productIndex]);      
        }
});

router.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        res.status(404).json({error: 'Producto no encontrado'});
    } else {
        const deletedProduct = products.splice(productIndex, 1);
        res.json(deletedProduct[0]);
    }
});


function generateProductId() {
    return Date.now().toString();
}

export default router;
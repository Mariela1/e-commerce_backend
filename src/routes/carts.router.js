import {Router } from 'express';

const router = Router();
const carts = []

router.get('/', (req, res) => {
    res.send(carts);
});

router.post('/', (req, res) => {
    const newCart = {
        id: generateCartId(),
        products: []
    };

    carts.push(newCart);
    res.status(201).json(newCart);
    res.send({status: 'Cart added'});
});

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
        res.status(404).json({error: 'Carrito no encontrado'});
    } else {
        res.json(cart.products);
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cart = carts.find(c => c.id === cartId);
    if (!cart) { 
        res.status(404).json({error: 'Carrito no encontrado'});
    } else {
        const existingProduct = cart.products.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push(
                {
                    product: productId,
                    quantity
                });
        }
        res.json(cart.products);
    }
});

function generateCartId() {
    return Date.now().to
    
    String();
}

export default router;
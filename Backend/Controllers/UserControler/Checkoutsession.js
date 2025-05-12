
const stripe=require('stripe')(process.env.STRIPE_KEY)
async function Checkoutsession(req, res) {
    try {
        const products = [...req.body];
        console.log(products);

        const lineItems = products.map((product) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.productname,
                        images: [product.productpic],
                    },
                    unit_amount: Math.round(Number(product.price) * 100),
                },
                quantity: product.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
}

module.exports=Checkoutsession
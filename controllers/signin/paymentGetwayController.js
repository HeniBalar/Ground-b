

const User = require("../../models/User");
const jwt = require("jsonwebtoken")
const cloudinary = require("../../utils/cloudinary")
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

let stripeapikey = 'sk_test_51MlA78SFgjETd7UcrIdZgCnr5kscU8rZ8AB1bYVH0PvrV2BIxf269OIsA00HRqsjAGJWPIIwu7Q0DEw22QIhBg3x00VROjhYHh'

const stripe = require('stripe')(stripeapikey);


exports.paymentGetway = async (req, res) => {
  try {

    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ id: session.id });




  } catch (error) {
    res.send({ error: error.message })
  }
}


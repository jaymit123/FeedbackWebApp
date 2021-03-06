/**
 * Add Payment routes to express App
 */

 //Load dependencies
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const dynamodb = require("../services/DynamoDB");
const requireLogin = require("../middlewares/requireLogin");

//Confirm payment by adding credits to user account
module.exports = app => {
  app.post("/api/payment", requireLogin, async (req, res) => {
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "$5 for 5 credits",
        source: req.body.id
      });
      const user = await dynamodb.addCredits(req.user.googleId, 5);
      res.send(user);
    } catch (e) {
      console.log(e);
    }
  });
};

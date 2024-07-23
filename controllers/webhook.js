const stripe = require('stripe')('sk_test_...');


// This is your Stripe CLI webhook secret for testing your endpoint locally.
//this is test i didn't forget it!
const endpointSecret = "whsec_645e6f003cbfefa0bdd28481b7d2687418e0bddb4aff771a587461cdb7964d17";

const webhook = async (request, response) => {
    console.log('Webhook called')
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            try{
                await require("../models/orderModel").updateOrder(paymentIntentSucceeded.metadata.orderId, "COMPLETED");
            }catch(err){
                response.status(400).send(`Webhook Error: ${err.message}`);
            }
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            try{
                await require("../models/orderModel").updateOrder(paymentIntentFailed.metadata.orderId, "FAILED");
            }
            catch(err){
                response.status(400).send(`Webhook Error: ${err.message}`);
            }
            break;
        case "payment_intent.expired":
            const paymentIntentExpired = event.data.object;
            try{
                await require("../models/orderModel").updateOrder(paymentIntentExpired.metadata.orderId, "CANCELLED");
            }
            catch(err){
                response.status(400).send(`Webhook Error: ${err.message}`);
            }
            break
        case "checkout.session.expired":
            const sessionExpired = event.data.object;
            try{
                await require("../models/orderModel").updateOrder(sessionExpired.metadata.orderId, "CANCELLED");
            }
            catch(err){
                response.status(400).send(`Webhook Error: ${err.message}`);
            }
            break
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
};
module.exports = webhook;
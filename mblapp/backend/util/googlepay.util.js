 async function googlepay (req, res)  {
    const paymentToken = req.body.paymentMethodData.tokenizationData.token;
  
    try {
      const paymentResult = await processPaymentWithGateway(paymentToken);
      
      if (paymentResult.success) {
        res.status(200).json({ success: true, message: 'Payment processed successfully' });
      } else {
        res.status(500).json({ success: false, message: 'Payment processing failed' });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(500).json({ success: false, message: 'Payment processing error' });
    }
  };
  
  async function processPaymentWithGateway(paymentToken) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount, 
        currency: 'usd',
        payment_method: paymentToken,
        confirmation_method: 'manual',
        confirm: true,
      });
  
      if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
        return { success: false, message: 'Additional authentication required' };
      } else if (paymentIntent.status === 'succeeded') {
        
        const charge = await stripe.charges.create({
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          description: 'Google Pay charge',
          payment_intent: paymentIntent.id,
        });
        return { success: true, charge };
      } else {
        return { success: false, message: paymentIntent.status };
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return { success: false, message: error.message };
    }
  }
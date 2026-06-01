exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { lineItems, shipping, paypalOrderId } = JSON.parse(event.body);

    const order = {
      external_id: `NC-${Date.now()}`,
      label: `Nettes Corner - PayPal ${paypalOrderId}`,
      line_items: lineItems.map(item => ({
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity
      })),
      shipping_method: 1,
      address_to: {
        first_name: shipping.firstName,
        last_name: shipping.lastName,
        email: shipping.email,
        phone: shipping.phone || "",
        country: shipping.country,
        region: shipping.state || "",
        address1: shipping.address1,
        address2: shipping.address2 || "",
        city: shipping.city,
        zip: shipping.zip
      }
    };

    const response = await fetch(
      "https://api.printify.com/v1/shops/27748943/orders.json",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: result })
      };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true, orderId: result.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

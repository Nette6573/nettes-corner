exports.handler = async () => {
  try {
    const response = await fetch(
      "https://api.printify.com/v1/shops/27748943/products.json?limit=100",
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        }
      }
    );

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json"
      },
      body: text
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};

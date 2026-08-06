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

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data, null, 2)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
        stack: error.stack
      })
    };
  }
};

exports.handler = async () => {
  try {
    const response = await fetch(
      "https://api.printify.com/v1/shops/27748943/products.json",
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        }
      }
    );

    const data = await response.json();

    const products = data.data.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.images?.[0]?.src || "",
      images: product.images || [],
      visible: product.visible,
      price:
        (product.variants?.find(v => v.is_enabled)?.price ||
          product.variants?.[0]?.price ||
          0) / 100,
      options: product.options,
      variants: product.variants,
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(products)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
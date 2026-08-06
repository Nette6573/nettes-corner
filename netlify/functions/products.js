exports.handler = async () => {
  try {
    const response = await fetch(
      "https://api.printify.com/v1/shops/27748943/products.json?limit=50",
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    const products = data.data.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.images?.find(i => i.is_default)?.src || p.images?.[0]?.src || "",
      images: p.images || [],
      options: p.options || [],
      variants: p.variants || [],
      price: (p.variants?.find(v => v.is_enabled)?.price || 0) / 100
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(products)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};

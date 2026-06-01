exports.handler = async () => {
  try {
    const response = await fetch(
      "https://api.printify.com/v1/shops/27748943/products.json?limit=100",
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    const products = (data.data || []).map(p => ({
      id: p.id,
      title: p.title,
      description: p.description || "",
      image: p.images?.[0]?.src || "",
      images: (p.images || []).map(img => ({
        src: img.src,
        variant_ids: img.variant_ids || []
      })),
      options: p.options || [],
      variants: (p.variants || []).filter(v => v.is_enabled).map(v => ({
        id: v.id,
        title: v.title,
        price: v.price / 100,
        options: v.options,
        is_enabled: v.is_enabled,
        is_available: v.is_available !== false
      })),
      price: ((p.variants?.find(v => v.is_enabled)?.price || p.variants?.[0]?.price || 0) / 100)
    }));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(products)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

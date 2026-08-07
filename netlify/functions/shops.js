exports.handler = async () => {
  const response = await fetch(
    "https://api.printify.com/v1/shops.json",
    {
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
      }
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2)
  };
};

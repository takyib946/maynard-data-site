export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.KINGFLEXY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Supplier API is not configured"
    });
  }

  try {
    const response = await fetch(
      "https://api.kingflexygh.com/api/v2/packages",
      {
        headers: {
          Authorization: apiKey,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(502).json({
      error: "Could not reach supplier"
    });
  }
}

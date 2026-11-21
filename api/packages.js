
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

    const result = await response.json();

    if (!response.ok || !result.success) {
      return res.status(response.status || 502).json({
        error: "Could not load supplier packages"
      });
    }

    const packages = (result.data?.packages || []).map(item => ({
      network: item.network,
      size: item.size,
      volume_gb: item.volume_gb
    }));

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    return res.status(200).json({
      success: true,
      data: { packages, total: packages.length }
    });

  } catch (error) {
    return res.status(502).json({
      error: "Could not reach supplier"
    });
  }
}

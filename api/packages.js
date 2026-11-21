
export default async function handler(req, res) {
  const allowedOrigins = [
    "https://takyib946.github.io",
    "https://maynard-data-site.vercel.app"
  ];

  const origin = req.headers.origin;

  res.setHeader("Vary", "Origin");

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (origin) {
    return res.status(403).json({
      success: false,
      error: "Origin not allowed"
    });
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Accept");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.KINGFLEXY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
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

    const supplierData = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Supplier catalogue unavailable"
      });
    }

    const packages =
      supplierData?.data?.packages ||
      supplierData?.packages ||
      [];

    if (!Array.isArray(packages)) {
      throw new Error("Invalid supplier package list");
    }

    const safePackages = packages.map(item => ({
      network: item.network,
      size: item.size,
      volume_gb: item.volume_gb
    }));

    return res.status(200).json({
      success: true,
      data: {
        packages: safePackages,
        total: safePackages.length
      }
    });

  } catch (error) {
    return res.status(502).json({
      success: false,
      error: "Could not load supplier packages"
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  return res.status(403).json({
    error: "Purchases are temporarily disabled.",
    message: "Payment verification must be configured first."
  });
}

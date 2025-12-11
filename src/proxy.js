export default async function handler(req, res) {
  const backendUrl =
    "http://203.189.137.34:1265/ksfh_backend/API/hero/hero_web.php";

  try {
    const r = await fetch(backendUrl);
    const data = await r.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch backend API" });
  }
}

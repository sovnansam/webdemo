const API_URL = "http://203.189.137.34:1265/ksfh_backend/API/announcement/ALL_Announcement_web.php";
const SITE_URL = "https://webdemo-wheat.vercel.app";

const CRAWLER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
  "Googlebot",
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  const lower = userAgent.toLowerCase();
  return CRAWLER_AGENTS.some((agent) => lower.includes(agent.toLowerCase()));
}

async function getAnnouncement(id) {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    const data = await res.json();

    let announcements = [];
    if (data.data && Array.isArray(data.data)) announcements = data.data;
    else if (Array.isArray(data)) announcements = data;
    else if (data && typeof data === "object") {
      if (data.announcements) announcements = data.announcements;
      else if (data.results) announcements = data.results;
      else announcements = [data];
    }

    return announcements.find((a) => String(a.id) === String(id)) || null;
  } catch {
    return null;
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHtml(announcement, url) {
  const title = announcement
    ? announcement.title || announcement.title_en || "KHMER SOVIET FRIENDSHIP HOSPITAL"
    : "KHMER SOVIET FRIENDSHIP HOSPITAL";

  const description = announcement
    ? announcement.subTitle || announcement.subTitle_en || "Khmer Soviet Friendship Hospital - Providing quality healthcare services"
    : "Khmer Soviet Friendship Hospital - Providing quality healthcare services";

  let image = `${SITE_URL}/Logo.png`;
  if (announcement && announcement.image_path) {
    const imgPath = announcement.image_path;
    if (imgPath.startsWith("http")) {
      image = imgPath;
    } else {
      const clean = imgPath.replace(/^[./]+/, "");
      image = imgPath.startsWith("/") ? `${SITE_URL}${imgPath}` : `${SITE_URL}/${clean}`;
    }
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} - KHMER SOVIET FRIENDSHIP HOSPITAL</title>
  <link rel="icon" type="image/svg+xml" href="/KSFH.ico" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="KHMER SOVIET FRIENDSHIP HOSPITAL" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") || "";

  const match = url.pathname.match(/^\/announcement\/(\d+)$/);

  if (match && isCrawler(userAgent)) {
    const id = match[1];
    const announcement = await getAnnouncement(id);
    const html = buildHtml(announcement, request.url);

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  // Pass through for normal browser requests
  return;
}

export const config = {
  matcher: ["/announcement/:id*"],
};

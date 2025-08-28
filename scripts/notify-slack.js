import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const reportUrl =
  process.env.REPORT_URL || "https://your-site.netlify.app/allure-report";

// อ่าน summary.json
const summaryPath = path.join(
  __dirname,
  "../allure-report/widgets/summary.json"
);
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const stats = summary.statistic;

const payload = {
  text: `🧪 Test Results Summary: `,
};

const data = JSON.stringify(payload);
const url = new URL(webhookUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`Slack response: ${res.statusCode}`);
  res.on("data", (d) => process.stdout.write(d));
});

req.on("error", (error) => {
  console.error(`Error sending to Slack: ${error}`);
});

req.write(data);
req.end();

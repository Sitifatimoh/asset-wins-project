const fs = require("fs");
const path = require("path");
const https = require("https");

const webhookUrl = process.env.SLACK_WEBHOOK_URL; // ตั้งค่าใน CI/CD secret
const reportUrl =
  process.env.REPORT_URL || "https://your-site.netlify.app/allure-report";

// อ่าน summary.json
const summaryPath = path.join(__dirname, "allure-report/widgets/summary.json");
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const stats = summary.statistic;

// เตรียมข้อความ Slack (Block Kit)
const payload = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🧪 Test Results Summary*\n<${reportUrl}|View full Allure Report>`,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*✅ Passed:* ${stats.passed}` },
        { type: "mrkdwn", text: `*❌ Failed:* ${stats.failed}` },
        { type: "mrkdwn", text: `*⚠️ Broken:* ${stats.broken}` },
        { type: "mrkdwn", text: `*⏭️ Skipped:* ${stats.skipped}` },
        { type: "mrkdwn", text: `*❓ Unknown:* ${stats.unknown}` },
        { type: "mrkdwn", text: `*📊 Total:* ${stats.total}` },
      ],
    },
  ],
};

// ส่งไป Slack
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
});

req.on("error", (error) => {
  console.error(`Error sending to Slack: ${error}`);
});

req.write(data);
req.end();

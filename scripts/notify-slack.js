import fetch from "node-fetch";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const summaryPath = path.join(
  __dirname,
  "../allure-report/widgets/summary.json"
);
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const stats = summary.statistic;
const reportUrl = "https://leafy-kheer-e0f382.netlify.app";
let statusEmoji = "✅";
let statusText = "All tests passed";

if (stats.failed > 0 || stats.broken > 0) {
  statusEmoji = "❌";
  statusText = `${stats.failed} failed, ${stats.broken} broken`;
} else if (stats.skipped > 0) {
  statusEmoji = "⚠️";
  statusText = `${stats.skipped} skipped`;
}

const payload = {
  text: `🧪 Test Results Summary\n${statusEmoji} ${statusText}`, // 👈 มี title + emoji
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🧪 Test Results Summary*`,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*✅ Passed:* ${stats.passed}` },
        { type: "mrkdwn", text: `*❌ Failed:* ${stats.failed}` },
        { type: "mrkdwn", text: `*⚠️ Broken:* ${stats.broken}` },
        { type: "mrkdwn", text: `*⏭️ Skipped:* ${stats.skipped}` },
        { type: "mrkdwn", text: `*📊 Total:* ${stats.total}` },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "🔗 View Allure Report",
          },
          url: reportUrl,
        },
      ],
    },
  ],
};

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
  .then(async (res) => {
    const text = await res.text();
    console.log("Slack response:", res.status, text);
  })
  .catch(console.error);

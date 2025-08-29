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
console.log("stats=", stats);

const payload = {
  text: `🧪 Test Results Summary: passed, ${stats.failed} failed.`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🧪 Test Results Summary*\n<|View full Allure Report>`,
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
console.log("webhookUrl=", webhookUrl);
console.log("payload=", payload);

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
  .then((res) => res.text())
  .then(console.log)
  .catch(console.error);

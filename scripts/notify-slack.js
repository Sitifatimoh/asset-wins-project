import { request } from "https";

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

const payload = {
  text: "Hello from CI/CD 👋",
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

const req = request(options, (res) => {
  console.log(`Slack response: ${res.statusCode}`);
  res.on("data", (d) => process.stdout.write(d));
});

req.on("error", (error) => {
  console.error(`Error sending to Slack: ${error}`);
});

req.write(data);
req.end();

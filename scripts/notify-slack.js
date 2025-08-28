import fetch from 'node-fetch';
const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const payload = { text: "Hello from CI/CD 👋" };

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(res => res.text())
.then(console.log)
.catch(console.error);
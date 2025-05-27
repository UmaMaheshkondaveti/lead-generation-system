# Lead Generation System

This is a simple Lead Generation System built with a React frontend, Node.js + Express backend, and n8n workflow automation. When a lead submits their information, it is sent to n8n via a webhook, which then triggers an email notification using SendGrid.

---

## 🚀 Features

- Lead Form with validation (name and email required)
- Express.js backend to handle submissions
- Webhook integration with n8n
- Email notifications via SendGrid
- Environment-based configuration

---

## 📁 Project Structure

```
project-root/
├── client/                  # React frontend
├── server/                  # Node.js backend
│   ├── routes/leadRoutes.js
│   ├── controllers/leadController.js
│   └── server.js
├── .env
└── README.md
```

---

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create a `.env` file in the `server/` directory with the following content:

```
PORT=5000
N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/lead-submission
```

---

## 🔗 n8n Setup

### 1. Webhook Node

- **Type:** Webhook
- **HTTP Method:** POST
- **Path:** `lead-submission`

### 2. Send Email Node (using SendGrid)

- **Node Type:** SendGrid
- **From Email:** no-reply@yourdomain.com
- **To Email:** sales@example.com

#### Subject:
```
New Lead: {{$json["name"]}}
```

#### Text:
```
New lead received:

Name: {{$json["name"]}}
Email: {{$json["email"]}}
Company: {{$json["company"] || 'N/A'}}
Message: {{$json["message"] || 'N/A'}}
```

---

## ✅ Testing the Flow

1. Run both the backend and frontend.
2. Open the form in your browser.
3. Submit the form with valid name and email.
4. Check your sales email inbox for the new lead notification.

---

## 📬 Email Preview

```
New lead received:

Name: Uma Mahesh  
Email: umamaheshkondaveti12@gmail.com  
Company: N/A  
Message: N/A
```

---

## 🛠 Tech Stack

- React (frontend)
- Node.js + Express (backend)
- n8n (workflow automation)
- SendGrid (email delivery)

---

## 📌 Notes

- You must keep n8n running and the webhook active.
- Ensure your backend `.env` uses the correct webhook URL.
- Configure CORS properly if frontend is on a different port.

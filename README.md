# Customer-Relationship-Managment-

A full-stack CRM campaign manager built using React, Node.js, and MongoDB. This tool allows businesses to define dynamic customer segments, generate AI-powered campaign messages, and track campaign delivery performance — all with user-friendly authentication and deployment.

🛠️ Tech Stack

Frontend:

React.js

CSS

Backend:

Node.js

Express.js

MongoDB with Mongoose

Passport.js with Google OAuth 2.0

AI Integration:

Gemini API (by Google AI)

Deployment:

Frontend: Vercel

Backend: Render

 Features

 Google OAuth 2.0 Login

Only authenticated users can create/view campaigns.

 Audience Segmentation

Build flexible rule-based segments using AND/OR logic.

Rules supported: total_spent, visits, last_order_date.

Preview audience size before saving.

 AI-Powered Campaign Messages

Input a campaign intent and receive 2–3 smart message suggestions using Gemini AI.

 Campaign History

View all past campaigns with:

Segment name

Audience size

Sent & Failed delivery stats

 Clean UX

Neatly separated sections for segmentation, AI message suggestions, and campaign history.

Audience size highlighted clearly.

Getting Started

Clone the repository:

git clone https://github.com/MedhaMathur31/Customer-Relationship-Managment-.git
cd Customer-Relationship-Managment-

Install dependencies:

Backend

cd server
npm install

Frontend

cd client
npm install

Setup Environment Variables:

In server/.env, create the following:

MONGODB_URI=your_mongodb_connection_string
COOKIE_SECRET=your_cookie_secret
GEMINI_API_KEY=your_google_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Start the app:

Backend

cd server
npm start

Frontend

cd client
npm start

🌐 Deployed URLs

Frontend (Vercel): https://your-vercel-url.vercel.app

Backend (Render): https://your-backend-url.onrender.com

📬 API Endpoints

Segments

POST /api/segments/preview – Preview audience size

POST /api/segments/save – Save segment and trigger campaign

GET /api/segments/history – Fetch past campaign stats

AI Messages

POST /api/ai/messages – Generate AI message suggestions

Authentication

GET /auth/google – Google login

GET /auth/logout – Logout

Data Models

Customer

name, email, total_spent, visits, last_order_date

Segment

name, rules, logic

CommunicationLog

campaign_id, customer_id, message, status (PENDING, SENT, FAILED)

 AI Usage

Used Google Gemini-pro API to generate campaign messages dynamically based on user input.

Prompt Template: “Generate 3 short, friendly marketing messages for the campaign goal: '{intent}'”

 How to Use

Login via Google

Create customer segments using rules

Preview audience size

Generate campaign messages using AI

Save segment → Campaign gets logged

View campaign delivery stats on History page


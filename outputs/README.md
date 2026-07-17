# Together Tracker

A private daily planner with an optional live room board for friends.

Track goals, monthly tasks, a 5 AM-to-5 AM timeline, consistency, and lifetime focus hours. Create a room to compare 28-day consistency grids with friends; only room members can see the shared board.

## Features

- Personal daily timeline and completed-session focus tracking
- Lifetime focus-hours total
- Automatic daily rollover at 5:00 AM
- Personal tracker sync across devices after signing in
- Room codes for creating or joining a friend group
- Shared 28-day consistency board with task hover details
- Room owner can remove members or delete the room
- Private file library for opening personal HTML files inside the tracker

## Privacy

Your private tracker data is stored per account and is **not** displayed to friends. The shared room board only sends consistency intensity plus the completed/pending task names for that day.

Private files stay in the browser that uploaded them. They are not uploaded to Supabase and do not sync to another device.

## Tech stack

- Plain HTML, CSS, and JavaScript frontend
- Vercel serverless API routes
- Supabase Postgres database
- User-code and password based session login

## Local setup

1. Install Node.js.
2. Clone the repository.
3. Create a `.env` file in the project root:

   ```env
   SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SECRET_KEY
   ```

4. In Supabase, open **SQL Editor** and run the account/room schema migration first.
5. Run `supabase/add-personal-tracker-state.sql` to enable private cross-device tracker sync.
6. Start the app:

   ```bash
   node server.js
   ```

7. Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. In **Project Settings → Environment Variables**, add:

   | Name | Value |
   | --- | --- |
   | `SUPABASE_URL` | Your Supabase Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase secret/service-role key |

4. Redeploy the project after adding the variables.
5. Share the resulting `vercel.app` URL with friends.

> Keep `SUPABASE_SERVICE_ROLE_KEY` in Vercel only. Never paste it into the frontend, GitHub, or a chat.

## How to use rooms

1. Click **GO LIVE**.
2. Choose **Create room** to become its admin, or **Join room** to enter a friend’s code.
3. New users choose a display name, user code, and password.
4. Existing users use the same user code and password on every device.
5. The owner can remove a member or delete the whole room from the room board.

## Data behavior

- A tracker day runs from **5:00 AM to 5:00 AM**.
- Finished timeline sessions contribute to lifetime focus hours.
- At the rollover, the day is archived to the consistency grid and the timeline is cleared.
- Personal data is synced when the signed-in account changes tracker data.
- If the same account edits two devices at the exact same time, the latest saved version wins.

## Project layout

```text
api/                         Vercel serverless routes
  account.js                 account registration, login, session lookup
  auth-room.js               create/join rooms
  auth-room-board.js         fetch room board data
  auth-snapshot.js           sync shared consistency data
  personal-state.js          sync private tracker data
public/
  index.html                 the tracker interface
supabase/
  schema.sql                 original room schema
  add-personal-tracker-state.sql
```

## Security notes

- Passwords are stored as salted hashes, not plain text.
- Session cookies are `HttpOnly`, `Secure`, and expire after 30 days.
- Database tables use Row Level Security with no public policies; server routes access them using Vercel environment variables.
- This is a small private app, not a complete production identity system. Add password reset, email verification, rate limiting, and audit logs before using it at large scale.


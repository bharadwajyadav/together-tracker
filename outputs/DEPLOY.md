# Deploy Together Tracker with Vercel + Supabase

1. Create a Supabase project.
2. In **SQL Editor**, run the contents of `supabase/schema.sql` from this project.
3. Import this project into Vercel.
4. In Vercel **Settings → Environment Variables**, add:
   - `SUPABASE_URL` — the project URL from Supabase Settings → API
   - `SUPABASE_SERVICE_ROLE_KEY` — the service-role secret from Supabase Settings → API
5. Deploy. The Vercel URL is the link to share with friends.

The service-role key is server-only: never put it in browser JavaScript or share it publicly. The Vercel API routes keep it private and use it to read/write the room board data in Supabase.

The global room board refreshes every five seconds and shows each member's last 28 days. Hover a square to see that member's completed and pending tasks for that day.

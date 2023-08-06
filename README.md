Job Hunk is an online application that will help applicants on canada for applying on a job at Jobbank.gc. 

This is created using  [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev


```

Setup env.local file:

Make sure you have env.local on the root folder that contains the following configuration:

NEXT_PUBLIC_SUPABASE_URL=you_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=you_supabase_project_key

For updating supabase type run the command below:

1. npx supabase login (then enter access key when asked)
2. run the command below for updating the types

npx supabase gen types typescript --project-id "prdanvztefttoqaqozob" --schema public > types/supabase.ts

replace prdanvztefttoqaqozob with your own project id

Then Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



By esthony

# DOXIT

**Documentation, grounded.** AI writing that uses your own files as context.

DOXIT helps SaaS teams and agencies draft SOPs, onboarding guides and client docs from the PDFs, notes and specs they already trust, so the output stays accurate instead of generic.

> **Status:** early build. Authentication, free trials, documents, and context-file upload with chunk storage are in place. The AI drafting layer is next.

## Tech stack

- **Next.js** (App Router) with **TypeScript**
- **Convex** for the database, file storage and HTTP actions
- **Convex Auth** for email and password sign-in

## What's built

- **Auth:** sign-up and login flows using Convex Auth, with route groups for marketing, auth and dashboard pages
- **Free trial:** every new user gets a 3-day trial, tracked on their profile with a trial banner in the dashboard
- **Documents:** per-user documents with title, content and timestamps, indexed for "recently updated" queries
- **Context files:** users upload reference files to Convex storage; each file moves through `uploaded → processing → ready / failed`
- **Context chunks:** file text is split into chunks and stored per file, ready for retrieval when drafting
- **Authorisation:** shared helpers in `convex/lib/authz.ts` make sure users can only read and write their own data

## Data model

| Table | Purpose |
|---|---|
| `userProfiles` | Display name, email, trial start and end |
| `documents` | User-authored docs |
| `context_files` | Uploaded reference files and their processing status |
| `contextChunks` | Text chunks extracted from each context file |

## Project structure

```
app/
  (marketing)/     Landing page
  (auth)/          Login and sign-up
  (dashboard)/     Signed-in workspace
components/        Auth forms, dashboard header, trial banner, providers
convex/            Schema, auth config, documents, context files and chunks
lib/trial.ts       Trial window logic
```

## Getting started

```bash
npm install
cp .env.example .env.local
npx convex dev      # starts Convex and generates types
npm run dev         # in a second terminal
```

Then open http://localhost:3000.

## Roadmap

- Extract text from PDFs and notes on upload
- Retrieve relevant chunks and draft documents with an LLM
- Templates for SOPs, onboarding guides and client docs
- Paid plans after the trial

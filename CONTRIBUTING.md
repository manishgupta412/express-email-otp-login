# Contributing to express-email-otp-login

Thanks for taking the time to contribute. Bug reports, ideas, documentation fixes and code are all welcome. This guide takes you from cloning the repo to an opened pull request.

## Ways to help

- Report a bug or suggest a feature by opening an issue. Say what you expected, what happened, and the steps to reproduce it.
- Improve the README or the docs.
- Pick up an open issue. Issues labelled `good first issue` are a good place to start.

## Picking up an issue

1. Browse the open issues and choose one.
2. Comment on it to say you'd like to work on it, and wait for a maintainer to reply before you start.
3. Work on one issue at a time.
4. If you can't finish, say so in the issue so someone else can take it.

If you want to work on something that has no issue yet, open one first and describe your idea, so you don't spend time on a change that doesn't fit.

## Set up

You need Node.js 20 or newer.

```bash
git clone https://github.com/<your-username>/express-email-otp-login.git && cd express-email-otp-login
npm install
cp .env.example .env
```

To run the app you need to fill in `MAILTRAP_TOKEN`, `MAIL_FROM_EMAIL` and `OTP_SECRET` in `.env`. The README shows how to generate a long random `OTP_SECRET`. **The tests need none of this**: they replace the email layer with a fake, so you can run them without any credentials.

## Run it

```bash
npm run user:add -- you@example.com   # needed while AUTO_SIGNUP=false
npm run dev
```

Open http://localhost:3000/login. The SQLite database is created at `./data/app.db` on startup. Open magic links on the same computer that runs the server, because `APP_URL` is `localhost` until you deploy.

## Tests and checks

```bash
npm test            # vitest, no credentials needed
npm run lint        # Biome
npm run typecheck
npm run build
npm run check       # lint, type-check, tests and the dependency audit together
npm run audit:deps  # known vulnerabilities in dependencies
```

Tests use `FakeMailer` and `FakeClock` from `tests/helpers.ts`, so they never poll an inbox or sleep. Use them when you add tests.

Please add or update tests for the behavior you change, and run all the checks above before you open a pull request.

## Making your change

1. Fork the repository and create a branch from `main`. Use a short name that says what it does, such as `fix/expired-code-message`, `feature/dark-theme` or `docs/readme-typo`.
2. Keep each pull request focused on one change. Don't mix refactoring or formatting changes into it.
3. Write commit messages as a short, imperative summary of what changed (for example `Fix wrong time in reminder email`), and add a few lines of explanation if the reason isn't obvious.
4. Push your branch and open a pull request against `main`.

A good pull request description says:

- what the change does and why it is needed;
- how you tested it;
- which issue it closes, written as `Closes #123`;
- screenshots for any change to the user interface.

## Project layout

- `src/auth/`: codes, magic links, sessions, rate limiting and users.
- `src/routes/` and `src/views/`: the HTTP routes and the HTML pages.
- `src/email/`: email templates and the Mailtrap sender.
- `src/db.ts`: the SQLite schema and its ordered migrations.
- `tests/`: the test suite.

## Keep secrets out

Never put API tokens, `.env` contents or real customer data in an issue, a pull request or a commit. `.env` is git-ignored, and the example file only contains placeholders.

## License

By contributing, you agree that your contributions are licensed under the project's [MIT license](LICENSE).

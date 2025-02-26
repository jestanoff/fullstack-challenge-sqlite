# Fanvue's Fullstack challenge

Setup the project:

Make sure you install all the dependencies (currently pnpm, but you can opt-out) and start the solution in dev mode.

There is a simple homepage that will display a typical "feed" page.

Requirements:

- Use trpc for data fetching and mutations (https://trpc.io/) this is already setup for you.
- Custom styling is not required, you should use MUI5 components out-of-the box, check the docs here https://mui.com/material-ui/
- Fetch the data from the sqlite file that sits in the "prisma" folder, with the prisma library, more info here https://www.prisma.io/docs/orm/overview/databases/sqlite

Note:

- The database is already seeded, but you can add more data if you want to.

Please complete the following tasks:

- Show a centered column of posts which are simple boxes with at least title and content properties, you can aggregate more data where it makes sense.
- For each post, show a button with a counter of the comments, or nothing if there are no comments.
- When clicking on the comment counter, the comments appear below it, you can choose what component to use.
- Although there is no authentication, user can add a comment to a post.

Consider the following, for instance leaving comments close to where this is relevant:

- Scalability of the solution - Code wise it should scale well, in the front-end more routes can be added and also more components within the `app/components/` folder. On the backend TRPC could would scale good adding new endpoints that would get just enough information to be displayed in the UU.
- Performance - Lazy loading of the posts is required, like when you scroll on the page, there should be a number of posts loading at the end of the page. Chaching for the comments could do for 1min or so to avoid hitting the database too much.
- What Database type would be fit - it should be a relationship DB like Postgres, as comments relate to posts and users to comments. It allows for caching and indexing.
- How monitoring and logging could be implemented - TRPC has a built-in logger, but it could be extended to send logs to a service like Sentry or LogRocket.
- SSR and SSG - SSR as the Feed is dynamic, SSG makes sense for static content like CMS pages
- Possible infrastructure setup to help with the above - Vercel for easy setup or Azure, AWS, GCP for more control. 

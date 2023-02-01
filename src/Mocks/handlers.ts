import { rest } from "msw";
export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: "saikirnamvs",
        },
        {
          id: 2,
          title: "kiransaikirn",
        },
        {
          id: 3,
          title: "arunkiranmvs",
        },
      ])
    );
  }),
];

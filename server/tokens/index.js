const jwt = require("jsonwebtoken");
const tokens = [
  {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMTIxMiIsInVzZXJOYW1lIjoiQm9iIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjc5OTk2NzY1fQ.4R9MLbMR8r0oPZ_e_Ae1H34J9TZNbGHMa2J8yB0YW3Y",
  },
  {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1OTU5NSIsInVzZXJOYW1lIjoiQmlsbCIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2Nzk5OTY4NjF9.1uBY6_8G-16vJPEGMPNvr2Q6ujTioJa_qD5gSOKXKXY",
  },
  {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzOTM5MyIsInVzZXJOYW1lIjoiVmFzeWEiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY3OTk5Njk1NX0.e817gMJOfKMn04LaiuWkfLOvUWvbFzjGj9ZW7lCheXQ",
  },
];

const decodeTokens = tokens.map(({ token }) => {
  const decoded = jwt.verify(token, "cooking");
  return { ...decoded, token };
});

module.exports = decodeTokens;

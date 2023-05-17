import express from "express";

const app = express();
const __dirname = process.cwd();

app.use(express.static("src/static"));

app.get("/sw.js", (_, res) => {
  res.sendFile(`${__dirname}/src/sw.js`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

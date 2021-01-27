const express = require("express");

const app = express();

const PORT = process.env.SERVER_PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});

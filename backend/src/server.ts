import "dotenv/config";
import { app } from "./app";
import { validateEnvironment } from "./config";

const port = validateEnvironment();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

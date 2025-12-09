import { app } from "./config/app.js";
import config from "./config/environment.js";

app.listen(config.PORT, () => {
  console.log(`server running on http://localhost:${config.PORT}`);
});

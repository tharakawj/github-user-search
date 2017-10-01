import { schema } from "normalizr";

const user = new schema.Entity("users", {}, { idAttribute: "login" });
const repository = new schema.Entity("repositories", {
  owner: user
});

export { user, repository };

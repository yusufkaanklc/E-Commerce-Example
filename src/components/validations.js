import { string, object } from "yup";

const validations = object({
  username: string().required(),
  password: string().min(5).required(),
});

export default validations;

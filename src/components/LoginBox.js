import { TextField, Button } from "@material-ui/core";
import { getUserToken } from "../adapters/backend";
import { setLoggedInUser } from "../contexts/login";

function LoginBox() {
  async function handleSubmit(e) {
    e.preventDefault();

    const { accessToken = "" } = await getUserToken(
      e.target.elements.email,
      e.target.elements.password
    );
    setLoggedInUser(accessToken);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        type="text"
        autoFocus
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        variant="outlined"
        type="password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginBox;

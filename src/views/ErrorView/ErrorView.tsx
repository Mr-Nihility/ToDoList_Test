import { NavLink } from "react-router-dom";
import { RouterPath } from "../../types/router.types";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <NavLink to={RouterPath.Home}>Go Home</NavLink>
    </div>
  );
}

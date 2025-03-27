import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <Link className="nav-a-home" to="/">Home</Link>
      <Link className="nav-a-potencial-candidates" to="/PotentialCandidates">Potential Candidates</Link>
    </div>
  )
};

export default Nav;

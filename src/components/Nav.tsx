import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link className="nav-a-home" to="/">Home</Link>
      <Link className="nav-a-potencial-candidates" to="/potentialcandidates">
        Potential Candidates
      </Link>
    </div>
  );
};

export default Nav;

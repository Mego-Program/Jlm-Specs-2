import { Link } from "react-router-dom";

function SpecKpi() {
  return (
    <div>
      <h1>Spec Kpi</h1>
      <Link to="/">list </Link>
      <br />
      <Link to="/SpecInfo">info</Link>
    </div>
  );
}

export default SpecKpi;

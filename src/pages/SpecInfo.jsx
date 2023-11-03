import { Link } from "react-router-dom";

function SpecInfo() {
  return (
    <div>
      <h1>Spec Info</h1>
      <Link to="/specKpi">kpi</Link>
      <br />
      <Link to="/">list</Link>
    </div>
  );
}
export default SpecInfo;

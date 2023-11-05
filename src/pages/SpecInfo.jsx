import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";

function SpecInfo() {
  return (
    <div>
      <h1>Spec Info</h1>
      <Link to="/specKpi">kpi</Link>
      <br />
      <Link to="/">list</Link>

      <TaskList />
    </div>
  );
}
export default SpecInfo;

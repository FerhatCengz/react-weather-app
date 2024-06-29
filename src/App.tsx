import { Outlet } from "react-router-dom";
import Cities from "./pages/Cities";

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 p-0">
          <Cities />
        </div>

        <div className="col-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

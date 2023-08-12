import Structure from "./Components/Structure.jsx";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div>
            <Structure/>
            <Outlet/>
        </div>
    )
}

export default App;
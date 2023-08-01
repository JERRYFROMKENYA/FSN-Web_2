import {Home, Uploads} from "./Pages";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import {Register} from "./Pages/Admin/pages/Register/Register.jsx";
import {Admin} from "./Pages/Admin/pages/index.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path={"/admin"} element={<Admin/>}/>
                <Route exact path={"/admin/Register"} element={<Register/>}/>
                <Route exact path={"/"} element={<Home />} />
                <Route exact path={"/campaign/uploads"} element={<Uploads/>}/>
            </Routes>

       </Router>
    );
}

export default App;
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import Header from "../Components/Header/Header";
import Routes from "../routes/Routes";
import './App.scss';

const App = () => {
    return (
        <div className='app'>
            <Router>
                <Header />
                <Routes />
            </Router>
        </div>
    )
}

export default App;
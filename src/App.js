import React from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RoutesPath from "./Routes";
function App() {
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <Sidebar />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <RoutesPath />
                </main>
            </div>
        </div>
    );
}
export default App;
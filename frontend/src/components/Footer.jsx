import React from "react";
import "./App.css";
import Footer from "./components/Footer.js";
function App() {
    return (
        <div>
            <div
                style={{
                    minHeight: "400px",
                    color: "green",
                }}
            >
                <h1>GeeksforGeeks</h1>
            </div>
            <Footer />
        </div>
    );
}

export default App;
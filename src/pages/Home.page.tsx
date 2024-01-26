import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {


    return (
        <div style={{
            minHeight: "100%",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "5% 90% 5%",
            backgroundColor: "#f5f2fe",
            color: "#4f6b7c",
        }}>
            <Header />
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
                height: '100vh',
                color: "#4f6b7c",
                fontFamily: "cursive",
                fontSize: "20px"
            }}>
                <Link to="/register">Create account</Link>
                <Link to="/login">Log in</Link>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
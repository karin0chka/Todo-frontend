import { Link } from "react-router-dom"
import LogOut from "../auth_components/LogOut"

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#caf0f8",
        textAlign: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        fontSize: 30,
        fontFamily: "cursive",
        color: "#4f6b7c",
      }}>
      <Link to="/"> TODO</Link>
      <LogOut />
    </header>
  )
}

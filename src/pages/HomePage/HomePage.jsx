import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
  return (
    <div className="home">
      <h1>System reklamacji</h1>
      <p>Zaloguj się lub zarejestruj aby wypróbować system</p>
      <div className="home-buttons">
        <Link to="/login" className="button button-primary">Zaloguj się</Link>
        <Link to="/register" className="button button-secondary">Zarejestruj się</Link>
      </div>
    </div>
  );
}

export default HomePage;
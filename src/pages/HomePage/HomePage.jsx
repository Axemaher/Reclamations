import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
  return (
    <div className="home-page">
      <h1>System reklamacji</h1>
      <p>Zaloguj się lub zarejestruj aby wypróbować system</p>
      <div className="home-page__buttons">
        <Link to="/login" className="button button--primary">
          Zaloguj
        </Link>
        <Link to="/register" className="button button--secondary">
          Zarejestruj
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

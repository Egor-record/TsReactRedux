import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <Link to="/" className="nav-link px-2 link-dark">Все посты</Link>
                    <Link to="/create" className="nav-link px-2 link-dark">Новый пост</Link>
                    <Link to="/waiting" className="nav-link px-2 link-dark">Ожидают</Link>
                </ul>
                <div className="col-md-3 text-end">
                    <button type="button" className="btn btn-outline-primary me-2">Выйти</button>
                </div>
            </header>
        </div>
    )
}
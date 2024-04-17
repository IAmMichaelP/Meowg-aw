import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (

        <header>
            <div className="container">
                <Link to="/home">
                    <h1>NavBar</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;
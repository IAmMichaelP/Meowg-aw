import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (

      <>
      {/* ======= Header ======= */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
        style={{ zIndex: "1 !important" }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto me-lg-0"
          >
            {/* Default logo for larger screens */}
            <img src="./assets/img/logo.png" alt="" className="d-none d-md-block" />
            {/* Logo for mobile screens */}
            <img src="./assets/img/mobile-logo.png" alt="" className="d-md-none" />
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/donate">Donate</a>
              </li>
              <li>
                <a href="/blogs">Blogs</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </ul>
          </nav>
          {/* navbar */}
          <button
            className="user-authBtn"
            data-toggle="modal"
            data-target="#signUp"
          >
            Sign In
          </button>
          <button
            className="user-authBtn"
            data-toggle="modal"
            data-target="#signIn"
          >
            Sign Up
          </button>
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>
      {/* End Header */}
    </>
    

    )
}

export default Navbar;
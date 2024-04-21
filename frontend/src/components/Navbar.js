import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState
  useEffect(() => {
    const fetchUser = async () => {
        const response = await fetch('http://localhost:3000/api/all-strays');
        console.log(response);
        
        let json = await response.json();
        // json = JSON.stringify(json);
        console.log(typeof(json));
        console.log(json);
        if (response.ok) {
            setUser(json);
        }
    }
    fetchUser()
    // console.log("out");
    // Axios.get("/api/gallery").then((res) => {
    //     console.log("response");
    //     console.log(res);
    //     console.log(res.data);
    //     // setStrays(res.data);
    // })
}, []);
    
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

      <div
    className="modal fade"
    id="signIn"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-body">
          <form id="signup-form">
            <img src="assets/img/favicon.png" />
            <h3>Sign Up to MeowgAw</h3>
            <div className="inputs">
              <input type="hidden" name="role" defaultValue="user" />
              <label htmlFor="username">Username</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-user" />
                <input type="text" id="username" name="username" required="" />
                <br />
              </div>
              <label htmlFor="email">Email Address</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-envelope" />
                <input type="email" name="email" required="" />
                <br />
              </div>
              <div className="email error" id="warning" />
              <label htmlFor="password">Password</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-lock-alt" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  onkeyup="
                  handleOnKeyUp('password', event);
                  "
                  required=""
                />
                <br />
              </div>
              <div className="password error" id="warning" />
              <label htmlFor="repassword">Re-enter Password</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-lock" />
                <input
                  type="password"
                  id="repassword"
                  name="repassword"
                  onkeyup="
                  handleOnKeyUp('repassword', event);
                  "
                  required=""
                />
                <br />
              </div>
            </div>
            <p className="warning hide-warning">
              Password and repassword do not match!
            </p>
            <button type="submit" className="submit">
              Sign Up
            </button>
            <p className="reminder">
              By clicking "Sign Up", I understand and agree to the MeowgAw's
              collective
              <a href="">Terms</a>, <a href="#">Terms of Use</a>, and{" "}
              <a href="#">Privacy Policy</a>.
            </p>
            <p className="alternate" data-toggle="modal" data-target="#signIn">
              Already have an account?&gt;<a href="#">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* sign In modal */}
  <div
    className="modal fade"
    id="signUp"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-body">
          <form form="" id="login-form" action="/signin" method="POST">
            <img src="assets/img/favicon.png" />
            <h3>Sign into MeowgAw</h3>
            <div className="inputs">
              <label htmlFor="username">Username</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-user" />
                <input
                  type="text"
                  className="usernameSi"
                  name="username"
                  required=""
                />
                <br />
              </div>
              <label htmlFor="email">Email Address</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-envelope" />
                <input
                  type="email"
                  className="emailSi"
                  name="email"
                  required=""
                />
                <br />
              </div>
              <div className="email error" id="warning" />
              <label htmlFor="password">Password</label>
              <br />
              <div className="input-container">
                <i className="icon bx bx-lock-alt" />
                <input
                  type="password"
                  className="passwordSi"
                  name="password"
                  required=""
                />
                <br />
              </div>
              <div className="password error" id="warning" />
            </div>
            <p className="warning signin-warning hide-warning">
              Password and email do not match!
            </p>
            <button type="submit" className="submit">
              Sign In
            </button>
            <a href="#" className="forgot">
              Forgot Password?
            </a>
            <p className="alternate" data-toggle="modal" data-target="#signUp">
              Doesn't have an account yet? &gt;<a href="#">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
    </>
    

    )
}

export default Navbar;
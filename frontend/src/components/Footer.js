
const Footer = () => {
    
    return (

      
        <>
  <footer id="footer" className="footer">
    <div className="container">
      <div className="row gy-3">
        <div className="col-lg-3 col-md-6 d-flex">
          <i className="bi bi-geo-alt icon" />
          <div>
            <h4>Address</h4>
            <p>
              University of the Philippines Visayas <br />
              Miagao, Iloilo
              <br />
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 footer-links d-flex">
          <i className="bi bi-telephone icon" />
          <div>
            <h4>Contact Us</h4>
            <p>
              <strong>Phone:</strong> +1 5589 55488 55
              <br />
              <strong>Email:</strong> meowgaw@gmail.com
              <br />
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 footer-links d-flex">
          <i className="bi bi-clock icon" />
          <div>
            <h4>Opening Hours</h4>
            <p>
              <strong>Mon-Sat: 11AM</strong> - 23PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 footer-links">
          <h4>Follow Us</h4>
          <div className="social-links d-flex">
            <a href="#" className="twitter">
              <i className="bi bi-twitter" />
            </a>
            <a href="#" className="facebook">
              <i className="bi bi-facebook" />
            </a>
            <a href="#" className="instagram">
              <i className="bi bi-instagram" />
            </a>
            <a href="#" className="linkedin">
              <i className="bi bi-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright{" "}
        <strong>
          <span>MeowgAw</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Developed by K<sup>2</sup>MJS.
      </div>
    </div>
  </footer>
  {/* End Footer */}
  {/* End Footer */}
  <a
    href="#"
    className="scroll-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
  {/* <div id="preloader" /> */}
</>

    )
}

export default Footer;
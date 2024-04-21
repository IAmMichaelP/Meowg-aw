import { useEffect, useState } from 'react';
// import Axios from 'axios';

const About = () => { 

    return (
        <main id="main">
  {/* ======= Breadcrumbs ======= */}
  <div className="breadcrumbs about-container">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="display-3">About Us</h1>
        <ol>
          <li>
            <a href="/">Home</a>
          </li>
          <li>About Us</li>
        </ol>
      </div>
    </div>
  </div>
  {/* End Breadcrumbs */}
  {/* ======= Mission ======= */}
  <section id="about" className="about section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-12 col-12">
          <div className="about-img">
            <img src="./assets/img/about/3.jpg" alt="" className="img-fluid" />
          </div>
        </div>
        <div className="col-lg-8 col-md-12 col-12 ps-lg-3 mt-md-3">
          <div className="about-text">
            <h2>
              Our <strong>Mission</strong>
            </h2>
            <p>
              To improve the lives of stray dogs and cats in our community by
              providing a comprehensive and compassionate pet adoption platform
              within our university, connecting these animals with loving,
              responsible owners, and fostering a culture of empathy and
              responsible pet ownership.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Mission section Ends */}
  {/* ======= Vision ======= */}
  <section id="about" className="about section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-12 ps-lg-3 mt-md-3">
          <div className="about-text">
            <h2>
              Our <strong>Vision</strong>
            </h2>
            <p>
              We envision a future where every stray dog and cat within our
              university's vicinity finds a safe and loving forever home. Our
              pet adoption website will be the go-to platform for connecting
              prospective pet owners with these animals in need, ultimately
              reducing the stray population and promoting responsible pet
              ownership. We aim to create a more compassionate and
              animal-friendly society where every pet finds a loving family, and
              no pet is left behind.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 col-12">
          <div className="about-img">
            <img src="./assets/img/about/4.jpg" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*--- Vision section ends ----*/}
  {/* ======= team Section ======= */}
  <section id="chefs" className="chefs section-bg">
    <div className="container" data-aos="fade-up">
      <div className="section-header">
        <h2>Developers</h2>
        <p>The team behind MeowgAw</p>
      </div>
      <div className="row gy-4 justify-content-center">
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="chef-member">
            <div className="member-img">
              <img
                src="./assets/img/members/manejo.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="social">
                <a href="">
                  <i className="bi bi-twitter" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="">
                  <i className="bi bi-instagram" />
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4>Kzlyr Shaira Manejo</h4>
              <span>Developer</span>
              <p>
                Velit aut quia fugit et et. Dolorum ea voluptate vel tempore
                tenetur ipsa quae aut. Ipsum exercitationem iure minima enim
                corporis et voluptate.
              </p>
            </div>
          </div>
        </div>
        {/* End Member */}
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className="chef-member">
            <div className="member-img">
              <img
                src="./assets/img/members/pelegrino.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="social">
                <a href="">
                  <i className="bi bi-twitter" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="">
                  <i className="bi bi-instagram" />
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4>Michael Patrick Pelegrino</h4>
              <span>Developer</span>
              <p>
                Quo esse repellendus quia id. Est eum et accusantium pariatur
                fugit nihil minima suscipit corporis. Voluptate sed quas
                reiciendis animi neque sapiente.
              </p>
            </div>
          </div>
        </div>
        {/* End Member */}
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          <div className="chef-member">
            <div className="member-img">
              <img
                src="./assets/img/members/tuando.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="social">
                <a href="">
                  <i className="bi bi-twitter" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="">
                  <i className="bi bi-instagram" />
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4>Sharah Michelle Tuando</h4>
              <span>Developer</span>
              <p>
                Vero omnis enim consequatur. Voluptas consectetur unde qui
                molestiae deserunt. Voluptates enim aut architecto porro
                aspernatur molestiae modi.
              </p>
            </div>
          </div>
        </div>
        {/* End Member */}
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          <div className="chef-member">
            <div className="member-img">
              <img
                src="./assets/img/members/tiu.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="social">
                <a href="">
                  <i className="bi bi-twitter" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="">
                  <i className="bi bi-instagram" />
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4>Justin Luis Tiu</h4>
              <span>Developer</span>
              <p>
                Vero omnis enim consequatur. Voluptas consectetur unde qui
                molestiae deserunt. Voluptates enim aut architecto porro
                aspernatur molestiae modi.
              </p>
            </div>
          </div>
        </div>
        {/* End Member */}
        <div
          className="col-lg-4 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay={300}
        >
          <div className="chef-member">
            <div className="member-img">
              <img
                src="./assets/img/members/vito.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="social">
                <a href="">
                  <i className="bi bi-twitter" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="">
                  <i className="bi bi-instagram" />
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h4>Ma. Christina Kane Vito</h4>
              <span>Developer</span>
              <p>
                Vero omnis enim consequatur. Voluptas consectetur unde qui
                molestiae deserunt. Voluptates enim aut architecto porro
                aspernatur molestiae modi.
              </p>
            </div>
          </div>
        </div>
        {/* End Member */}
      </div>
    </div>
  </section>
  {/* ======= Contact Section ======= */}
  <section id="contact" className="contact">
    <div className="container" data-aos="fade-up">
      <div className="section-header">
        <h2>Contact</h2>
        <p>
          Need Help? <span>Contact Us</span>
        </p>
      </div>
      <div className="mb-3">
        <iframe
          style={{ border: 0, width: "100%", height: 350 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250956.40928945362!2d121.967157125!3d10.64204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ae5b8761c629f5%3A0x8b0a8c7844cc30cd!2sUniversity%20of%20the%20Philippines%20Visayas!5e0!3m2!1sen!2sph!4v1698933055009!5m2!1sen!2sph"
          frameBorder={0}
          allowFullScreen=""
        />
      </div>
      {/* End Google Maps */}
      <div className="row gy-4">
        <div className="col-md-6">
          <div className="info-item  d-flex align-items-center">
            <i className="icon bi bi-map flex-shrink-0" />
            <div>
              <h3>Our Address</h3>
              <p>Universiry of the Philippines - Visayas, Miagao, Iloilo</p>
            </div>
          </div>
        </div>
        {/* End Info Item */}
        <div className="col-md-6">
          <div className="info-item d-flex align-items-center">
            <i className="icon bi bi-envelope flex-shrink-0" />
            <div>
              <h3>Email Us</h3>
              <p>meowgaw@gmail.com</p>
            </div>
          </div>
        </div>
        {/* End Info Item */}
        <div className="col-md-6">
          <div className="info-item  d-flex align-items-center">
            <i className="icon bi bi-telephone flex-shrink-0" />
            <div>
              <h3>Call Us</h3>
              <p>+1 5589 55488 55</p>
            </div>
          </div>
        </div>
        {/* End Info Item */}
        <div className="col-md-6">
          <div className="info-item  d-flex align-items-center">
            <i className="icon bi bi-share flex-shrink-0" />
            <div>
              <h3>Opening Hours</h3>
              <div>
                <strong>Mon-Sat:</strong> 11AM - 23PM;
                <strong>Sunday:</strong> Closed
              </div>
            </div>
          </div>
        </div>
        {/* End Info Item */}
      </div>
      <form
        action="forms/contact.php"
        method="post"
        role="form"
        className="php-email-form p-3 p-md-4"
      >
        <div className="row">
          <div className="col-xl-6 form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Your Name"
              required=""
            />
          </div>
          <div className="col-xl-6 form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Your Email"
              required=""
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="subject"
            id="subject"
            placeholder="Subject"
            required=""
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="message"
            rows={5}
            placeholder="Message"
            required=""
            defaultValue={""}
          />
        </div>
        <div className="my-3">
          <div className="loading">Loading</div>
          <div className="error-message" />
          <div className="sent-message">
            Your message has been sent. Thank you!
          </div>
        </div>
        <div className="text-center">
          <button type="submit">Send Message</button>
        </div>
      </form>
      {/*End Contact Form */}
    </div>
  </section>
  {/* End Contact Section */}
</main>

      
    
        
    )
}

export default About;
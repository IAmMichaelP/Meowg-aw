import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Home = () => {
    const [strays, setStrays] = useState([])
    useEffect(() => {
        const fetchStrays = async () => {
            const response = await fetch('http://localhost:3000/api/');
            console.log(response);
            
            let json = await response.json();
            // json = JSON.stringify(json);
            console.log(typeof(json));
            console.log(json);
            if (response.ok) {
                setStrays(json);
            }
        }
        fetchStrays()
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
      <section id="hero" className="hero d-flex align-items-center section-bg">
        <div className="container">
          <div className="row justify-content-between gy-5">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h2 data-aos="fade-up">MeowgAw</h2>
              <p data-aos="fade-up" data-aos-delay={100}>
                Welcome to MeowgAw! We're dedicated to finding loving FURever homes
                for our furry friends. Discover a variety of adorable and playful
                pets, from cuddly cats to energetic dogs, waiting to bring joy into
                your life. Let's create a world where every pet finds a loving home.
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay={200}>
                <a href="gallery.html" className="btn-book-a-table">
                  Check-out Strays
                </a>
                <a
                  href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle" />
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div className="col-lg-4 order-1 order-lg-2 text-center text-lg-start">
              <img
                src="assets/img/img-1.png"
                className="img-fluid"
                alt=""
                data-aos="zoom-out"
                data-aos-delay={300}
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Hero Section */}
      <main id="main">
        {/* ======= About Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
              <p>
                Learn More <span>About Us</span>
              </p>
            </div>
            <div className="row gy-4">
              <div
                className="col-lg-7 position-relative about-img"
                style={{ backgroundImage: "url(assets/img/about/2.jpg)" }}
                data-aos="fade-up"
                data-aos-delay={150}
              >
                <div className="call-us position-absolute">
                  <h4>Save a Stray</h4>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
              <div
                className="col-lg-5 d-flex align-items-end"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all" /> Ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      <i className="bi bi-check2-all" /> Duis aute irure dolor in
                      reprehenderit in voluptate velit.
                    </li>
                    <li>
                      <i className="bi bi-check2-all" /> Ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate trideta storacalaperda mastiro
                      dolore eu fugiat nulla pariatur.
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident
                  </p>
                  <div className="position-relative mt-4">
                    <img
                      src="assets/img/about/1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <a
                      href="https://www.youtube.com/watch?v=Z-VJXzde4Os"
                      className="glightbox play-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End About Section */}
        {/* ======= Why Us Section ======= */}
        <section id="why-us" className="why-us section-bg">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
                <div className="why-box">
                  <h3>Planning to Adopt?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                    aute irure dolor in reprehenderit Asperiores dolores sed et.
                    Tenetur quia eos. Autem tempore quibusdam vel necessitatibus
                    optio ad corporis.
                  </p>
                </div>
              </div>
              {/* End Why Box */}
              <div className="col-lg-8 d-flex align-items-center">
                <div className="row gy-4">
                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay={200}>
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-clipboard-data" />
                      <h4>Checklist for new adopters</h4>
                      <p>Make your adoption experience as smooth as possible.</p>
                      <div className="text-center">
                        <a href="#" className="more-btn">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Icon Box */}
                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay={300}>
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-gem" />
                      <h4>Furparent Guide 101</h4>
                      <p>
                        All you need to know on what to expect as a new pet owner.
                      </p>
                      <div className="text-center">
                        <a href="#" className="more-btn">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Icon Box */}
                  <div className="col-xl-4" data-aos="fade-up" data-aos-delay={400}>
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-inboxes" />
                      <h4>FAQs about pet adoption</h4>
                      <p>
                        Get answers to all of your questions about pet adoption.
                      </p>
                      <div className="text-center">
                        <a href="#" className="more-btn">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Icon Box */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Why Us Section */}
        {/* ======= Stats Counter Section ======= */}
        <section id="stats-counter" className="stats-counter">
          <div className="container" data-aos="zoom-out">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={1178}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Rescued Strays</p>
                </div>
              </div>
              {/* End Stats Item */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={21}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Projects</p>
                </div>
              </div>
              {/* End Stats Item */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={327}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Re-homed Strays</p>
                </div>
              </div>
              {/* End Stats Item */}
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={32}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Volunteers</p>
                </div>
              </div>
              {/* End Stats Item */}
            </div>
          </div>
        </section>
        {/* End Stats Counter Section */}
        {/* ======= shop Section ======= */}
        <section id="menu" className="menu">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>Our Shop</h2>
              <p>
                Check Out Some <span>Dog Essentials and Merchandise</span>
              </p>
            </div>
            <ul
              className="nav nav-tabs d-flex justify-content-center"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-starters"
                >
                  <h4>Toys</h4>
                </a>
              </li>
              {/* End tab nav item */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-breakfast"
                >
                  <h4>Bowls and Feeders</h4>
                </a>
                {/* End tab nav item */}
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-lunch"
                >
                  <h4>Accessories</h4>
                </a>
              </li>
              {/* End tab nav item */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#menu-dinner"
                >
                  <h4>Care and Health Supplies</h4>
                </a>
              </li>
              {/* End tab nav item */}
            </ul>
            <div className="tab-content" data-aos="fade-up" data-aos-delay={300}>
              <div className="tab-pane fade active show" id="menu-starters">
                <div className="tab-header text-center">
                  <p>Shop</p>
                  <h3>Toys</h3>
                </div>
                <div className="row gy-5">
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/shop/toy-1.jpg" className="glightbox">
                      <img
                        src="assets/img/shop/toy-1.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Chewable Pig that Oinks</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$5.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/shop/toy-2.jpg" className="glightbox">
                      <img
                        src="assets/img/shop/toy-2.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Jungle Plush Pals</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$14.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/shop/toy-3.jpg" className="glightbox">
                      <img
                        src="assets/img/shop/toy-3.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Sratch Post</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$8.95</p>
                  </div>
                  {/* Menu Item */}
                </div>
              </div>
              {/* End Starter Menu Content */}
              <div className="tab-pane fade">
                <div className="tab-header text-center">
                  <p>Shop</p>
                  <h3>Bowls and Feeders</h3>
                </div>
                <div className="row gy-5">
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/shop/bowl-1.jpg" className="glightbox">
                      <img
                        src="assets/img/shop/bowl-1.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Double Pet Bowl</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$5.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/shop/bowl-2.jpg" className="glightbox">
                      <img
                        src="assets/img/shop/bowl-2.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Elevated Wooden Bowl</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$7.00</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/shop/bowl-2.jpg" className="glightbox">
                      <img
                        src="assets/img/shop/bowl-3.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Elevated Food Bowl</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$14.95</p>
                  </div>
                  {/* Menu Item */}
                </div>
              </div>
              {/* End Breakfast Menu Content */}
              <div className="tab-pane fade" id="menu-lunch">
                <div className="tab-header text-center">
                  <p>Shop</p>
                  <h3>Accessories</h3>
                </div>
                <div className="row gy-5">
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                      <img
                        src="assets/img/shop/accessory-1.webp"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Adjustable Pet Collar</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$5.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/menu/menu-item-2.png" className="glightbox">
                      <img
                        src="assets/img/shop/accessory-2.png"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Dog Muzzle</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$14.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/menu/menu-item-3.png" className="glightbox">
                      <img
                        src="assets/img/shop/accessory-3.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Very Cool Dog Sunglasses</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$8.95</p>
                  </div>
                  {/* Menu Item */}
                </div>
              </div>
              {/* End Accessories Content */}
              <div className="tab-pane fade">
                <div className="tab-header text-center">
                  <p>Shop</p>
                  <h3>Care and Health Supplies</h3>
                </div>
                <div className="row gy-5">
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                      <img
                        src="assets/img/shop/care-1.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Pet Honesty - 10-in-1 Multivitamin</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$5.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4 menu-item">
                    <a href="assets/img/menu/menu-item-2.png" className="glightbox">
                      <img
                        src="assets/img/shop/care-2.jpg"
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>Nature Remedy - Healthy Skin+</h4>
                    <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p>
                    <p className="price">$14.95</p>
                  </div>
                  {/* Menu Item */}
                </div>
              </div>
              {/* End Care and Health Essentials Content */}
            </div>
          </div>
          <div className="text-center view-moreBtn">
            <button type="submit">View More</button>
          </div>
        </section>
        {/* End shop Section */}
      </main>
    </>
    
        
    )
}

export default Home;
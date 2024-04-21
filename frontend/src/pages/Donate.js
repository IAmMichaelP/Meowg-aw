import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Donate = () => {
    
    return (
        <>
        <div className="breadcrumbs about-container">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-3">Donate</h1>
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Donate</li>
              </ol>
            </div>
          </div>
        </div>
        {/* End Breadcrumbs */}
        {/* ======= Donate Now Section ======= */}
        <section id="donate-now" className="section">
          <div className="container">
            <div className="text-center mb-5">
              <h1>Donate Now</h1>
              <p className="lead">
                MeowgAw is not only a pet-adoption site, but an organization dedicated
                to the well-being of stray animals at UP Visayas. Our mission is to
                contribute positively to the lives of abandoned, abused, injured, and
                neglected animals in the locality. However, this is only possible with
                people like you, who share our love for animals.
              </p>
            </div>
          </div>
        </section>
        {/* End Donate Now Section */}
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
        {/* ======= Donate Options ======= */}
        <section id="donate-options" className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Donate Online</h2>
                    <p className="card-text">
                      You can make an online donation securely through our website
                      using your credit card or e-wallet account.
                    </p>
                    <a href="#donation-information" className="btn btn-primary">
                      Donate Online
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Donate In Kind</h2>
                    <p className="card-text">
                      If you prefer to donate physical items such as pet food, toys,
                      blankets, or other supplies, please visit our shelter during our
                      operating hours.
                    </p>
                    <a href="#shelter-wishlist" className="btn btn-primary">
                      Donate In-Kind
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Donate Options */}
        {/* ======= Donation Information Section ======= */}
        <section id="donation-information" className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* Donation Form */}
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Make a One-Time Donation</h2>
                    <p className="card-text">
                      Help us give these animals a second chance at a happy and
                      healthy life.
                    </p>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="donation-amount" className="me-3">
                        I'm Donating
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">₱</span>
                        <input
                          type="number"
                          className="form-control"
                          id="donation-amount"
                          name="donation-amount"
                          readOnly=""
                          required=""
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Donation Options"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          data-donation-amount={1000}
                        >
                          ₱1000
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          data-donation-amount={750}
                        >
                          ₱750
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          data-donation-amount={500}
                        >
                          ₱500
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#customAmountModal"
                        >
                          Other
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-donate">
                      Donate
                    </button>
                  </div>
                </div>
                {/* End Donation Form */}
              </div>
              <div className="col-lg-6">
                {/* Image Container */}
                <div className="image-container">
                  <img
                    src="./doCATe.jpg"
                    alt="Donate Image"
                    className="img-fluid"
                  />
                </div>
                {/* End Image Container */}
              </div>
            </div>
          </div>
        </section>
        {/* End Donation Information Section */}
        {/* ======= Cats & Dogs Wish List Section ======= */}
        <section id="cats-dogs-wishlist" className="section">
          <div className="container">
            <div className="section-title">
              <h2>Cats &amp; Dogs Wish List</h2>
              <p>
                Here are some items that our cats and dogs would greatly appreciate:
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>Dog and Cat food</li>
                  <li>Blankets and bedding</li>
                  <li>Interactive toys</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li>Carriers or cages</li>
                  <li>Collars and leashes</li>
                  <li>Medical supplies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* End Cats & Dogs Wish List Section */}
        {/* ======= Shelter Wish List Section ======= */}
        <section id="shelter-wishlist" className="section">
          <div className="container">
            <div className="section-title">
              <h2>Shelter Wish List</h2>
              <p>
                Additionally, here are some items that would greatly benefit our
                shelter:
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    Cleaning supplies (such as mops, brooms, cleaning solution, etc.)
                  </li>
                  <li>Office supplies (such as paper, pens, etc.)</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li>Building materials for shelter repairs and maintenance</li>
                  <li>Volunteer uniforms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* End Shelter Wish List Section */}
        {/* ======= Donate Ending Section ======= */}
        <section id="donate-ending" className="section">
          <div className="container">
            <div className="text-center mb-5">
              <p className="lead">
                If you wish to make in-kind donations or have specific items you'd
                like to contribute, your donations can be dropped off at the address
                below. We welcome your support in any form, and your kindness goes a
                long way in making a difference in the lives of our animals.
              </p>
            </div>
          </div>
        </section>
        {/* End Donate Ending Section */}
      </>
      
    )}

export default Donate;
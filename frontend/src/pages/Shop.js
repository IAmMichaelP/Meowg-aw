import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Shop = () => {
    

    return (
        <>
        <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <div className="breadcrumbs about-container">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-3">Shop</h1>
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Shop</li>
              </ol>
            </div>
          </div>
        </div>
        {/* End Breadcrumbs */}
        {/* ======= shop ======= */}
        <section className="py-5">
          <div className="menu">
            <ul
              id="menuTabs"
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
                  <h4>All</h4>
                </a>
              </li>
              {/* End tab nav item */}
              <li className="nav-item">
                <a
                  className="nav-link"
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
          </div>
          <div className="container px-4 px-lg-5 mt-5" id="shopItemsContainer">
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
              {/*-items added dynamically*/}
            </div>
          </div>
        </section>
      </main></>
      
    
        
    )
}

export default Shop;
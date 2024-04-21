import { useEffect, useState } from 'react';
// import Axios from 'axios';

const AddItem = () => {

    return (
        <main id="main">
  {/* ======= Breadcrumbs ======= */}
  <div className="breadcrumbs about-container">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="display-3">Sell an Item</h1>
        <ol>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>Shop</li>
        </ol>
      </div>
    </div>
  </div>
  {/* End Breadcrumbs */}
  {/* ======= Add an item ======= */}
  <section className="py-5">
    <p
      className="createBack"
      href="#"
      onclick="window.history.back(); return false;"
    >
      &lt;Back
    </p>
    <form style={{ width: "35rem" }} className="mx-auto">
      {/* Item image */}
      <label className="form-label" htmlFor="itemImg">
        Upload Image:
      </label>
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        id="itemImg"
        name="img"
        required=""
      />
      <br />
      {/* Item name */}
      <label className="form-label" htmlFor="itemName">
        Item Name:{" "}
      </label>
      <input type="text" id="itemName" className="form-control" />
      {/* Item price */}
      <label className="form-label" htmlFor="itemPrice">
        Price:{" "}
      </label>
      <input type="email" id="itemPrice" className="form-control" />
      {/* Quantity */}
      <label className="form-label" htmlFor="itemDescription">
        Quantity:{" "}
      </label>
      <input type="number" id="itemQuantity" className="form-control" />
      {/* Item description */}
      <label className="form-label" htmlFor="itemDescription">
        Description:{" "}
      </label>
      <textarea
        className="form-control"
        id="itemDescription"
        rows={4}
        defaultValue={""}
      />
      {/* Submit button */}
      <br />
      <button type="button" className="btn btn-primary btn-block mb-4">
        Submit
      </button>
    </form>
  </section>
</main>

    )
}

export default AddItem;
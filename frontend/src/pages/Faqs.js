import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Faqs = () => {
    
    return (
        <div className="faq">
        <div className="FAQs">
          <h1>FAQs</h1>
          <h3 className="faq-list">
            Do you offer post-adoption support or resources?
          </h3>
          <div className="panel">
            <p>
              Yes, we provide post-adoption guidance and resources to help you adjust
              to your new pet. Our team is available to answer questions and offer
              assistance after adoption.
            </p>
          </div>
          <hr />
          <h3 className="faq-list">What should I consider before adopting a pet?</h3>
          <div className="panel">
            <p>
              Before adopting, consider your lifestyle, living situation, and the
              pet's needs. Ensure you have the time, resources, and commitment to
              provide a loving and permanent home. For more information, you can visit
              our blogs page.
            </p>
          </div>
          <hr />
          <h3 className="faq-list">
            Can I visit and spend time with a pet before adopting?
          </h3>
          <div className="panel">
            <p>
              Absolutely! We encourage prospective adopters to spend time with pets to
              ensure compatibility and bond with their potential new family member.
            </p>
          </div>
          <hr />
          <h3 className="faq-list">
            Can I volunteer or donate to support your shelter?
          </h3>
          <div className="panel">
            <p>
              Absolutely! We welcome volunteers and greatly appreciate donations.
              Volunteering your time or donating supplies helps us care for more
              animals and improve their lives.
            </p>
          </div>
          <hr />
          <h3 className="faq-list">
            Can I return an adopted pet if it doesn't work out?
          </h3>
          <div className="panel">
            <p>
              While we strive for successful adoptions, circumstances may arise. We
              encourage adopters to contact us first, and we'll do our best to assist.
              There might be a return policy in place.
            </p>
          </div>
          <hr />
        </div>
      </div>
      
    )}

export default Faqs;
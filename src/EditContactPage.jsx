import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const EditContactPage = ({ match }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  });
  const { phone } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://z6lnh50aua.execute-api.us-east-2.amazonaws.com/dev/contact?phone=${phone}`
      )
      .then(function (response) {
        setContact(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const saveContact = () => {
    axios
    .put(
      `https://z6lnh50aua.execute-api.us-east-2.amazonaws.com/dev/updateContact?phone=${phone}`,
      contact
    )
    .catch(function (error) {
      console.log("Updated New Contact:", phone, error);
    });
  };

  return (
    <div className="edit container my-5 ">
      {contact.firstName === "" ? (
        <div className="spinner d-flex align-items-center justify-content-center position-absolute top-0">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div>
          <div className="row mb-5">
            <div className="col-md-1 align-baseline py-3 d-flex flex-row align-items-center">
              <Link to="/" className="fs-1 text-decoration-none back-link">
                {" "}
                👈
              </Link>
              <h5 className="back-text">Back</h5>
            </div>
            <h2 className="text-primary text-center col-md-11">
              Edit {contact.firstName} {contact.lastName}'s Contact
            </h2>
          </div>
          <form>
            <div className="row mb-3">
              <div className="mb-3 col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={contact.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={contact.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={contact.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                value={contact.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveContact}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditContactPage;

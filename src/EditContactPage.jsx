import React, { useEffect, useState } from "react";
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

  console.log("param", phone);
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

  // Function to handle image upload (you'll need to implement this)
  // const handleImageUpload = (e) => {
  //   // Handle image upload logic here
  // };

  const saveContact = () => {
    // Save the edited contact (you can update the contact in your data store or API)
    console.log("Contact saved:", contact);
  };

  return (
    <div className="edit container my-5 ">
      <div className="row mb-5">
        <div className="col-md-1 align-baseline py-3">
          <Link to="/">⬅ Home</Link>
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
        {/* <div className="mb-3">
          <label htmlFor="picture" className="form-label">
            Picture
          </label>
          <input
            type="file"
            className="form-control-file"
            id="picture"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div> */}
        <button type="button" className="btn btn-primary" onClick={saveContact}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;

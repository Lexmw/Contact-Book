import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [show, setShow] = useState(false);
  const [hoverState, setHoverState] = useState(-1);

  useEffect(() => {
    const dataFetch = () => {
      axios
        .get(
          "https://z6lnh50aua.execute-api.us-east-2.amazonaws.com/dev/allContacts"
        )
        .then(function (response) {
          setContacts(response.data);
        })
        .catch(function (error) {
          console.log("Catch:", error);
        });
    };

    dataFetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value
    });
  };

  const postNewContact = (newContact) => {
    axios
      .post(
        "https://z6lnh50aua.execute-api.us-east-2.amazonaws.com/dev/createContact",
        newContact
      )
      .then(function (response) {
        setContacts([...contacts, newContact]);
      })
      .catch(function (error) {
        console.log("Post New Contact:", error);
      });
  };

  const deleteContact = (phone) => {
    axios
      .post(
        `https://z6lnh50aua.execute-api.us-east-2.amazonaws.com/dev/deleteContact?phone=${phone}`,
        newContact
      )
      .then(function (response) {
        setContacts([...contacts]);
      })
      .catch(function (error) {
        console.log("Delete Contact:", error);
      });
  };

  const modalOpen = () => {
    setShow(true);
    return;
  };

  const modalClose = () => {
    setShow(false);
    return;
  };

  const handleAddContact = () => {
    postNewContact(newContact);
    setNewContact({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      notes: ""
    });
    modalClose();
  };

  return (
    <div className="container mt-5">
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row mb-3">
              <div className="form-group col-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={newContact.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={newContact.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                value={newContact.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                name="phone"
                value={newContact.phone}
                onChange={handleChange}
              />
            </div>

            <div className="fmb-3">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                type="text"
                className="form-control"
                name="notes"
                value={newContact.notes}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <button
            className="btn btn-success mb-4 col-8 mx-auto"
            variant="primary"
            onClick={handleAddContact}
          >
            Add
          </button>
          
        </Modal.Footer>
      </Modal>

      <button
        type="button"
        className="btn btn-info col-12 mb-4"
        onClick={modalOpen}
      >
        Add New Contact
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
              <td>
                <Link to={`/edit/${contact.phone}`}>{contact.firstName}</Link>
              </td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.notes}</td>
              <td>
                <button
                  style={{ borderStyle: "none", background: "none" }}
                  onClick={() => deleteContact(contact.phone)}
                  onMouseEnter={() => setHoverState(index)}
                  onMouseLeave={() => setHoverState(-1)}
                >
                  <svg
                    style={{ color: hoverState === index ? "red" : "black" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;

//Need to do
//Add form validation to add new contact
// add the new update route to the edit page
// Add the authorization to the api calls
//Style the edit page to be better
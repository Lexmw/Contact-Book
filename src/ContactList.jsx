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
        console.log("line 73", response);
        setContacts([...contacts, newContact]);

      })
      .catch(function (error) {
        console.log("line 77", error);
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
            className="btn btn-danger mb-4"
            variant="secondary"
            onClick={modalClose}
          >
            Close
          </button>
          <button
            className="btn btn-success mb-4"
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
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
              <td>
                <Link to={`/edit/${contact.phone}`}>
                  {contact.firstName}
                </Link>
              </td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    id: 1,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notes: ""
  });

  useEffect(
    (item) => {
      console.log("latest contacts", contacts);
    },
    [contacts]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value
    });
  };

  const handleAddContact = () => {
    setNewContact({
      id: contacts.length + 2,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      notes: ""
    });
    setContacts([...contacts, newContact]);
  };

  return (
    <div className="container mt-5" style={{ width: "85%" }}>
      <form>
        <label>
          First Name
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="First Name"
            value={newContact.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            value={newContact.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={newContact.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newContact.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Notes
          <input
            type="text"
            className="form-control"
            name="notes"
            placeholder="Notes"
            value={newContact.notes}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleAddContact}>Add New Contact</button>
      </form>
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
                <Link to={`/edit/${contact.id}`}>{contact.firstName}</Link>
              </td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.notes}</td>
            </tr>
          ))}
          {/* <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={newContact.firstName}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                value={newContact.lastName}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={newContact.email}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newContact.phoneNumber}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="notes"
                placeholder="Notes"
                value={newContact.notes}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              <button
                type="button"
                className="btn btn-success col-12"
                onClick={handleAddContact}
              >
                +
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;

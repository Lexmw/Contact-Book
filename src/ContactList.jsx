import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteHoverState, setDeleteHoverState] = useState(-1);
  const [editHoverState, setEditHoverState] = useState(-1);
  const [deleteModalContent, setDeleteModalContent] = useState({});

  const restapi_id = process.env.REACT_APP_REST_API_ID;
  const region = process.env.REACT_APP_REGION;
  const stage_name = process.env.REACT_APP_STAGE_NAME;

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get(`https://${restapi_id}.execute-api.${region}.amazonaws.com/${stage_name}/allContacts`);
        setContacts(response.data);
      } catch (error) {
        console.log("Catch:", error);
      }
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

  const postNewContact = async (newContact) => {
    try {
      await axios.post(
        `https://${restapi_id}.execute-api.${region}.amazonaws.com/${stage_name}/createContact`,
        newContact
      );
      setContacts([...contacts, newContact]);
    } catch (error) {
      console.error("Post New Contact:", error);
    }
  };

  const deleteContact = async (phone) => {
    try {
      await axios.delete(
        `https://${restapi_id}.execute-api.${region}.amazonaws.com/${stage_name}/deleteContact?phone=${phone}`
      );
      const filteredContacts = contacts.filter((contact) => contact.phone !== phone);
      setContacts([...filteredContacts]);
    } catch (error) {
      console.log(`phone: ${phone}\nDelete Contact:`, error);
    }
  };
  

  const addModalOpen = () => setShowAddModal(true);

  const deleteModalOpen = (obj) => {
    setShowDeleteModal(obj.openModal);
    setDeleteModalContent(obj.contact);
    console.log(deleteModalContent);
  };

  const modalClose = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
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

  const handleDeleteContact = (phone) => {
    deleteContact(phone);
    modalClose();
  };

  return (
    <div className="container mt-5">
      {contacts.length === 0 ? (
        <div className="spinner d-flex align-items-center justify-content-center position-absolute top-0">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div>
          <Modal show={showAddModal} onHide={modalClose}>
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
            id="new-contact-button"
            type="button"
            className="btn btn-info px-2 mb-2 position-absolute end-0 flex"
            onClick={addModalOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill-add"
              viewBox="0 0 20 20"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4" />
            </svg>
            <p className="hide">Add Contact</p>
          </button>

          <Modal show={showDeleteModal} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                Are you sure you want to delete &nbsp;
                {deleteModalContent.firstName} {deleteModalContent.lastName}'s
                contact?
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-success mb-4 col-8 mx-auto"
                variant="primary"
                onClick={() => handleDeleteContact(deleteModalContent.phone)}
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal>

          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Contact</th>
                <th>Notes</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td className="p-3">
                    <img
                      width="50px"
                      src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                      alt="profile placeholder"
                    />
                  </td>
                  <td>
                    {contact.firstName} {contact.lastName}
                    <div>
                      {contact.phone} •
                      <Link to={`mailto:${contact.email}`}>
                        {contact.email}
                      </Link>
                    </div>
                  </td>
                  <td>{contact.notes}</td>
                  <td
                    onMouseEnter={() => setEditHoverState(index)}
                    onMouseLeave={() => setEditHoverState(-1)}
                  >
                    <Link to={`/edit/${contact.phone}`}>
                      <svg
                        style={{
                          color: editHoverState === index ? "orange" : "black"
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </Link>
                  </td>
                  <td>
                    <button
                      style={{ borderStyle: "none", background: "none" }}
                      onClick={() =>
                        deleteModalOpen({ openModal: true, contact: contact })
                      }
                      onMouseEnter={() => setDeleteHoverState(index)}
                      onMouseLeave={() => setDeleteHoverState(-1)}
                    >
                      <svg
                        style={{
                          color: deleteHoverState === index ? "red" : "black"
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
      )}
    </div>
  );
};

export default ContactTable;
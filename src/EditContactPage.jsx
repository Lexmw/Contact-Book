import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditContactPage = ({ match }) => {
  const { id } = useParams();
  // Sample data (initial contacts)
  const initialContacts = [
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      email: 'john@example.com',
      notes: 'Lorem ipsum dolor sit amet',
      // Add an image property here if you want to display/edit images.
    },
    // Add more initial contacts as needed
  ];

  console.log('param',id)
  console.log('initial', initialContacts[0].id)
  const [contact, setContact] = useState(initialContacts.find((c) => c.id == id));
  // console.log('contact', initialContacts.find((c) => c.id == id))

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  // Function to handle image upload (you'll need to implement this)
  const handleImageUpload = (e) => {
    // Handle image upload logic here
  };

  // Function to save the edited contact
  const saveContact = () => {
    // Save the edited contact (you can update the contact in your data store or API)
    console.log('Contact saved:', contact);
  };

  return (
    <div>
      <h1>Edit {contact.firstName} {contact.lastName}'s Contact</h1>
      <form>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleInputChange}
          />
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
        <div className="mb-3">
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
        </div>
        <button type="button" className="btn btn-primary" onClick={saveContact}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;

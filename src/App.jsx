import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./database/firebase";
import Cards from "./components/Cards";
import Modal from "./components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setCotnacts] = useState([]);
  const [contact, setCotnact] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateContact, setIsUpdateContact] = useState(false);

  const handleIsUpdateContact = (data) => {
    setIsUpdateContact(data);
  };

  const isUpdatedContact = (data) => {
    setIsUpdateContact(!data);
  };

  const handleOpenModal = (data) => {
    setIsOpenModal(data);
  };

  const handleCloseModal = (data) => {
    setIsOpenModal(data);
  };

  const handleSearchContact = (data) => {
    setCotnacts(data);
  };

  const handleContactData = (data) => {
    setCotnact(data);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");
        onSnapshot(contactRef, (snapShot) => {
          const contactLists = snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setCotnacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    getContacts();
  }, []);

  return (
    <div>
      <Navbar />
      <Search
        isOpen={handleOpenModal}
        searchResults={handleSearchContact}
        contacts={contacts}
      />
      <div className="mt-2 flex flex-col gap-2">
        {contacts.map((contact) => {
          return (
            <Cards
              key={contact.id}
              contact={contact}
              isOpen={handleOpenModal}
              isUpdate={handleIsUpdateContact}
              contactData={handleContactData}
            />
          );
        })}
      </div>
      <Modal
        isOpen={isOpenModal}
        isClose={handleCloseModal}
        isUpdate={isUpdateContact}
        isUpdated={isUpdatedContact}
        contactData={contact}
      />
      <ToastContainer />
    </div>
  );
};

export default App;

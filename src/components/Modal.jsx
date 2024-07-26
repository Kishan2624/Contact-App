import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Field, Formik, Form, ErrorMessage } from "formik";
import React from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { db } from "../database/firebase";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Modal = ({ isOpen, isClose, isUpdate, isUpdated, contactData }) => {
  if (!isOpen) {
    return null;
  }

  const handleCloseBtn = () => {
    isClose(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const addContact = async (contact) => {
    try {
      handleCloseBtn();
      toast("Successfully Added!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateContact = async ({ contact, id }) => {
    try {
      handleCloseBtn();
      toast("Successfully Updated!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      isUpdated(true);
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, contact);
    } catch (error) {
      console.log("error", error);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="container z-50 mx-auto flex h-[100vh] w-[100vw] items-center justify-center backdrop-blur-[2px]">
        <div className="mx-auto max-w-[376px]">
          <div className="mx-auto h-[244px] w-[348px] rounded-md bg-white shadow-md shadow-black">
            <div className="relative flex h-full w-full items-center justify-center">
              <IoIosCloseCircleOutline
                onClick={handleCloseBtn}
                className="absolute right-5 top-5 cursor-pointer text-3xl"
              />
              <div className="w-full px-5">
                <Formik
                  initialValues={
                    isUpdate
                      ? { name: contactData.name, email: contactData.email }
                      : { name: "", email: "" }
                  }
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    isUpdate
                      ? updateContact({ contact: values, id: contactData.id })
                      : addContact(values);
                  }}
                >
                  <Form className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <label htmlFor="name">Name</label>
                      <Field
                        name="name"
                        placeholder="Enter Name..."
                        className="placeholder:text-grey rounded-sm border-2 p-2 text-black outline-none"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error text-red"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="email">Email</label>
                      <Field
                        name="email"
                        placeholder="Enter Email..."
                        className="placeholder:text-grey rounded-sm border-2 p-2 text-black outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error text-red"
                      />
                    </div>
                    <button
                      type="submit"
                      className="absolute bottom-2 right-5 rounded-md border-2 border-black bg-darkYellow px-3 py-1"
                    >
                      {isUpdate ? "Update Contact" : "Add Contact"}
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;

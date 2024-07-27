import React, { useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { TbEditCircle } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = ({ contact, isOpen, isUpdate, contactData }) => {
  const handleEditBtn = () => {
    isOpen(true);
    isUpdate(true);
    contactData(contact);
  };

  const deleteContact = async (id) => {
    try {
      toast("Successfully Deleted!", {
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
      await deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="container mx-auto flex h-16 w-full min-w-[250px] max-w-[360px] items-center justify-between rounded-lg bg-yellow px-4 py-2">
        <div className="over flex w-full items-center gap-1 overflow-hidden">
          <PiUserCircleLight className="h-full max-h-[48px] min-h-[38px] w-full min-w-[38px] max-w-[48px] font-light text-orange" />
          <div className="flex w-[184px] flex-col">
            <p className="text-md font-medium capitalize">{contact.name}</p>
            <p className="truncate text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex w-full min-w-[58px] max-w-[72px]">
          <TbEditCircle
            onClick={handleEditBtn}
            className="h-full max-h-[32px] min-h-[28px] w-full min-w-[28px] max-w-[32px] cursor-pointer"
          />
          <MdDeleteForever
            onClick={() => deleteContact(contact.id)}
            className="h-full max-h-[32px] min-h-[28px] w-full min-w-[28px] max-w-[32px] cursor-pointer text-purple"
          />
        </div>
      </div>
    </>
  );
};

export default Cards;

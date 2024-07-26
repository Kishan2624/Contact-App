import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { db } from "../database/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Search = ({ isOpen, searchResults }) => {
  const handleAddBtn = () => {
    isOpen(true);
  };

  const [searchContactResults, setSearchContactResults] = useState([]);

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
          setSearchContactResults(contactLists);
          searchResults(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    getContacts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query === " ") {
      searchResults(contactLists);
    } else {
      const filterSearch = searchContactResults.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query),
      );
      searchResults(filterSearch);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center gap-3 px-4 py-2">
      <div className="flex h-[40px] items-center justify-start gap-3">
        <input
          onChange={handleSearch}
          className="w-[295px] rounded-lg border border-solid border-white bg-transparent py-2 ps-10 text-white outline-none placeholder:font-light placeholder:text-white"
          type="text"
          placeholder="Search Contact"
        />
        <IoMdSearch className="absolute ms-2 text-2xl text-white" />
      </div>
      <FaPlus
        onClick={handleAddBtn}
        className="h-[52px] w-[52px] cursor-pointer rounded-full bg-white p-[14px] text-sm text-black transition-transform ease-in-out hover:scale-105"
      />
    </div>
  );
};

export default Search;

import React from "react";
import FirebaseLogo from "/firebase_logo.svg";

const Navbar = () => {
  return (
    <div className="container mx-auto flex justify-center px-4 py-2">
      <div className="flex h-[60px] w-[361px] max-w-[361px] items-center justify-center gap-2 rounded-lg bg-white">
        <img src={FirebaseLogo} alt="firebase logo" />
        <h1 className="font-sans text-xl font-bold">Firebase Contact App</h1>
      </div>
    </div>
  );
};

export default Navbar;

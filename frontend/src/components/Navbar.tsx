import React from "react";

type NavebarProps = {
  handleAddChannel: () => void;
};

const Navbar = ({ handleAddChannel }: NavebarProps) => {
  return (
    <div className="navbar">
      <img src="images/logo.png" className="logo" alt="logo" />
      <div className="navBarOption">
        <button onClick={handleAddChannel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

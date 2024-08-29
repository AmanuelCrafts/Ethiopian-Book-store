import React from "react";
import { Github } from "lucide-react";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-6">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.instagram.com/aman_z445/" target="_blank">
            <Instagram />
          </a>
          <a href="https://github.com/AmanuelCrafts/" target="_blank">
            <Github />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Amanuel
          Abebaw
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

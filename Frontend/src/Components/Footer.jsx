import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
        
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold">About Digital Library</h2>
          <p className="text-sm mt-2">
            A modern digital library providing access to thousands of books across various genres.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/home" className="hover:underline">Home</a></li>
            <li><a href="/books" className="hover:underline">Browse Books</a></li>
            <li><a href="/categories" className="hover:underline">Categories</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p className="mt-2 flex items-center gap-2">
            <FaEnvelope /> support@digitallibrary.com
          </p>
          <p className="mt-2 flex items-center gap-2">
            <FaPhone /> +91 98765 43210
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-blue-400"><FaFacebook size={20} /></a>
            <a href="#" className="text-blue-300"><FaTwitter size={20} /></a>
            <a href="#" className="text-pink-500"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} Digital Library. All Rights Reserved.
      </div>
    </footer>
    </>
  )
}

export default Footer
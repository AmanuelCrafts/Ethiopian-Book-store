import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Loader from "../components/loader/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRef = doc(db, "books", id);
        const bookSnap = await getDoc(bookRef);

        if (bookSnap.exists()) {
          setBook(bookSnap.data());
        } else {
          console.log("No such book!");
        }
      } catch (error) {
        console.error("Error fetching book details: ", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <Loader />;
  }

  const handleReadMeClick = () => {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, "_blank");
    } else {
      console.log("No PDF URL available for this book.");
    }
  };

  const handleChatClick = () => {
    navigate(`/chat`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-5">
      <div className="flex items-center text-copy justify-between p-6">
        <div className="flex-shrink-0">
          <img
            src={book.imgSrc}
            alt={book.subject}
            className="w-48 h-auto object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow ml-6">
          <h1 className="text-3xl font-bold mb-4">{book.subject}</h1>
          <p>
            <strong>Grade:</strong> {book.grade}
          </p>
          <p>
            <strong>Total Units:</strong> {book.totalUnits}
          </p>
          <p>
            <strong>Total Pages:</strong> {book.totalPages}
          </p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleReadMeClick}
              className="px-6 py-2 bg-secondary text-secondary-content rounded-lg border border-secondary-dark hover:bg-secondary-dark hover:text-secondary-content transition duration-300"
            >
              Read me
            </button>
            <button
              onClick={handleChatClick}
              className="px-6 py-2 bg-primary-dark text-primary-content rounded-lg border border-primary hover:bg-primary hover:border-primary-light transition duration-300"
            >
              Chat with Ai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

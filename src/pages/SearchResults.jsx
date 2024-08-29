import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // Import Firebase Firestore instance
import BookCard from "../components/BookCard";
import Loader from "../components/loader/Loader"; // Assuming you have a Loader component

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ensure no duplicate books are added
        const uniqueBooks = Array.from(
          new Set(booksData.map((book) => book.id))
        ).map((id) => booksData.find((book) => book.id === id));

        setBooks(uniqueBooks);
      } catch (error) {
        setError("Error fetching books data");
        console.error("Error fetching books data: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching or if an error occurs
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures useEffect runs once

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.subject.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-background py-10 px-5 lg:px-20 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-primary-content">
        Search Results for "{query}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              imgSrc={book.imgSrc}
              subject={`${book.grade} ${book.subject}`}
            />
          ))
        ) : (
          <p className="text-xl text-copy">
            No results found for your search,{" "}
            <strong>try searching the subject name Only</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

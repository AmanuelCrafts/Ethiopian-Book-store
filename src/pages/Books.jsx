import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import BookCard from "../components/BookCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../components/loader/Loader";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  // Fetch books from Firestore only once
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
        console.error("Error fetching books data: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching or if an error occurs
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures useEffect runs once

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const gradeBooks = (grade) => books.filter((book) => book.grade === grade);

  return (
    <div className="mx-auto bg-background flex flex-col gap-10 py-10 px-5 lg:px-20">
      {loading ? (
        <Loader />
      ) : (
        ["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
          <div key={grade} className="my-2">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary-content">{`${grade} Books`}</h2>
            <div className="overflow-hidden">
              <Slider
                {...settings}
                className="react-slick-slider pl-[5rem] px-0 md:px-8"
              >
                {gradeBooks(grade).map((book) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    imgSrc={book.imgSrc}
                    subject={`${grade} ${book.subject}`}
                  />
                ))}
              </Slider>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Books;

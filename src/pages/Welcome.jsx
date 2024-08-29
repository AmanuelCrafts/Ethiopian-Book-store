import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Welcome = () => {
  return (
    <div className="bg-background text-copy flex flex-col items-center justify-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center px-5 md:px-10 lg:px-20 py-8 lg:py-16 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-1 flex-col items-center lg:items-start justify-center gap-4 lg:gap-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 lg:mb-3 leading-tight text-primary-content">
              Get Books from Grade <span className="text-secondary">9</span> to{" "}
              <span className="text-secondary">12</span>!
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-3 max-w-md lg:max-w-none">
              Discover and interact with a vast collection of textbooks 📗. Chat
              with your books for personalized learning and insights.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <button className="btn btn-primary px-6 py-3 lg:px-8 lg:py-4">
                  Browse Books
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center mt-8 lg:mt-0">
            <img
              src="./hero-img.svg"
              alt="Books"
              className="w-full max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;

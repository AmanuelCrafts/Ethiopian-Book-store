import { useNavigate } from "react-router-dom";

const BookCard = ({ id, imgSrc, subject }) => {
  const navigate = useNavigate();

  const handleReadMeClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="w-56 h-96 bg-background p-4 flex flex-col gap-3 rounded-2xl shadow-lg">
      <div className="h-64 bg-gray-700 rounded-xl overflow-hidden">
        <img
          src={imgSrc}
          alt={subject}
          className="w-full h-full rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-bold text-copy">{subject}</h4>
        <button
          className="bg-secondary text-secondary-content font-semibold py-3 px-4 rounded-md hover:bg-secondary-dark transition"
          onClick={handleReadMeClick}
        >
          Read Me
        </button>
      </div>
    </div>
  );
};

export default BookCard;

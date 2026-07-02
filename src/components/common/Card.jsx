const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      {children}
    </div>
  );
};

export default Card;

const Logo = ({ size = "text-3xl" }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg">
        🏥
      </div>

      <div>
        <h1 className={`${size} font-bold text-blue-700`}>SehatRaj</h1>

        <p className="text-xs tracking-[3px] text-cyan-600 font-semibold">
          HEALTHCARE
        </p>
      </div>
    </div>
  );
};

export default Logo;

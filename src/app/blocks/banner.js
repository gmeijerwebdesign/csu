export default function Banner() {
  return (
    <div className="px-2 border-t-1 border-b-1 border-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="csu font-bold text-md sm:text-2xl text-[#9a9a9a]">
          CSU | Scherp op schoon
        </h1>
        <img
          src="unnamed.png"
          className="relative -right-2 max-h-[50px] sm:max-h-[100px]"
        />
      </div>
    </div>
  );
}

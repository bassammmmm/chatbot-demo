const Navbar = () => {
  return (
    <div
      className="w-full h-[70px] flex items-center justify-between bg-onPrimary px-[21px] py-[9px] shadow-md mb-8"
    >
      <div className="flex items-center">
        <div
          className="w-[50px] h-[48px] flex items-center justify-center bg-primary rounded-[12px] px-[5px] py-[18px] gap-[4px]"
        >

          <span className="text-onPrimary text-[8px]">CHATBOT</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
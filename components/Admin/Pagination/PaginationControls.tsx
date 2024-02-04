import React from "react";
import { PaginationControlsProps } from "@/interfaces";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}) => {
  const visiblePages = Math.min(totalPages, 3);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div className="flex justify-center items-center pt-12 pb-6 text-3xl">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="text-[#C74FEB] hover:text-[#CD61ED] transition-all duration-500 cursor-pointer mx-3 "
      >
        <div className="p-[14px] border-2 border-[#C74FEB] rounded-full hover:scale-110 transition-all duration-500 cursor-pointer">
          <FaAngleLeft size={20} />
        </div>
      </button>
      {Array.from({ length: visiblePages }).map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={
              currentPage === pageNumber
                ? " bg-[#C74FEB] hover:bg-[#CD61ED] mx-2 rounded-full h-12 w-12 flex items-center justify-center text-[#FCDDEC] "
                : "text-[#C74FEB] mx-2 hidden md:block"
            }
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="text-[#C74FEB] hover:text-[#CD61ED] transition-all duration-500 cursor-pointer mx-3"
      >
        <div className="p-[14px] border-2 border-[#C74FEB] rounded-full hover:scale-110 transition-all duration-500 cursor-pointer">
          <FaAngleRight size={20} />
        </div>
      </button>
    </div>
  );
};

export default PaginationControls;

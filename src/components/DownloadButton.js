import React from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function DownloadButton({ downloadExcel }) {
  return (
    <div className="">
      <button
        onClick={downloadExcel}
        className="text-lg flex gap-4 rounded-md text-white font-bold bg-[#444262] px-4 py-2"
      >
        <PiMicrosoftExcelLogoFill className="text-2xl" />
        Download
      </button>
    </div>
  );
}

export default DownloadButton;

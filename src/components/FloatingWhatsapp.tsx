import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsapp = () => {
  const whatsappNumber = "94711678229"; // <-- add your number here (no +)

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 bg-green-500 text-white shadow-xl
        w-14 h-14 flex items-center justify-center rounded-full
        hover:scale-110 transition-transform cursor-pointer
        z-50
      "
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default FloatingWhatsapp;

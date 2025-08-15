import { useState } from "react";
import ChatbotUi from "./pages/ChatbotUi";

const App = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="max-h-screen overflow-hidden w-full bg-[linear-gradient(135deg,_#fdf1f1_0%,_#f3d6ff_25%,_#d6e4ff_50%,_#ffe5d4_75%,_#fff6f6_100%)] lg:flex items-center justify-around relative">
      <div className="blurr bg-gradient-to-br from-pink-300/60 to-orange-400/60 lg:bg-gradient-to-br lg:from-pink-300/60 lg:to-purple-300/90 blur-xl h-[310px] w-[310px] md:h-[400px] md:w-[400px] rounded-full absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[10%] lg:translate-x-[-120%] lg:translate-y-[-20%] "></div>

      <div
        className={`left flex flex-col justify-start pt-20 items-center lg:items-start lg:justify-start h-[100vh] lg:w-1/2 self-stretch ${isOpen ? "hidden" : "block"} `}
      >
        <div className="content pt-[5rem]">
          <h1 className="lg:text-8xl sm:text-8xl md:text-9xl text-[16vw] leading-none md:leading-27 ">Let's Start </h1>
          <h1 className="lg:text-8xl sm:text-8xl md:text-9xl text-[16vw] leading-none md:leading-27 ">Some</h1>
          <h1 className="lg:text-8xl sm:text-8xl md:text-9xl text-[16vw] leading-none md:leading-27 ">Conversation</h1>

          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setisOpen(!isOpen);
              }
            }}
            className="lg:self-start cursor-pointer lg:cursor-auto  py-2 font-semibold tracking-wider uppercase text-black/60 px-4 rounded-md text-lg mt-10 bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
          >
            Try Our Chatbot
          </button>
        </div>
      </div>

      <div
        className={`right ${
          isOpen ? "block" : "hidden"
        } lg:block  relative lg:w-[35%]`}
      >
        <ChatbotUi isOpen={isOpen} setisOpen={setisOpen} />
      </div>
    </div>
  );
};

export default App;

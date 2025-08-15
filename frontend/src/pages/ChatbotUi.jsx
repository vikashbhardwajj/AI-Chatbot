import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatbotUi = ({ setisOpen, isOpen }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJJOd3RVQYXEruXYkkKoRlb7YJqXJpyveUPagsfSKz8e5nSrm4NI85-ff06llW7etpNC4sDbS-txmtqw0gDZACQ0fOLcA99o7YQh0btkWTq49sHWN7KNjDVwb53inqaZo6JOHNq8X_avDqjDraKSJ98T5l6Kfa14paqVcB94_13DBDKRmR88SL1DR3V-uL_aKfRs5XCUvBGtwMG_zPXQy_k4nptr_k0vqIKnJh774wT7EEdpP739YCC6eYZDdT59yvwMJsvmxUrvg",
      // timestamp: new Date().toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);

    socket.emit("ai-response", inputText);

    setInputText("");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      console.log("Message sent:", e.target.value);

      handleSendMessage();
    }
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-message-response", response => {
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM4mnRlUYznYYp_6WXOULyeMaPeLHLZvxPvkGWN_gh8mtHpplNFvVkqTxxsIU2-dBMw9e6URBpXA0e_R6uj7YAxjmWPIHeSEu_GemszEI_76r082uwV-GyBX3454CJU1dE77_v5_YU34uuF7uscElayzwku7oCZSvXSlx841Av16djbp1aQNd48e91PZqM0beF9ZfyxZzCL_UcdV0JGFqZoBG_xnz_NDuOhr5DSxzs-P8JU-bFI3M2J0ruZtrN6HD1XqfQHyLG_tg",
        sender: "bot",
        // timestamp: new Date().toLocaleTimeString([], {
        //   hour: "2-digit",
        //   minute: "2-digit",
        // }),
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);

    });
  }, []);

  return (
    <>
      <style>{`
    /* For Chrome, Edge, Safari */
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: rgba(100, 100, 100, 0.4);
      border-radius: 8px;
    }
    /* For Firefox */
    .custom-scroll {
      scrollbar-width: thin;
      scrollbar-color: rgba(100, 100, 100, 0.4) transparent;
    }
  `}</style>

      <div className="relative">
        <div
          className="custom-scroll relative flex w-full h-screen lg:max-h-[80vh] overflow-y-auto flex-col bg-black/5 backdrop-blur-6xl justify-between group/design-root overflow-x-hidden rounded-md shadow-lg"
          style={{
            fontFamily: 'Manrope, "Noto Sans", sans-serif',
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
          }}
        >
          <div>
            <div className="flex items-center bg-transparent border-b-1 border-zinc-100 p-4 pb-2 justify-between">
              <div
                className="text-[#111418] flex size-12 shrink-0 items-center"
                data-icon="ArrowLeft"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="lg:hidden"
                  onClick={() => setisOpen(!isOpen)}
                >
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
                Chatbot
              </h2>
            </div>
            <div className=" flex flex-col   items-end p-4 pb-[3rem] ">
              {messages.length === 0 ? (
                <div className="bot-message flex self-start flex-row-reverse items-end gap-3 p-4 justify-end">
                  <div className="flex flex-1 flex-col gap-1 ">
                    <p className="text-[#60758a] text-[13px] font-normal leading-normal  text-start ">
                      Chatbot
                    </p>
                    <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-white/30 text-black">
                      Hello! How can I assist you today?
                    </p>
                  </div>
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBM4mnRlUYznYYp_6WXOULyeMaPeLHLZvxPvkGWN_gh8mtHpplNFvVkqTxxsIU2-dBMw9e6URBpXA0e_R6uj7YAxjmWPIHeSEu_GemszEI_76r082uwV-GyBX3454CJU1dE77_v5_YU34uuF7uscElayzwku7oCZSvXSlx841Av16djbp1aQNd48e91PZqM0beF9ZfyxZzCL_UcdV0JGFqZoBG_xnz_NDuOhr5DSxzs-P8JU-bFI3M2J0ruZtrN6HD1XqfQHyLG_tg")',
                    }}
                  ></div>
                </div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`${
                      message.sender === "bot"
                        ? "bot-message flex self-start flex-row-reverse items-end gap-3 p-4 justify-end"
                        : "user-message  flex items-end gap-3 p-4 justify-end"
                    }`}
                  >
                    <div className="flex flex-1 flex-col gap-1 items-end">
                      <p className="text-[#60758a] text-[13px] font-normal leading-normal max-w-[360px] text-right">
                        {message.sender === "bot" ? "Chatbot" : "User"}
                      </p>
                      <div className="message_content ">
                        <div
                          className={`text-base whitespace-wrap  overflow-x-auto font-normal leading-normal max-w-[75vw] sm:max-w-[550px] md:max-w-[700px] lg:max-w-[570px] rounded-xl px-4 py-3 pb-0 ${
                            message.sender === "bot"
                              ? "bg-white/30"
                              : "bg-white"
                          } text-black`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p({ node, children }) {
                                // If this <p> has a <pre> as a child, don't wrap it in <p>
                                if (node.children?.[0]?.tagName === "pre") {
                                  return <>{children}</>;
                                }
                                return (
                                  <p className="whitespace-pre-wrap break-words">
                                    {children}
                                  </p>
                                );
                              },
                              code({ inline, children, ...props }) {
                                return inline ? (
                                  <code className="px-1 py-[1px] rounded bg-gray-200 break-words">
                                    {children}
                                  </code>
                                ) : (
                                  <pre className="p-3 rounded text-white overflow-x-auto max-w-full bg-gray-900/90">
                                    <code {...props}>{children}</code>
                                  </pre>
                                );
                              },
                            }}
                          >
                            {message.text || "..."}
                          </ReactMarkdown>

                          <span className="inline-block text-xs mt-1 w-full text-end">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                      style={{
                        backgroundImage: message.bg ? `url(${message.bg})` : "",
                      }}
                    ></div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="relative  ">
            <div className="flex fixed  bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-4xl items-center  px-4 py-3 gap-3 @container">
              <label className="flex flex-col min-w-40 h-12 flex-1">
                <div className="flex w-full flex-1 items-stretch  h-full">
                  <input
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-white/90 focus:border-none h-full placeholder:text-[#60758a] px-4  border-r-0 pr-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>
            </div>
            {/* <div className="flex gap-2 border-t border-[#f0f2f5] bg-white px-4 pb-3 pt-2">
              <a
                className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#60758a]"
                href="#"
              >
                <div
                  className="text-[#60758a] flex h-8 items-center justify-center"
                  data-icon="House"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                  </svg>
                </div>
                <p className="text-[#60758a] text-xs font-medium leading-normal tracking-[0.015em]">
                  Home
                </p>
              </a>
              <a
                className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#111418]"
                href="#"
              >
                <div
                  className="text-[#111418] flex h-8 items-center justify-center"
                  data-icon="ChatCircleDots"
                  data-size="24px"
                  data-weight="fill"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"></path>
                  </svg>
                </div>
                <p className="text-[#111418] text-xs font-medium leading-normal tracking-[0.015em]">
                  Chat
                </p>
              </a>
              <a
                className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#60758a]"
                href="#"
              >
                <div
                  className="text-[#60758a] flex h-8 items-center justify-center"
                  data-icon="ClockCounterClockwise"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path>
                  </svg>
                </div>
                <p className="text-[#60758a] text-xs font-medium leading-normal tracking-[0.015em]">
                  History
                </p>
              </a>
              <a
                className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#60758a]"
                href="#"
              >
                <div
                  className="text-[#60758a] flex h-8 items-center justify-center"
                  data-icon="Gear"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                  </svg>
                </div>
                <p className="text-[#60758a] text-xs font-medium leading-normal tracking-[0.015em]">
                  Settings
                </p>
              </a>
            </div> */}
            <div className="h-5 bg-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotUi;

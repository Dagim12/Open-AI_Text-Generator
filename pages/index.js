import styles from "./index.module.css";
import { useState } from "react";
import { Poppins } from "@next/font/google";
import clsx from "clsx";

// get goolge font for poppins font style
export const text_font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();
  const [messages, setMessages] = useState([]);

  // on entering the text for chat
  async function onSubmit(event) {
    event.preventDefault();
    if (userInput.trim() !== "") {
      const txt = userInput;
      setMessages((messages) => [...messages, { text: txt, sender: "user" }]);
      setUserInput("");
    } else {
      return;
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        console.error(`Request failed with status ${response.status}`);
        throw data.error || new Error("Something went, wrong please try again");
      }

      setResult(data.result);
      setMessages((messages) => [
        ...messages,
        { text: data.result, sender: "AI" },
      ]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  //this is the user prompt display area
  const getETChat = (text) => {
    const userChat = (
      <div className='chat-message'>
        <div className='flex items-end justify-end'>
          <div className='flex flex-col space-y-2 text-xs max-w-3xl mx-2 order-1 items-end'>
            <div className='float-right bg-zinc-100 rounded-xl justify-start mr-[16px] items-start gap-2.5 inline-flex'>
              <span className='px-4 py-2 inline-block text-black text-[14px] font-normal leading-tight'>
                {text}
              </span>
            </div>
          </div>
          <div className={clsx("mr-[29px] order-2", styles.ET_img)}></div>
        </div>
      </div>
    );
    return userChat;
  };

  //ai response display area
  const getAIresponse = (text) => {
    const AI = (
      <div className='chat-message'>
        <div className='ml-[24px]'>
          <div className='flex items-end'>
            <div className={clsx("mr-[15px] order-1", styles.AI_img)}></div>
            <div className='flex flex-col space-y-2 text-xs max-w-3xl mx-2 order-2 items-start'>
              <div className='px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start inline-flex'>
                <div className='inline-block text-black text-[14px] font-normal leading-tight'>
                  {text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return AI;
  };
  return (
    <div className={clsx("w-full bg-white", text_font.className)}>
      <div className='grid grid-rows-2 fixed mb-16'>
        <div className='w-full h-[80px] border mb-[43px]'>
          <div className='h-[52px] relative ml-6 mt-4 mb-4'>
            <div className='float-left'>
              <div className={styles.dis_logo}></div>
              <div
                className={clsx(
                  "left-[71px] top-0 absolute text-center text-[11px] sm:text-[18px] font-semibold",
                  styles.header_text_red
                )}
              >
                Elastic Team
              </div>
              <div
                className={clsx(
                  "left-[71px] top-[22px] absolute text-center text-black sm:text-[18px] text-[11px] font-semibold"
                )}
              >
                Open AI - Text Generator
              </div>
            </div>
            <div
              className={clsx(
                "mr-[35px] mt-[15px] float-right",
                styles.logout_img
              )}
            ></div>
          </div>
        </div>
        {/* Chat display */}
        {messages.map((message, index) =>
          message.sender === "user"
            ? getETChat(message.text)
            : getAIresponse(message.text)
        )}
      </div>
      <div className='inset-x-0 row-start-1 fixed bottom-0 mt-4 bg-white'>
        <div className='ml-6 mb-6 mr-6 h-[50px] '>
          <form className='' onSubmit={onSubmit}>
            <div className='relative'>
              <input
                type='text'
                name='text'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Type your prompt here...'
                className='w-full  h-[50px] bg-white rounded-lg border border-neutral-200 flex-shrink flex-grow flex-auto leading-normal px-3 relative self-center'
              ></input>
              <button
                type='submit'
                className='absolute right-2.5 bottom-2.5 flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600'
              >
                <i className={styles.send_img}></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

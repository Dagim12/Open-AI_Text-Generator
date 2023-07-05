import styles from "./index.module.css";
import { useState } from "react";
import { Poppins } from "@next/font/google";
import clsx from "clsx";

export const text_font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    debugger;
    event.preventDefault();
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
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  const getETChat = () => {

  }
  const getAIresponse = () => {

  }
  return (
    <div
      className={clsx("w-full grid grid-rows-3 bg-white", text_font.className)}
    >
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
      {/* Chat area */}
      <div className='w-full grid grid-rows-2 grid-flow-col gap-4'>
        <div className='row-start-1'>
          <div className='float-right grid grid-cols-12'>
            <div className='col-span-11'>
              <div className='float-right h-[37px] px-4 py-2 bg-zinc-100 rounded-xl justify-start mr-[16px] items-start gap-2.5 inline-flex'>
                <div className='text-stone-950 text-[14px] font-normal leading-tight '>
                  How are you? {userInput}
                </div>
              </div>
            </div>
            <div className={clsx("mr-[29px]", styles.ET_img)}></div>
          </div>
        </div>

        <div className='ml-[24px]'>
          <div className='float-left grid grid-cols-12'>
            <div className={clsx("mr-[15px]", styles.AI_img)}></div>
            <div className='col-span-11 '>
              <div className='h-[37px] px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start inline-flex'>
                <div className='text-stone-950 text-[14px] font-normal leading-tight '>
                  I am good _________ {result}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='inset-x-0 absolute bottom-6'>
        <div className='ml-6 mr-6 h-[50px] '>
          <form className='' onSubmit={onSubmit}>
            <input
              type='text'
              name='text'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Type your prompt here...'
              className='w-full  h-[50px] bg-white rounded-lg border border-neutral-200 flex-shrink flex-grow flex-auto leading-normal px-3 relative self-center'
            ></input>

            <div className='flex -mr-px'>
              <span className='flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600'>
                <i className={styles.send_img}></i>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

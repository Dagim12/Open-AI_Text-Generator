import styles from "./index.module.css";
import { Poppins } from "@next/font/google";
import clsx from "clsx";

export const text_font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Home = () => {
  return (
    <div
      className={clsx(
        "w-full grid grid-rows-3 bg-white",
        text_font.className
      )}
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
              <div class='float-right h-[37px] px-4 py-2 bg-zinc-100 rounded-xl justify-start mr-[16px] items-start gap-2.5 inline-flex'>
                <div class='text-stone-950 text-[14px] font-normal leading-tight '>
                  How are you?
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
              <div class='h-[37px] px-4 py-2 bg-zinc-100 rounded-xl justify-start items-start inline-flex'>
                <div class='text-stone-950 text-[14px] font-normal leading-tight '>
                  I am good
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='ml-6 mr-6 h-[50px] relative'>
        <div className='absolute inset-x-0 bottom-0'>
          <div class='w-full  h-[50px] bg-white rounded-lg border border-neutral-200'></div>
          <div class='w-[190px] left-[25px] top-[15px] absolute text-neutral-400 text-[14px] font-normal leading-tight'>
            Type your prompt here...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

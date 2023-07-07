import styles from "./index.module.css";
import clsx from "clsx";

export default function Typing() {
  return (
    <div className='chat-message'>
      <div className='ml-[24px]'>
        <div className='flex items-end'>
          <div className={clsx("mr-[15px] order-1", styles.AI_img)}></div>
          <div className={clsx("mx-2 order-2 items-start", styles.typing)}>
            <div className={styles.typing__dot}></div>
            <div className={styles.typing__dot}></div>
            <div className={styles.typing__dot}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

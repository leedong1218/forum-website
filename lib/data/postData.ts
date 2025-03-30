import { PostData } from "../types/postType";
import Sticker from "@/public/images/sticker.jpg";

export const samplePostData: PostData = {
  id: 1,
  category: "搞笑版",
  date: "2022/1/1",
  avatar: Sticker,
  author: "王小明",
  title: "超好笑的拉!!!",
  content: `
      <p>1. 草跟蛋誰比較高？：『蛋比較高，因為草莓蛋糕』</p>
      <p>2. 蛤蜊擺久了會變什麼？：『白酒蛤蜊』</p>
      <p>3. 為什麼螃蟹明明沒有感冒卻一直咳嗽？：『因為牠是甲殼(假咳)類動物』</p>
      <p>4. 白氣球揍了黑氣球一頓後，黑氣球很生氣，於是決定：『 告白氣球』</p>
      <p>5. 為什麼暖暖包到現在還一堆人在用？ ：『因為他有鐵粉』</p>
      <p>6. 警衛在笑什麼?： 『在校門口』</p>
      <p>7. 達文西密碼上面是什麼？：『達文西帳號』</p>
      <p>8. 達文西密碼下面是什麼？：『忘記密碼』</p>
      <p>9. 老王姓什麼？：『法，法老王』</p>
      <p>10. 冰塊最想做什麼事？：『退伍，因為他當冰（兵）當很久了』</p>
      <p>11. 壞事一定要在中午做，為什麼？：『因為～早晚會有報應』</p>
      <p>12. 為什麼蠶寶寶很有錢？：『因為牠會節儉（結繭）』</p>
    `,
  likes: 0,
  comments: 0
};

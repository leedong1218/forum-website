import { Comment } from "../types/postType";
import Sticker from "@/public/images/sticker.jpg";

export const sampleComments: Comment[] = [
  {
    id: 1,
    author: "陳小華",
    avatar: Sticker,
    content: "哈哈哈，第五個笑死我啦！鐵粉那個太好笑了！",
    timestamp: "30分鐘前",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 101,
        author: "李小明",
        avatar: "李",
        content: "我也覺得！鐵粉真的很妙，超有梗的！",
        timestamp: "20分鐘前",
        likes: 5,
        isLiked: false,
        parentId: 1,
      },
      {
        id: 102,
        author: "王大同",
        avatar: "王",
        content:
          "哈哈真的很好笑，我還想到以前有個鐵棒冰，是不是暖暖包也可以做成冰淇淋啊 XD",
        timestamp: "15分鐘前",
        likes: 3,
        isLiked: false,
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    author: "林大偉",
    avatar: Sticker,
    content: "我最喜歡第七個，冰塊那個冷笑話真的很「冷」！",
    timestamp: "1小時前",
    likes: 8,
    isLiked: false,
    replies: [],
  },
  {
    id: 3,
    author: "張美玲",
    avatar: Sticker,
    content: "告白氣球那個也太有創意了，笑到肚子痛XD",
    timestamp: "2小時前",
    likes: 23,
    isLiked: false,
    replies: [
      {
        id: 301,
        author: "陳大明",
        avatar: "陳",
        content: "想到氣球就想到周董的歌，但這個梗更好笑！",
        timestamp: "1小時前",
        likes: 7,
        isLiked: false,
        parentId: 3,
      },
    ],
  },
];

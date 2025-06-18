// 建議你加在 `@/lib/types/attachmentType.ts` 檔案中
export interface Attachment {
  id?: number; // 上傳中的 File 沒 id，後端傳來的會有
  file?: File; // 新上傳的
  original_filename?: string;
  url?: string;
  size?: number;
}

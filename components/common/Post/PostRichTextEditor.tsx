import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useRef } from "react";

const ReactQuill = dynamic(async () => {
  const { default: RQ, Quill } = await import("react-quill-new");

  const Size = Quill.import("attributors/style/size");
  Size.whitelist = ["20px", "28px", "36px", "48px"];
  Quill.register(Size, true);

  return function Comp({ forwardedRef, ...props }: any) {
    return <RQ ref={forwardedRef} {...props} />;
  };
}, { ssr: false, loading: () => <CircularProgress /> });

const editorGlobalCss = `
  .ql-editor { font-size: 20px; line-height: 1.6; }
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before { content: '預設'; }
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before { content: '小 (20px)'; font-size:20px; }
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before { content: '中 (28px)'; font-size:28px; }
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before { content: '大 (36px)'; font-size:36px; }
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="48px"]::before { content: '特大 (48px)'; font-size:48px; }
`;

function RichTextEditor({ value, onChange }) {
  const quillRef = useRef<any>(null); // ✅ 這行不能漏

  useEffect(() => {
    const el = document.createElement("style");
    el.innerHTML = editorGlobalCss;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <ReactQuill
      forwardedRef={quillRef}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ size: ["20px", "28px", "36px", "48px"] }],
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      }}
      formats={[
        "size", "header", "bold", "italic", "underline",
        "strike", "blockquote", "list", "link",
      ]}
      theme="snow"
      style={{ height: 350 }}
    />
  );
}

export default RichTextEditor;

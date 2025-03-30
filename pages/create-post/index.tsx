import Layout from "@/components/layout/Layout";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <CircularProgress /> }
);

// 预定义文章类型选项，方便维护和扩展
const POST_TYPES = [
  { value: "搞笑", label: "搞笑" },
  { value: "美食", label: "美食" },
  { value: "科技", label: "科技" },
  { value: "旅遊", label: "旅遊" },
];

export default function CreatePost() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localImages, setLocalImages] = useState<{[key: string]: File}>({});
  const quillRef = useRef(null);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.type && formData.title && formData.content;
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (!isFormValid()) {
      alert("請填寫所有必填欄位");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 如果有本地图片，先上传所有图片
      const imageUploadPromises = Object.entries(localImages).map(async ([dataUrl, file]) => {
        const formData = new FormData();
        formData.append("file", file);
        
        // 替换为您的实际图片上传API
        // const response = await fetch("/api/upload", {
        //   method: "POST",
        //   body: formData,
        // });
        
        // if (!response.ok) throw new Error("图片上传失败");
        // const { url } = await response.json();
        
        // 返回本地数据URL和远程URL的映射
        // return { dataUrl, remoteUrl: url };
        return { dataUrl, remoteUrl: dataUrl }; // 临时使用本地URL
      });
      
      // 等待所有图片上传完成
      // const imageUrls = await Promise.all(imageUploadPromises);
      
      // 替换内容中的本地URL为远程URL
      // let finalContent = formData.content;
      // imageUrls.forEach(({ dataUrl, remoteUrl }) => {
      //   finalContent = finalContent.replace(new RegExp(dataUrl, 'g'), remoteUrl);
      // });
      
      // 提交帖子
      // const postResponse = await fetch("/api/posts", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...formData,
      //     content: finalContent,
      //   }),
      // });
      
      // if (!postResponse.ok) throw new Error("发布失败");
      
      alert("文章已发布！");
      setFormData({ type: "", title: "", content: "" });
      setLocalImages({});
      
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("發布失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          // 使用FileReader将图片转换为base64字符串
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            if (dataUrl) {
              // 保存本地图片记录
              setLocalImages(prev => ({
                ...prev,
                [dataUrl]: file
              }));
              
              // 将图片插入到编辑器中
              const quill = quillRef.current.getEditor();
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, "image", dataUrl);
              quill.setSelection(range.index + 1);
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error handling local image:", error);
          alert("图片处理失败");
        }
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: { image: handleImageUpload },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "link",
    "image",
    "blockquote",
  ];

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          mb: 4,
          p: 4,
          borderRadius: 2,
          background: "#fff",
          border: "1px solid rgba(25,118,210,0.2)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 600, mb: 3, color: "#263238" }}
        >
          新增文章
        </Typography>

        <Box sx={{ mb: 3, display: "flex" }}>
          <FormControl sx={{ mr: 2, minWidth: 150 }}>
            <InputLabel id="board-select-label">選擇看板</InputLabel>
            <Select
              labelId="board-select-label"
              id="board-select"
              value={formData.type}
              label="選擇看板"
              onChange={(e) => handleFormChange("type", e.target.value)}
            >
              {POST_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="文章標題"
            variant="outlined"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            文章內容
          </Typography>
          <div style={{ height: "400px" }}>
            <ReactQuill
              forwardedRef={quillRef}
              value={formData.content}
              onChange={(content: string) => handleFormChange("content", content)}
              modules={modules}
              formats={formats}
              theme="snow"
              style={{ height: "350px" }}
            />
          </div>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid()}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {isSubmitting ? "發布中..." : "發布文章"}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
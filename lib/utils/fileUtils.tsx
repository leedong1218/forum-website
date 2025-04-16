import {
    AttachFile as AttachFileIcon,
    Image as ImageIcon,
    FilePresent as FilePresentIcon,
} from "@mui/icons-material";

import { JSX } from "react";

export const getFileAttributes = (
fileName: string
): { icon: JSX.Element; color: string; type: "image" | "pdf" | "file" } => {
const ext = fileName.split(".").pop()?.toLowerCase() || "";

if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return {
    icon: <ImageIcon />,
    color: "#9c27b0",
    type: "image",
    };
}

if (ext === "pdf") {
    return {
    icon: <FilePresentIcon />,
    color: "#f44336",
    type: "pdf",
    };
}

if (["doc", "docx"].includes(ext)) {
    return {
    icon: <AttachFileIcon />,
    color: "#2196f3",
    type: "file",
    };
}

return {
    icon: <AttachFileIcon />,
    color: "#757575",
    type: "file",
};
};

export const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };
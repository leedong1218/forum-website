import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import toolbarOptions from './ToolBarOption';

// import styles from '@/styles/components/common/Editor.module.scss';

const ReactQuillEditor = dynamic(() => import('react-quill'), { 'ssr': false });

interface ReactQuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function Editor({ value, onChange } : ReactQuillEditorProps) {
  return (
    <ReactQuillEditor
      value={value}
      onChange={onChange}
      modules={{ 'toolbar': toolbarOptions }}
      theme="snow"
    //   className={styles.textEditor}
    />
  );
}
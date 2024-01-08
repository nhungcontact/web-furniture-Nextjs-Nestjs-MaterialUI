// components/RichTextEditor.tsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  defaultValue?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  defaultValue,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      //   [{ size: ["small", false, "large", "huge"] }], // Font size
      [{ font: [] }], // Font family
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "size",
    "font",
  ];

  return (
    <ReactQuill
      value={value}
      onChange={(content) => onChange(content)}
      modules={modules}
      formats={formats}
      defaultValue={defaultValue}
    />
  );
};

export default RichTextEditor;

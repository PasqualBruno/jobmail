import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./TiptapEditor.css";

interface TiptapProps {
  charcount?: number;
  value?: string;
  onChange?: (html: string) => void;
}

const TiptapEditor = ({ value, onChange, charcount }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const plainText = editor.getText();
  const charCount = plainText.length;

  return (
    <div className="tiptap-container">
      <div className="tiptap-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <i>I</i>
        </button>
      </div>

      <EditorContent editor={editor} className="tiptap-content" />

      {charcount && (
        <div className="tiptap-char-count">
          <span style={{ color: charCount < 50 ? "#ff4d4f" : "#52c41a" }}>
            {charCount} / 50 caracteres mínimos
          </span>
        </div>
      )}
    </div>
  );
};

export default TiptapEditor;

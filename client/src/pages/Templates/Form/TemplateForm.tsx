import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type Props = {};

const TemplateForm = (props: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // O console.log solicitado para validar o envio
    console.log("Dados do Template:", {
      title,
      content, // HTML gerado pelo editor
    });
  };

  // Configuração opcional da barra de ferramentas (toolbar)
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Novo Template</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "25px" }}
      >
        {/* Campo de Título */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Título do Template:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Confirmação de Matrícula"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
            required
          />
        </div>

        {/* Campo de Editor Rico (HTML) */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Conteúdo do E-mail:
          </label>
          <div style={{ height: "350px", marginBottom: "50px" }}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              style={{ height: "100%" }}
              placeholder="Escreva sua mensagem aqui..."
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: "14px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
        >
          Salvar Template
        </button>
      </form>
    </div>
  );
};

export default TemplateForm;

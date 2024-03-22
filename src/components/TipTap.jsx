import { useState } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import DOMPurify from 'dompurify';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import "./tiptap.css";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export const Tiptap = ({ setDescription }) => {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState('');

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
      setContent(html); 
    },
  });

  const handleCreateNewDocument = () => {
    setContent('');
    setDescription('');
  };

  const handleDeleteDocument = (index) => {
    const updatedSavedContent = savedContent.filter((item, i) => i !== index);
    setSavedContent(updatedSavedContent);
  };

  const handleSaveDocument = () => {
    const savedHtml = editor.getHTML();
    const newSavedContent = [...savedContent, savedHtml];
    setSavedContent(newSavedContent);
    console.log('Document saved:', savedHtml);
  };

  const handleViewContent = (content) => {
    setSelectedContent(content);
  };

  const handleEditContent = (content, index) => {
    editor.chain().setContent(content).run(); 
    const updatedSavedContent = [...savedContent];
    updatedSavedContent[index] = content; 
    setSavedContent(updatedSavedContent); 
    setSelectedContent('');
  };

  return (
    <div className="container">
      <div className="textEditor">
        <div className="menuBar">
          <button onClick={handleCreateNewDocument}>New</button>
          <button onClick={handleSaveDocument}>Save</button>
        </div>
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          onChange={({ editor }) => {
            const html = editor.getHTML();
            setDescription(html);
            setContent(html); 
          }}
        />
      </div>
      <div className="savedContent">
        <h2>Saved Notes</h2>
        <table>
          <thead>
            <tr>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedContent.map((content, index) => (
              <tr key={index}>
                <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></td>
                <td>
                  <button onClick={() => handleViewContent(content)}><FaEye /></button>
                  <button onClick={() => handleEditContent(content, index)}><FaEdit /></button>
                  <button onClick={() => handleDeleteDocument(index)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedContent && (
          <div className="selectedContent">
            <h3>Selected Note</h3>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedContent) }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

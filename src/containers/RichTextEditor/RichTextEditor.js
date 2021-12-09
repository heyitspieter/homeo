import dynamic from "next/dynamic";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { useState, useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from "src/containers/RichTextEditor/RichTextEditor.module.scss";

const toolbarOptions = [
  "list",
  "inline",
  "remove",
  "history",
  "fontSize",
  "blockType",
  "textAlign",
];

const fontSizeOptions = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 30, 36, 48, 60, 72, 96,
];

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

const RichTextEditor = ({ initialContent, getEditorContent }) => {
  const [editor, setEditor] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialContent) {
      const contentBlock = htmlToDraft(initialContent);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );

        const newEditorState = EditorState.createWithContent(contentState);

        setEditor(newEditorState);
      }
    }
  }, [initialContent]);

  useEffect(() => {
    let rawContent = convertToRaw(editor.getCurrentContent());

    const htmlContent = draftToHtml(rawContent);
    getEditorContent(htmlContent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const onEditorChange = (editorState) => {
    setEditor(editorState);
  };

  return (
    <div className={styles.container}>
      <Editor
        spellCheck
        editorState={editor}
        toolbar={{
          options: toolbarOptions,
          list: {
            inDropdown: true,
          },
          textAlign: { inDropdown: true },
          fontSize: { options: fontSizeOptions },
        }}
        editorClassName={styles.editor}
        wrapperClassName={styles.wrapper}
        toolbarClassName={styles.toolbar}
        onEditorStateChange={onEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;

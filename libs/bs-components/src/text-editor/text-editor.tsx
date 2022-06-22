/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useRef, useState } from 'react';

type EditorToolbar = 'heading' | '|' | 'bold' | 'italic' | 'link' | 'bulletedList' 
  | 'numberedList' | 'blockQuote' | 'insertImage' | 'insertTable' | 'insertMedia' 
  | 'undo' | 'redo';

interface TextEditorProps {
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toolbar?: EditorToolbar[];
}

const editorDefaultConfig = {
  language: 'ko',
};

type CKEditor = React.FunctionComponent<{
  disabled?: boolean;
  editor: any;
  data?: string;
  id?: string;
  config?: any;
  onReady?: (editor: any) => void;
  onChange?: (event: Event, editor: any) => void;
  onBlur?: (event: Event, editor: any) => void;
  onFocus?: (event: Event, editor: any) => void;
  onError?: (event: Event, editor: any) => void;
}>;

type EditorModule = {
  Editor: CKEditor;
  ClassicEditor: any;  
}

const TextEditorViewCK: React.FC<TextEditorProps> = (props) => {
  const editorRef = useRef<EditorModule>({} as EditorModule);
  const [ editorLoaded, setEditorLoaded ] = useState( false );
  const { Editor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      Editor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded( true )
  }, []);

  return !editorLoaded ? (<div>Loading Editor</div>) : (
    <Editor
      editor={ ClassicEditor }
      config={ { ...editorDefaultConfig, ...(props.toolbar ? { toolbar: props.toolbar } : {}) }}
      data=""
      onReady={ editor => {
        // You can store the "editor" and use when it is needed.
        console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event, editor ) => {
        if (props.onChange) {
          (event as any)['target'] = {
            name: props.name,
            value: editor.getData()
          }
          props.onChange && props.onChange(event as any as React.ChangeEvent<HTMLInputElement>);
        }
      } }
      onBlur={ ( event, editor ) => {
        //console.log( 'Blur.', editor );
      } }
      onFocus={ ( event, editor ) => {
        //console.log( 'Focus.', editor );
      } }
    />
  );
};

export function TextEditor(props: TextEditorProps) {
  return (
    <TextEditorViewCK {...props} />
  );
}

export default TextEditor;

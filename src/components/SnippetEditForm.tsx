'use client';

import { useState } from 'react';
import type { Snippet } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { editSnippet } from '@/actions';

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet?.code);
  function handleEditorChange(val: string = '') {
    setCode(val);
  }

  const editSnippetAction = editSnippet.bind(null, snippet?.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}

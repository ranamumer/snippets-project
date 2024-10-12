'use client';

import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import { db } from '@/db';
import { createNewSnippet } from '@/actions';

export default function CreateNewSnippet() {
  const [formState, action] = useFormState(createNewSnippet, {
    message: '',
  });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            id="code"
            className="border rounded p-2 w-full"
          />
        </div>
        {formState?.message && (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState?.message}
          </div>
        )}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}

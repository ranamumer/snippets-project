'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function createNewSnippet(
  formState: { message: string },
  formData: FormData,
) {
  try {
    // Validate Inputs Data
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title?.length < 3) {
      return {
        message: 'title must contain at least 3 characters',
      };
    }

    if (typeof code !== 'string' || code?.length < 10) {
      return {
        message: 'code must contain at least 10 characters',
      };
    }

    // Save Data to DB
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err?.message,
      };
    }
    return {
      message: 'something went wrong!',
    };
  }

  // re-render cached page
  revalidatePath('/');

  // Redirect User
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: { code },
  });

  // re-render cached page
  revalidatePath(`/snippets/${id}`);

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  // re-render cached page
  revalidatePath('/');
  revalidatePath(`/snippets/${id}`);

  redirect('/');
}

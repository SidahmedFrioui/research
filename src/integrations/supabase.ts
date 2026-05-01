import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function uploadToSupabase(file: File, folder = 'articles') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('main')
        .upload(fileName, file, {
            contentType: file.type
        });
    console.log(data)

    if (error) throw new Error(`Upload failed: ${error.message}`);

    const { data: publicUrlData } = supabase
        .storage
        .from('main')
        .getPublicUrl(fileName);

    if (!publicUrlData?.publicUrl) throw new Error('Could not get public URL');

    return publicUrlData.publicUrl;
}

export async function deleteFromSupabase(filePath: string) {
    const { data, error } = await supabase.storage
        .from('main')
        .remove([filePath]);

    if (error) throw new Error(`Deletion failed: ${error.message}`);

    return data;
}
import { useState } from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';

interface CreatePostPayload {
  content: string;
  image?: string;
}

interface CreatePostProps {
  onSubmit: (payload: CreatePostPayload) => void;
}

export default function CreatePost({ onSubmit }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || imagePreview) {
      onSubmit({ content: content.trim(), image: imagePreview });
      setContent('');
      setImagePreview(undefined);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-start gap-3">
        <Image
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full h-10 w-10 object-cover"
        />
        <div className="flex-1">
          <input
            type="text"
            className="w-full h-11 px-4 bg-gray-100 dark:bg-slate-800 rounded-full text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 border border-transparent focus:border-primary-500"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {imagePreview && (
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-800">
              <img src={imagePreview} alt="preview" className="w-full h-auto object-cover" />
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
                <FaImage className="h-5 w-5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <button
              type="submit"
              disabled={!content.trim() && !imagePreview}
              className={`h-10 px-4 rounded-full text-sm font-medium text-white ${content.trim() || imagePreview ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-400 cursor-not-allowed'}`}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

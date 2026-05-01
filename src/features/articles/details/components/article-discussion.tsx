import { Loader2, MessageSquare, Send, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useGetCommentsByArticleId } from "../hooks/queries/comment";
import { useCreateComment } from "../hooks/mutations/comment";
import { useState } from "react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { useAuth } from "#/contexts/auth";

export function ArticleDiscussion({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  
  const { data: commentsData, isPending } = useGetCommentsByArticleId(articleId);
  const { mutate: postComment, isPending: isPosting } = useCreateComment(articleId);

  const comments = Array.isArray(commentsData) ? commentsData : [];

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    postComment({ content: newComment }, {
      onSuccess: () => setNewComment("")
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 text-slate-900">
          <MessageSquare className="text-indigo-600" /> Discussion 
          <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {comments.length}
          </span>
        </h2>

      {/* 1. Comment Input (Only if logged in) */}
      {user ? (
        <div className="relative group rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition-all focus-within:shadow-md focus-within:border-indigo-200">
          <Textarea 
            placeholder="Partagez vos réflexions sur ce manuscrit..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] border-none focus-visible:ring-0 resize-none font-medium text-slate-600"
          />
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
            <div className="flex items-center gap-2 px-2">
               <Avatar className="h-6 w-6">
                 <AvatarFallback className="bg-indigo-100 text-indigo-600 text-[10px] font-bold">
                    {user.name?.charAt(0)}
                 </AvatarFallback>
               </Avatar>
               <span className="text-xs font-bold text-slate-400">En tant que {user.name}</span>
            </div>
            <Button 
              disabled={isPosting || !newComment.trim()} 
              onClick={handlePostComment}
              className="rounded-xl bg-indigo-600 font-bold px-6 gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              {isPosting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Envoyer
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-[2rem] border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
          <p className="text-slate-500 font-bold text-sm">
            Vous devez être <span className="text-indigo-600">connecté</span> pour participer à la discussion.
          </p>
        </div>
      )}

      {/* 2. Comments List */}
      <div className="space-y-4">
        {isPending ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-300" /></div>
        ) : comments.length === 0 ? (
          <p className="text-center text-slate-400 text-sm italic py-10">Aucun commentaire pour le moment.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200/50">
                <User size={20} />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 text-sm tracking-tight">Utilisateur #{comment.user_id}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
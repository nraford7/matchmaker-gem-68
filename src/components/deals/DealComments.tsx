
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
}

interface DealCommentsProps {
  dealId: string;
}

const DealComments = ({ dealId }: DealCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "I think this deal has great potential. The team seems experienced and the market opportunity is significant.",
      authorName: "Jane Smith",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: "2",
      content: "I have some concerns about the valuation. Let's discuss this further in our next meeting.",
      authorName: "Michael Johnson",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    }
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        authorName: "Current User", // In a real app, this would come from auth context
        createdAt: new Date()
      };
      
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmitComment();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No comments yet. Be the first to comment.</p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    {comment.authorAvatar && <AvatarImage src={comment.authorAvatar} />}
                    <AvatarFallback>{comment.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">{comment.authorName}</h4>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>CU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-24 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleSubmitComment} 
                    disabled={!newComment.trim()}
                    size="sm"
                    className="gap-1"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Press Ctrl+Enter to submit</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealComments;

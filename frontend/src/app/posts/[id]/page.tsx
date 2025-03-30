"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ContentApi from "@/api/content-api"; // Import ContentApi

export default function PostPage({ params }: { params: { id: string } }) {
  // Set up states for loading, error, post data, and edit mode
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false); // State for edit mode
  const [editedPost, setEditedPost] = useState<any>(null); // Store the edited post data

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch post data from ContentApi using the provided post ID
        const fetchedPost = await ContentApi.get(params.id);

        // Check if the post exists
        if (!fetchedPost) {
          notFound();
        } else {
          setPost(fetchedPost);
          setEditedPost(fetchedPost); // Initialize editedPost with fetched data
        }
      } catch (err) {
        setError("Failed to fetch the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  // Handle input change for editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPost((prevPost: any) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Handle submit to update the post
  const handleSubmit = async () => {
    try {
      if (editedPost) {
        await ContentApi.update(editedPost._id, editedPost); // Update the post using ContentApi
        setPost(editedPost); // Update the post in the state
        setIsEditing(false); // Exit edit mode
      }
    } catch (err) {
      setError("Failed to update the post.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl px-5">
      <div className="flex justify-between items-center">
      <Link href="/">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Button>

      </Link>
      <Button className="mt-4" onClick={() => setIsEditing(true)}>
              Edit Post
            </Button>

      </div>
     
      <article className="prose prose-slate dark:prose-invert max-w-none">
        {isEditing ? (
          // Show input fields in edit mode
          <div>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
              className="text-4xl font-bold mb-4 w-full"
            />
            <div className="text-muted-foreground mb-8">
              {new Date(post.createdAt).toDateString()} • {post.platform}
            </div>
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleInputChange}
              className="w-full h-40 mb-4"
            />
            <div className="flex gap-4">
              <Button onClick={handleSubmit}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          // Show the post in view mode
          <div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-muted-foreground mb-8">
              {new Date(post.createdAt).toDateString()} • {post.platform}
            </div>

            {post.content.split("\n\n").map((paragraph: any, index: any) => (
              <p key={index}>{paragraph}</p>
            ))}

           
          </div>
        )}
      </article>
    </div>
  );
}

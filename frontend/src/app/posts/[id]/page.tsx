"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ContentApi from "@/api/content-api"; // Import ContentApi

export default function PostPage({ params }: { params: { id: string } }) {
  // Set up states for loading, error, and post data
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        }
      } catch (err) {
        setError("Failed to fetch the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

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
      <Link href="/">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Button>
      </Link>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-8">
          {new Date(post.createdAt).toDateString()} • {post.platform}
        </div>

        {post.content.split("\n\n").map((paragraph: any, index:any) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
    </div>
  );
}

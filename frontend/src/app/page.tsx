"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, X } from "lucide-react"; // Add the cross icon import
import Pagination from "@/components/pagination";
import ContentApi from "@/api/content-api"; // Import ContentApiService
import { IContent } from "@/types/content.type";

export default function Home() {
  const [posts, setPosts] = useState<IContent[]>([]); // State for storing posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all posts
        const fetchedPosts = await ContentApi.getAll();
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (postId: string) => {
    try {
      await ContentApi.delete(postId); // Delete the post via the ContentApi
      // Remove the post from state after successful deletion
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  return (
    <div className="container mx-auto py-8 px-5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link href="/generate">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Generate New Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">You don't have any posts yet.</p>
          <Link href="/generate">
            <Button>Generate Your First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post._id} className="flex flex-col relative">
                {/* Cross button */}
                <button
                  className="absolute top-2 right-2 text-red-600"
                  onClick={() => handleDelete(post._id)}
                >
                  <X className="h-5 w-5" />
                </button>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.createdAt).toDateString()} • {post.platform}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow line-clamp-3">
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/posts/${post._id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Read Post
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Uncomment the Pagination component when needed */}
          {/* <Pagination /> */}
        </div>
      )}
    </div>
  );
}

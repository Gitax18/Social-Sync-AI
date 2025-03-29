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
import { PlusCircle } from "lucide-react";
import Pagination from "@/components/pagination";

// Mock data for posts - in a real app, you would fetch this from an API or database
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt:
      "Learn the basics of Next.js and how to build your first application.",
    date: "April 12, 2023",
    platform: "Twitter(X)",
  },
  {
    id: 2,
    title: "Working with Tailwind CSS",
    excerpt:
      "Discover how to use Tailwind CSS to create beautiful, responsive designs.",
    date: "May 3, 2023",
    platform: "Peerlist",
  },
  {
    id: 3,
    title: "Server Components in Next.js",
    excerpt:
      "Explore the power of React Server Components in Next.js applications.",
    date: "June 18, 2023",
    platform: "Linkedin",
  },
  {
    id: 4,
    title: "Getting Started with Next.js",
    excerpt:
      "Learn the basics of Next.js and how to build your first application.",
    date: "April 12, 2023",
    platform: "Twitter(X)",
  },
  {
    id: 5,
    title: "Working with Tailwind CSS",
    excerpt:
      "Discover how to use Tailwind CSS to create beautiful, responsive designs.",
    date: "May 3, 2023",
    platform: "Peerlist",
  },
  {
    id: 6,
    title: "Server Components in Next.js",
    excerpt:
      "Explore the power of React Server Components in Next.js applications.",
    date: "June 18, 2023",
    platform: "Linkedin",
  },
];

export default function Home() {
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

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You dont have any posts yet.
          </p>
          <Link href="/create">
            <Button>Create your first post</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {post.date} • {post.platform}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/posts/${post.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Read Post
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination />
        </div>
      )}
    </div>
  );
}

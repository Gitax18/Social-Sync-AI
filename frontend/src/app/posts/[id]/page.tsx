import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Mock data for posts - in a real app, you would fetch this from an API or database
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.\n\nYou can use React to build your UI, then incrementally adopt Next.js features to solve common application requirements such as routing, data fetching, integrations - all while improving the developer and end-user experience.\n\nWhether you're an individual developer or part of a larger team, you can leverage React and Next.js to build fully interactive, highly dynamic, and performant web applications.",
    date: "April 12, 2023",
    author: "Jane Doe",
  },
  {
    id: 2,
    title: "Working with Tailwind CSS",
    content:
      "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.\n\nInstead of opinionated predesigned components, Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.\n\nTailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.\n\nIt's fast, flexible, and reliable — with zero-runtime.",
    date: "May 3, 2023",
    author: "John Smith",
  },
  {
    id: 3,
    title: "Server Components in Next.js",
    content:
      "React Server Components allow you to write UI that can be rendered and optionally cached on the server. In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering, and there are three different rendering strategies:\n\n- Static Rendering\n- Dynamic Rendering\n- Streaming\n\nServer Components help solve many of the challenges that come with rendering everything on the client, such as application performance and search engine optimization. They also help reduce the bundle size by keeping large dependencies on the server and only sending the result to the client.",
    date: "June 18, 2023",
    author: "Alex Johnson",
  },
]

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find((post) => post.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Link href="/">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Button>
      </Link>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-8">
          {post.date} • {post.author}
        </div>

        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
    </div>
  )
}


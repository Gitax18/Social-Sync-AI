"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "react-toastify"
import { Loader2, Save, RefreshCw, Check, Twitter, Linkedin } from "lucide-react"

// Mock function to generate content based on platform
const generatePlatformContent = (platform: string, baseContent: string) => {
    switch (platform) {
        case "linkedin":
            return `${baseContent}\n\n#career #networking #professional`
        case "twitter":
            return baseContent.length > 240 ? baseContent.substring(0, 237) + "..." : baseContent
        case "peerlist":
            return `${baseContent}\n\nShared with my tech community!`
        default:
            return baseContent
    }
}

export default function GeneratedPosts() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get data from URL params (in a real app, you might use context or state management)
    const content = searchParams.get("content") || ""
    const platforms = {
        linkedin: searchParams.get("linkedin") === "true",
        twitter: searchParams.get("twitter") === "true",
        peerlist: searchParams.get("peerlist") === "true",
    }

    // State for generated posts
    const [posts, setPosts] = useState<{
        [key: string]: {
            content: string
            saved: boolean
            regenerating: boolean
        }
    }>({})

    // State for loading
    const [loading, setLoading] = useState(true)

    // Generate initial posts
    useEffect(() => {
        const initialPosts: any = {}

        if (platforms.linkedin) {
            initialPosts.linkedin = {
                content: generatePlatformContent("linkedin", content),
                saved: false,
                regenerating: false,
            }
        }

        if (platforms.twitter) {
            initialPosts.twitter = {
                content: generatePlatformContent("twitter", content),
                saved: false,
                regenerating: false,
            }
        }

        if (platforms.peerlist) {
            initialPosts.peerlist = {
                content: generatePlatformContent("peerlist", content),
                saved: false,
                regenerating: false,
            }
        }

        setPosts(initialPosts)
        setLoading(false)
    }, [content])

    // Handle save post
    const handleSave = (platform: string) => {
        setPosts((prev) => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                saved: true,
            },
        }))

        toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} post saved!`)
    }

    // Handle regenerate post
    const handleRegenerate = (platform: string) => {
        // Set regenerating state
        setPosts((prev) => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                regenerating: true,
            },
        }))

        // Simulate API call to regenerate content
        setTimeout(() => {
            const newContent = generatePlatformContent(platform, content) + " (regenerated)"

            setPosts((prev) => ({
                ...prev,
                [platform]: {
                    content: newContent,
                    saved: false,
                    regenerating: false,
                },
            }))

            toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} post regenerated!`)
        }, 1500)
    }

    // Get platform icon
    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case "linkedin":
                return <Linkedin className="h-5 w-5 text-blue-600" />
            case "twitter":
                return <Twitter className="h-5 w-5 text-sky-500" />
            case "peerlist":
                return (
                    <div className="h-5 w-5 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
                        P
                    </div>
                )
            default:
                return null
        }
    }

    // Get platform color
    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case "linkedin":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "twitter":
                return "bg-sky-100 text-sky-800 border-sky-200"
            case "peerlist":
                return "bg-gray-100 text-gray-800 border-gray-200"
            default:
                return ""
        }
    }

    if (loading) {
        return (
            <div className="container max-w-3xl mx-auto py-12 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Generating posts...</p>
            </div>
        )
    }

    return (
        <div className="container max-w-6xl mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Generated Posts</h1>
                <Link href="/generate">
                    <Button variant="outline">Back to Editor</Button>
                </Link>
            </div>

            <div className="space-y-6">
                {Object.keys(posts).length === 0 ? (
                    <Card>
                        <CardContent className="py-8">
                            <div className="text-center">
                                <p className="text-muted-foreground">
                                    No platforms selected. Please go back and select at least one platform.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex justify-between px-5 flex-wrap gap-5">
                        {Object.entries(posts).map(([platform, post]) => (
                            <Card key={platform} className="overflow-hidden w-full max-w-[355px]">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {getPlatformIcon(platform)}
                                            <CardTitle className="text-lg capitalize">{platform}</CardTitle>
                                        </div>
                                        <Badge variant="outline" className={getPlatformColor(platform)}>
                                            {platform === "twitter" ? "X / Twitter" : platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className="pt-4">
                                    <div className="whitespace-pre-wrap min-h-[100px]">{post.content}</div>
                                </CardContent>
                                <CardFooter className="flex justify-between bg-muted/20 py-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRegenerate(platform)}
                                        disabled={post.regenerating}
                                    >
                                        {post.regenerating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Regenerating...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Regenerate
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant={post.saved ? "outline" : "default"}
                                        size="sm"
                                        onClick={() => handleSave(platform)}
                                        disabled={post.regenerating || post.saved}
                                    >
                                        {post.saved ? (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Saved
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Post
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}


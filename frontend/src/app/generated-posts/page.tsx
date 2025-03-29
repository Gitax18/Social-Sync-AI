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
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { _post } from "@/api/base-api"

// Mock function to generate content based on platform
const generatePlatformContent = (platform: string, baseContent: string) => {
    switch (platform) {
        case "linkedin":
            return JSON.parse(localStorage.getItem("linkedin")!)
        case "x":
            return JSON.parse(localStorage.getItem("x")!)
        case "peerlist":
            return JSON.parse(localStorage.getItem("peerlist")!)
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
        x: searchParams.get("x") === "true",
        peerlist: searchParams.get("peerlist") === "true",
    }
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

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
    const [selectedPlatformNumber, setSelectedPlatformNumber] = useState(0)
    const [selectedPost, setSelectedPost] = useState<any>(null)
    // Generate initial posts
    useEffect(() => {
        const initialPosts: any = {}

        if (platforms.linkedin) {
            initialPosts.linkedin = {
                content: generatePlatformContent("linkedin", content),
                saved: false,
                regenerating: false,
            }
            setSelectedPlatformNumber(1)
        }

        if (platforms.x) {
            initialPosts.x = {
                content: generatePlatformContent("x", content),
                saved: false,
                regenerating: false,
            }
            setSelectedPlatformNumber(2)

        }

        if (platforms.peerlist) {
            initialPosts.peerlist = {
                content: generatePlatformContent("peerlist", content),
                saved: false,
                regenerating: false,
            }
            setSelectedPlatformNumber(3)

        }

        setPosts(initialPosts)
        setLoading(false)
    }, [content])

    // Handle save post
    const handleSave = (platform: string) => {
        console.log("platform", platform)
        setPosts((prev) => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                saved: true,
            },
        }))
        setIsSaveModalOpen(false)
        toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} post saved!`)
    }

    // Handle regenerate post
    const handleRegenerate = async (platform: string) => {
        // Set regenerating state
        setPosts((prev) => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                regenerating: true,
            },
        }))

        // Simulate API call to regenerate content
        const newContent = await _post({ api: "/ai/generate/"+platform, data: { description: content, inspiration: JSON.parse(localStorage.getItem("inspiration")!) } })
        //   localStorage.setItem("x",JSON.stringify(data))

        localStorage.setItem(platform,JSON.stringify(newContent))
        setPosts((prev) => ({
            ...prev,
            [platform]: {
                content: newContent as string,
                saved: false,
                regenerating: false,
            },
        }))

        toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} post regenerated!`)

    }

    // Get platform icon
    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case "linkedin":
                return <Linkedin className="h-5 w-5 text-blue-600" />
            case "x":
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
            case "x":
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
            <div className="flex items-center justify-between mb-6 px-5">
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
                    <div className=" px-5 gap-5  flex justify-center flex-wrap ">
                        {Object.entries(posts).map(([platform, post]) => (
                            <Card key={platform} className={`overflow-hidden max-w-[355px] w-full`} >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {getPlatformIcon(platform)}
                                            <CardTitle className="text-lg capitalize">{platform}</CardTitle>
                                        </div>
                                        <Badge variant="outline" className={getPlatformColor(platform)}>
                                            {platform === "x" ? "X / Twitter" : platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className="pt-4">
                                    <textarea className="whitespace-pre-wrap min-h-[100px] w-full " value={post.content} readOnly/>
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
                                        onClick={() => { setIsSaveModalOpen(true); setSelectedPost([post, platform]) }}
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
            <Dialog open={isSaveModalOpen}>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Save Post</DialogTitle>
                        <DialogDescription>
                            You can update this title using below input.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue="title"
                            />
                        </div>

                    </div>
                    <DialogFooter className="sm:justify-between">
                        <Button type="button" variant="default" onClick={() => handleSave(selectedPost[1])}>
                            Save
                        </Button>

                        <Button type="button" variant="secondary" onClick={() => setIsSaveModalOpen(false)}>
                            Close
                        </Button>


                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { Checkbox } from "@/components/ui/checkbox"
import { _post } from "@/api/base-api"
import AiApi from "@/api/ai-api"

export default function GeneratePost() {
  const router = useRouter()
  const [inspirationalPostContent, setInspirationalPostContent] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Social media platform states - all selected by default
  const [linkedinSelected, setLinkedinSelected] = useState(true)
  const [twitterSelected, setTwitterSelected] = useState(true)
  const [peerlistSelected, setPeerlistSelected] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content) {
      toast.error("Please fill in the content field")
      return
    }

    if (!linkedinSelected && !twitterSelected && !peerlistSelected) {
      toast.error("Please select at least one platform")
      return
    }

    localStorage.setItem("inspiration",JSON.stringify(inspirationalPostContent))

    setIsSubmitting(true)

    try {
      // Simulate API call
      await AiApi.generate("x",{description:content,inspiration:inspirationalPostContent})
      await AiApi.generate("linkedin",{description:content,inspiration:inspirationalPostContent})
      await AiApi.generate("peerlist",{description:content,inspiration:inspirationalPostContent})

      // Navigate to the generated posts page with query params
      const params = new URLSearchParams({
        content: content,
        linkedin: linkedinSelected.toString(),
        x: twitterSelected.toString(),
        peerlist: peerlistSelected.toString(),
      })

      router.push(`/generated-posts?${params.toString()}`)
    } catch (error) {
      toast.error("Failed to generate post")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-5">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="font-bold text-xl">Generate New Post</h1>
          </div>
          <div className="space-y-4 my-5">
            <div className="space-y-2">
              <Label htmlFor="inspirationalContent">Inspirational Post Content (Optional)</Label>
              <Textarea
                id="inspirationalContent"
                placeholder="Paste your inspirational post content here..."
                value={inspirationalPostContent}
                onChange={(e) => setInspirationalPostContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
                required
              />
            </div>

            {/* Social Media Platforms Section */}
            {/* <div className="space-y-2 pt-2 border-t">
              <Label className="text-base font-medium">Post to platforms</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="linkedin"
                    checked={linkedinSelected}
                    onCheckedChange={(checked) => setLinkedinSelected(checked as boolean)}
                  />
                  <Label htmlFor="linkedin" className="text-sm font-normal cursor-pointer">
                    LinkedIn
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twitter"
                    checked={twitterSelected}
                    onCheckedChange={(checked) => setTwitterSelected(checked as boolean)}
                  />
                  <Label htmlFor="twitter" className="text-sm font-normal cursor-pointer">
                    Twitter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="peerlist"
                    checked={peerlistSelected}
                    onCheckedChange={(checked) => setPeerlistSelected(checked as boolean)}
                  />
                  <Label htmlFor="peerlist" className="text-sm font-normal cursor-pointer">
                    Peerlist
                  </Label>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex justify-between">
            <Link href="/">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Generating..." : "Generate Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


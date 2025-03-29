'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  UserIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Content Optimization',
    description: 'AI-powered optimization for maximum engagement',
    href: '#',
    icon: SparklesIcon
  },
  {
    name: 'Multi-Platform Posting',
    description: 'Post directly to LinkedIn and Twitter (X)',
    href: '#',
    icon: ArrowUpTrayIcon
  },
  {
    name: 'Performance Analytics',
    description: 'Track how your optimized content performs',
    href: '#',
    icon: ChartBarIcon
  },
]

const resources = [
  { name: 'Documentation', href: '#', icon: BookOpenIcon },
  { name: 'Best Practices', href: '#', icon: SparklesIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-0.5 flex items-center">
            <span className="sr-only">SocialPost AI</span>

            <span className="text-xl font-bold text-indigo-600">SocialPost AI</span>
          </a>
        </div>
        <div className="flex ">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
              User
            </a>
          </button>
        </div>
      </nav>
    </header>
  )
}
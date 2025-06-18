// src/components/share-button.tsx
import { useId, useRef, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import { RiFacebookFill, RiMailLine, RiTwitterXFill } from '@remixicon/react'
import { CheckIcon, CopyIcon, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ShareButtonProps {
  /** The URL to share. Defaults to the current page URL. */
  url?: string
  /** The title displayed in the popover. */
  title?: string
  /** The default text to include in social media shares. */
  shareText?: string
  /** A custom trigger element. Defaults to a share button. */
  trigger?: React.ReactNode
}

/**
 * A reusable button that opens a popover with options to copy a link or
 * share it on social media.
 */
export function ShareButton({
  url,
  title = 'Share Link',
  shareText = 'Check this out!',
  trigger,
}: ShareButtonProps) {
  const id = useId()
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()

  // If a URL prop isn't provided, construct it from the current location.
  const shareUrl = url || `${window.location.origin}${location.pathname}`

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Show copied state a bit longer
    }
  }

  // --- Social Share URLs ---
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedText = encodeURIComponent(shareText)
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    'Check this out'
  )}&body=${encodeURIComponent(`I thought you might find this interesting: ${shareUrl}`)}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || (
          <Button variant='outline' size='icon' aria-label='Share'>
            <Share2 className='h-4 w-4' />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='flex flex-col gap-4 text-center'>
          <div className='text-lg font-medium'>{title}</div>
          <div className='flex justify-center gap-2'>
            <SocialButton
              href={twitterShareUrl}
              aria-label='Share on Twitter'
              tooltip='Share on Twitter'
            >
              <RiTwitterXFill size={18} />
            </SocialButton>
            <SocialButton
              href={facebookShareUrl}
              aria-label='Share on Facebook'
              tooltip='Share on Facebook'
            >
              <RiFacebookFill size={18} />
            </SocialButton>
            <SocialButton
              href={emailShareUrl}
              aria-label='Share via Email'
              tooltip='Share via Email'
            >
              <RiMailLine size={18} />
            </SocialButton>
          </div>
          <div className='relative'>
            <Input
              ref={inputRef}
              id={id}
              className='pr-10 text-sm'
              type='text'
              defaultValue={shareUrl}
              aria-label='Share link'
              readOnly
            />
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex h-full w-10 items-center justify-center rounded-r-md transition-colors'
                    aria-label={copied ? 'Copied' : 'Copy link'}
                    disabled={copied}
                  >
                    <CheckIcon
                      className={cn(
                        'absolute h-5 w-5 stroke-emerald-500 transition-all',
                        copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      )}
                    />
                    <CopyIcon
                      className={cn(
                        'h-5 w-5 transition-all',
                        copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                      )}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? 'Copied!' : 'Copy link'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Helper component for social buttons to reduce repetition
function SocialButton({
  href,
  children,
  tooltip,
  ...props
}: React.ComponentProps<typeof Button> & { href: string; tooltip: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a href={href} target='_blank' rel='noopener noreferrer'>
            <Button size='icon' variant='outline' {...props}>
              {children}
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

import { Twitter, Github, Linkedin, Zap } from 'lucide-react'

// --- 1. Data-driven content for easier maintenance ---
const footerNav = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'Updates'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Community', 'Support', 'Security'],
  },
]

const socialLinks = [
  {
    label: 'Twitter',
    icon: Twitter,
    href: '#',
  },
  {
    label: 'GitHub',
    icon: Github,
    href: '#',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: '#',
  },
]

// --- 2. Main Component ---
export const FooterGlow = () => {
  return (
    <footer className='relative z-10 mt-64 w-full pt-16 pb-8'>
      {/* Background Glow Effect */}
      <div className='pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2'>
        <div className='bg-primary/10 absolute -top-32 left-1/4 h-72 w-72 rounded-full blur-3xl' />
        <div className='bg-primary/10 absolute right-1/4 -bottom-24 h-80 w-80 rounded-full blur-3xl' />
      </div>

      {/* Glassmorphism Container */}
      <div className='border-border/20 bg-background/80 relative mx-auto max-w-6xl rounded-2xl border p-6 shadow-2xl backdrop-blur-sm md:p-10'>
        <div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-12'>
          <FooterInfo />
          <FooterNavigation />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  )
}

// --- 3. Sub-components for better structure ---
const FooterInfo = () => (
  <div className='flex flex-col items-center text-center md:items-start md:text-left'>
    <a href='#' className='mb-4 flex items-center gap-2'>
      <span className='bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full shadow-md'>
        <Zap className='h-5 w-5' />
      </span>
      <span className='text-xl font-semibold tracking-tight'>Mvpblocks</span>
    </a>
    <p className='text-muted-foreground mb-6 max-w-xs text-sm'>
      Reusable components to help you create beautiful and responsive user
      interfaces quickly.
    </p>
    <div className='flex gap-4'>
      {socialLinks.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className='text-muted-foreground hover:text-foreground transition-colors'
        >
          <Icon className='h-5 w-5' />
        </a>
      ))}
    </div>
  </div>
)

const FooterNavigation = () => (
  <nav className='flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left'>
    {footerNav.map(({ title, links }) => (
      <div key={title}>
        <h3 className='text-primary mb-3 text-xs font-semibold tracking-widest uppercase'>
          {title}
        </h3>
        <ul className='space-y-2'>
          {links.map((link) => (
            <li key={link}>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
)

const FooterCopyright = () => (
  <div className='border-border/20 text-muted-foreground relative z-10 mt-10 border-t pt-6 text-center text-xs'>
    <span>© {new Date().getFullYear()} Mvpblocks. All rights reserved.</span>
  </div>
)

export default FooterGlow

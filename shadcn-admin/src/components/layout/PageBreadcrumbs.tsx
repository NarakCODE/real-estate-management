import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Home } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { breadcrumbMap } from './breadcrumbMap'

interface PageBreadcrumbsProps {
  customCrumbs?: Array<{ label: React.ReactNode; to?: string | null }>
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = []
  let path = ''
  for (let i = 0; i < segments.length; i++) {
    path += '/' + segments[i]
    const crumb = breadcrumbMap[path]
    if (crumb) crumbs.push(crumb)
  }
  return crumbs
}

export function PageBreadcrumbs({ customCrumbs }: PageBreadcrumbsProps) {
  const { location } = useRouterState()
  const crumbs = getBreadcrumbs(location.pathname)
  const allCrumbs = customCrumbs ? [...crumbs, ...customCrumbs] : crumbs

  if (allCrumbs.length === 0) return null

  return (
    <Breadcrumb className='my-6 hidden md:flex'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/landing'>
              <Home className='h-4 w-4' />
              <span className='sr-only'>Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {allCrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.to && index !== allCrumbs.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link to={crumb.to} className='truncate'>
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className='max-w-28 truncate md:max-w-none'>
                  {crumb.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

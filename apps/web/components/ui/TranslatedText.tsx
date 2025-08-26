"use client"

import { useTranslations, useLocale } from 'next-intl'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TranslatedTextProps {
  /** Translation key path (e.g., "homepage.heroTitle") */
  t: string
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements
  /** Additional CSS classes */
  className?: string
  /** Translation values for interpolation */
  values?: Record<string, string | number | ReactNode>
  /** Fallback text if translation is missing */
  fallback?: string
  /** Children to render instead of translation (for custom content) */
  children?: ReactNode
}

export function TranslatedText({ 
  t: translationKey, 
  as: Component = 'span',
  className,
  values,
  fallback,
  children,
  ...props 
}: TranslatedTextProps) {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Determine if this is a heading component
  const isHeading = Component && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(Component as string)
  
  // Apply Arabic fonts based on component type and locale
  const fontClass = isRTL 
    ? (isHeading ? 'font-arabic-heading' : 'font-arabic-body')
    : ''
  
  const combinedClassName = cn(fontClass, className)
  
  if (children) {
    return <Component className={combinedClassName} {...props}>{children}</Component>
  }

  const translatedText = t(translationKey, values)
  
  if (translatedText === translationKey && fallback) {
    return (
      <Component className={combinedClassName} {...props}>
        {fallback}
      </Component>
    )
  }
  
  return (
    <Component className={combinedClassName} {...props}>
      {translatedText}
    </Component>
  )
}
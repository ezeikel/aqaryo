"use client"

import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

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
  
  if (children) {
    return <Component className={className} {...props}>{children}</Component>
  }

  const translatedText = t(translationKey, values)
  
  if (translatedText === translationKey && fallback) {
    return (
      <Component className={className} {...props}>
        {fallback}
      </Component>
    )
  }
  
  return (
    <Component className={className} {...props}>
      {translatedText}
    </Component>
  )
}
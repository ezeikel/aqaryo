import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/search": "/search",
    "/buy": "/buy",
    "/rent": "/rent",
    "/list-property": "/list-property",
    "/find-agent": "/find-agent",
    "/developers": "/developers",
    "/blog": "/blog",
    "/account": "/account",
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, redirect, useRouter, usePathname } = createNavigation(routing)

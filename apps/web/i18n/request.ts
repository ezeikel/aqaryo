import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"
import { translations } from "@aqaryo/translations"

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    return {
      locale: routing.defaultLocale,
      messages: translations[routing.defaultLocale],
    }
  }

  return {
    locale,
    messages: translations[locale as keyof typeof translations],
  }
})

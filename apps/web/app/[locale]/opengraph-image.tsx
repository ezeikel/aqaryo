import { ImageResponse } from 'next/og'
 
export const alt = 'Aqaryo - Premium Real Estate in the Gulf'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type Props = {
  params: Promise<{ locale: string }>
}
 
export default async function Image({ params }: Props) {
  const { locale } = await params
  const isArabic = locale === 'ar'
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: isArabic ? 'system-ui' : 'system-ui',
          direction: isArabic ? 'rtl' : 'ltr',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              textAlign: 'center',
            }}
          >
            {isArabic ? 'عقاريو' : 'Aqaryo'}
          </h1>
        </div>
        <p
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {isArabic ? 'العقارات الفاخرة في الخليج' : 'Premium Real Estate in the Gulf'}
        </p>
        <p
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            marginTop: 20,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {isArabic 
            ? 'اكتشف العقارات الفاخرة في دولة الإمارات والسعودية ومنطقة الخليج'
            : 'Discover luxury properties across UAE, Saudi Arabia, and the Gulf region'
          }
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
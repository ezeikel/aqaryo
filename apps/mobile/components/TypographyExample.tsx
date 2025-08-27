import { View } from 'react-native';
import { Typography, Heading, Body, Caption, Title } from './ui/Typography';

export function TypographyExample() {
  return (
    <View className="p-4 space-y-4">
      {/* Convenience components */}
      <Title>Aqaryo</Title>
      
      <Heading size="xl" weight="semibold">
        Premium Real Estate
      </Heading>
      
      <Body size="lg">
        Discover luxury properties across the Gulf region
      </Body>
      
      <Caption>
        Updated 2 hours ago
      </Caption>
      
      {/* Direct Typography usage */}
      <Typography variant="heading" font="outfit" weight="bold" size="2xl">
        Featured Properties
      </Typography>
      
      <Typography variant="body" font="poppins" weight="regular" size="base">
        Find your dream home with expert guidance and exclusive listings.
      </Typography>
      
      {/* Arabic text with automatic font selection */}
      <Typography locale="ar" variant="heading" weight="bold" size="xl" style={{textAlign: 'right'}}>
        العقارات المميزة
      </Typography>
      
      <Typography locale="ar" variant="body" weight="regular" size="base" style={{textAlign: 'right'}}>
        اكتشف العقارات الفاخرة في دولة الإمارات والسعودية ومنطقة الخليج
      </Typography>
      
      {/* Specific font usage */}
      <Typography font="cairo" weight="semibold" size="lg" style={{textAlign: 'right'}}>
        نص بخط القاهرة
      </Typography>
      
      <Typography font="noto-kufi" weight="bold" size="lg" style={{textAlign: 'right'}}>
        نص بخط نوتو كوفي العربي
      </Typography>
      
      {/* Different sizes and weights */}
      <View className="space-y-2">
        <Typography font="outfit" weight="extrabold" size="3xl">
          Extra Bold Heading
        </Typography>
        
        <Typography font="poppins" weight="light" size="sm" color="gray-600">
          Light caption text
        </Typography>
        
        <Typography font="poppins" weight="medium" size="base">
          Medium weight body text
        </Typography>
      </View>
    </View>
  );
}
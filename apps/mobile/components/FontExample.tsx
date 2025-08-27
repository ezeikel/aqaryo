import { View } from 'react-native';
import { Typography, Heading, Body, Caption, Title } from './ui/Typography';

export function FontExample() {
  return (
    <View className="p-4 space-y-4">
      {/* Using convenience components */}
      <Title className="text-center">Aqaryo</Title>
      <Caption className="text-center">Premium Real Estate in the Gulf</Caption>
      
      {/* English/Latin fonts - Poppins body text */}
      <Heading size="lg" className="mb-2">Poppins Font Family</Heading>
      
      <Body weight="regular" size="lg" className="mb-2">
        Poppins Regular - Default body text
      </Body>
      
      <Body weight="medium" size="lg" className="mb-2">
        Poppins Medium - For emphasis
      </Body>
      
      <Body weight="bold" size="lg" className="mb-4">
        Poppins Bold - For strong emphasis
      </Body>
      
      {/* Outfit fonts for headings */}
      <Heading size="lg" className="mb-2">Outfit Font Family</Heading>
      
      <Heading weight="semibold" size="xl" className="mb-2">
        Outfit SemiBold - For headings
      </Heading>
      
      <Heading weight="bold" size="2xl" className="mb-4">
        Outfit Bold - Large headings
      </Heading>
      
      {/* Arabic fonts - Auto-selected based on locale */}
      <Heading size="lg" className="mb-2">Arabic Typography</Heading>
      
      <Typography locale="ar" variant="body" size="lg" className="mb-2" style={{textAlign: 'right'}}>
        النص العربي بخط مُحدد تلقائياً
      </Typography>
      
      <Typography locale="ar" variant="heading" weight="bold" size="xl" className="mb-2" style={{textAlign: 'right'}}>
        عنوان عربي بخط العناوين
      </Typography>
      
      {/* Specific font usage */}
      <Typography font="cairo" weight="regular" size="lg" className="mb-2" style={{textAlign: 'right'}}>
        نص بخط القاهرة العادي
      </Typography>
      
      <Typography font="cairo" weight="bold" size="xl" className="mb-2" style={{textAlign: 'right'}}>
        عنوان بخط القاهرة العريض
      </Typography>
      
      <Typography font="noto-kufi" weight="regular" size="lg" className="mb-2" style={{textAlign: 'right'}}>
        نص بخط نوتو كوفي العربي العادي
      </Typography>
      
      <Typography font="noto-kufi" weight="bold" size="xl" className="mb-4" style={{textAlign: 'right'}}>
        عنوان بخط نوتو كوفي العربي العريض
      </Typography>
      
      {/* Size and weight variations */}
      <Heading size="lg" className="mb-2">Font Sizes & Weights</Heading>
      
      <Typography font="outfit" weight="extrabold" size="3xl" className="mb-2">
        Extra Bold Heading
      </Typography>
      
      <Typography font="poppins" weight="light" size="sm" color="gray-600" className="mb-2">
        Light caption text
      </Typography>
      
      <Typography font="poppins" weight="medium" size="base">
        Medium weight body text
      </Typography>
    </View>
  );
}
import { TypographyExample } from '@/components/TypographyExample';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/Typography';

const Search = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView>
        <Typography font="outfit" weight="bold" size="2xl" className="text-center p-4">
          Search Page
        </Typography>
        <LanguageSwitcher />
        <TypographyExample />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
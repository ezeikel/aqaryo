import { FontExample } from '@/components/FontExample';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Text>Home</Text>
      <FontExample />
    </SafeAreaView>
  );
};

export default Home;
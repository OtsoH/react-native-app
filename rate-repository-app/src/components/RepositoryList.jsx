import { FlatList, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <View />;
  if (error) return <View />;

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
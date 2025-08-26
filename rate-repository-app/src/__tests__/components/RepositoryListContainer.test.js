import { render, screen, within } from '@testing-library/react-native';
import { View, Text, Image, FlatList } from 'react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const RepositoryItem = ({ repository }) => {
        return (
          <View testID="repositoryItem">
            <Text>{repository.fullName}</Text>
            <Text>{repository.description}</Text>
            <Text>{repository.language}</Text>
            <Text>{repository.forksCount}</Text>
            <Text>{repository.stargazersCount}</Text>
            <Text>{repository.ratingAverage}</Text>
            <Text>{repository.reviewCount}</Text>
            <Image source={{ uri: repository.ownerAvatarUrl }} />
          </View>
        );
      };

      const RepositoryListContainer = () => {
        return (
          <FlatList
            data={repositories.edges}
            renderItem={({ item }) => (
              <RepositoryItem repository={item.node} />
            )}
            keyExtractor={(item) => item.cursor}
          />
        );
      };
      render(<RepositoryListContainer />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toBeDefined();
      expect(secondRepositoryItem).toBeDefined();

      expect(within(firstRepositoryItem).getByText('jaredpalmer/formik')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('Build forms in React, without the tears')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('TypeScript')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('1619')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('21856')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('88')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('3')).toBeDefined();

      expect(within(secondRepositoryItem).getByText('async-library/react-async')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('Flexible promise-based React data loader')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('JavaScript')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('69')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('1760')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('72')).toBeDefined();
    });
  });
});
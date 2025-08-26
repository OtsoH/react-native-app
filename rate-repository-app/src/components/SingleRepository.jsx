import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import { format } from 'date-fns';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  reviewText: {
    marginTop: 10,
    lineHeight: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: theme.colors.textSecondary,
  },
});

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
      </View>
      {review.text && (
        <Text style={styles.reviewText}>{review.text}</Text>
      )}
    </View>
  );
};

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <RepositoryItem repository={repository} showGitHubButton={true} />
    </View>
  );
};

const SingleRepositoryContainer = ({ repository, reviews, onEndReach, loading }) => {
  const renderItem = ({ item }) => {
    if (item.fullName) return <RepositoryInfo repository={item} />;
    return <ReviewItem review={item} />;
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const renderFooter = () =>
    loading ? (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading more reviews...</Text>
      </View>
    ) : null;

  const data = repository ? [repository, ...reviews] : reviews;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => (item.fullName ? `repo-${item.id}` : `review-${item.id}`)}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      removeClippedSubviews={false}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews, fetchMore, loading, error } = useRepository(id, 3);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading && !repository) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading repository...</Text>
      </View>
    );
  }
  if (error) {
    console.error('Repository error:', error);
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Error loading repository</Text>
      </View>
    );
  }
  if (!repository) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Repository not found</Text>
      </View>
    );
  }

  console.log('Rendering with reviews count:', reviews.length);

  return (
    <SingleRepositoryContainer
      repository={repository}
      reviews={reviews}
      onEndReach={onEndReach}
      loading={loading}
    />
  );
};

export default SingleRepository;
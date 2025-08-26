import { FlatList, View, StyleSheet, Alert, Pressable } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useUserReviews from '../hooks/useUserReviews';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
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
  repositoryName: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 3,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

const ReviewItem = ({ review, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  const handleViewRepository = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(review.id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewHeader}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
      </View>
      {review.text && (
        <Text style={styles.reviewText}>{review.text}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={handleViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteReview}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { reviews, loading, error, refetch } = useUserReviews();
  const [deleteReview] = useDeleteReview();

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      refetch();
    } catch {
      Alert.alert('Error', 'Failed to delete review');
    }
  };

  const renderItem = ({ item }) => (
    <ReviewItem review={item} onDelete={handleDeleteReview} />
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading reviews</Text>
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>You have not written any reviews yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
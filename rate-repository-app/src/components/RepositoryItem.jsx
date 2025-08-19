import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text fontSize="subheading" fontWeight="bold" style={styles.fullName}>
            {repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {repository.description}
          </Text>
          <View style={styles.languageContainer}>
            <Text style={styles.language}>
              {repository.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {formatCount(repository.forksCount)}
          </Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Forks
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Stars
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {repository.ratingAverage}
          </Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Rating
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {repository.reviewCount}
          </Text>
          <Text color="textSecondary" style={styles.statLabel}>
            Reviews
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  fullName: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  languageContainer: {
    alignSelf: 'flex-start',
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
});

export default RepositoryItem;
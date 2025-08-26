import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

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
      {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={handleOpenGitHub}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
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

  githubButton: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  githubButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RepositoryItem;
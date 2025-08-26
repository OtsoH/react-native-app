import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import useAuthUser from '../hooks/useAuthUser';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

const AppBar = () => {
  const { me } = useAuthUser();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>
            Repositories
          </Text>
        </Link>
         {me && (
          <Link to="/create-review" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>
              Create a review
            </Text>
          </Link>
        )}

        {me && (
          <Link to="/my-reviews" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>
              My Reviews
            </Text>
          </Link>
        )}

        {me ? (
          <Pressable style={styles.tab} onPress={handleSignOut}>
            <Text style={styles.tabText}>
              Sign out
            </Text>
          </Pressable>
        ) : (
          <>
            <Link to="/signin" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>
                Sign in
              </Text>
            </Link>
          <Link to="/signup" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>
                Sign up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
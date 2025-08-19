import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>
            Repositories
          </Text>
        </Link>
         <Link to="/signin" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
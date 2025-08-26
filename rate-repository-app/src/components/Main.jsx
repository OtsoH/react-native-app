import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignInForm from './SignIn';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignInForm />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<UserReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useAuthenticatedUser = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { me: data ? data.me : null, loading, error };
};

export default useAuthenticatedUser;
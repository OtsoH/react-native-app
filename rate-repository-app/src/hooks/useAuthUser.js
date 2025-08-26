import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useAuthenticatedUser = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: false },
  });

  return { me: data ? data.me : null, loading, error };
};

export default useAuthenticatedUser;
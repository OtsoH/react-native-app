import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId, first = 3) => {
  const variables = {
    repositoryId,
    first,
  };

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
    skip: !repositoryId,
  });

  const reviews = data?.repository?.reviews?.edges?.map(edge => edge.node) || [];

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId,
        first,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
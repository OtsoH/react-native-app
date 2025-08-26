import React from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { withApollo } from '@apollo/client/react/hoc';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: { height: 10 },
});

const withNavigation = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
  WrappedComponent.displayName = `withNavigation(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

const ORDER_OPTS = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

class RepositoryList extends React.Component {
  state = {
    selectedOrder: 'latest',
    searchKeyword: '',
    debouncedSearchKeyword: '',
    items: [],
    loading: true,
    error: null,
  };

  searchTimer = null;
  observable = null;
  subscription = null;

  componentDidMount() {
    this.startQuery();
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.searchTimer) clearTimeout(this.searchTimer);
  }

  renderHeader = () => {
    const { selectedOrder, searchKeyword } = this.state;
    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        onOrderChange={this.onOrderChange}
        searchKeyword={searchKeyword}
        onSearchChange={this.onSearchChange}
      />
    );
  };

  getVariables = () => {
    const { selectedOrder, debouncedSearchKeyword } = this.state;
    const order = ORDER_OPTS[selectedOrder] || ORDER_OPTS.latest;
    return {
      ...order,
      searchKeyword: debouncedSearchKeyword || undefined,
    };
  };

  startQuery = () => {
    const { client } = this.props;
    this.observable = client.watchQuery({
      query: GET_REPOSITORIES,
      variables: this.getVariables(),
      fetchPolicy: 'cache-and-network',
    });

    this.subscription = this.observable.subscribe({
      next: ({ data, loading }) => {
        const nodes = data?.repositories?.edges?.map((e) => e.node) ?? [];
        this.setState({ items: nodes, loading, error: null });
      },
      error: (error) => this.setState({ error, loading: false }),
    });
  };

  refetch = () => {
    if (!this.observable) return;
    this.observable
      .setOptions({ variables: this.getVariables(), fetchPolicy: 'cache-and-network' })
      .catch(() => {});
  };

  onOrderChange = (value) => {
    this.setState({ selectedOrder: value }, this.refetch);
  };

  onSearchChange = (value) => {
    this.setState({ searchKeyword: value });
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.setState({ debouncedSearchKeyword: value }, this.refetch);
    }, 500);
  };

  navigateToRepository = (id) => {
    this.props.navigate(`/repository/${id}`);
  };

  renderItem = ({ item }) => (
    <Pressable onPress={() => this.navigateToRepository(item.id)}>
      <RepositoryItem repository={item} />
    </Pressable>
  );

  ItemSeparator = () => <View style={styles.separator} />;

  render() {
    const { items, loading, error } = this.state;

    if (loading && items.length === 0) return <View />;
    if (error) return <View />;

    return (
      <FlatList
        data={items}
        ItemSeparatorComponent={this.ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

export default withApollo(withNavigation(RepositoryList));

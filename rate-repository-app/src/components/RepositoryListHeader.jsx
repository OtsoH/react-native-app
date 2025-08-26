import { View, StyleSheet, Platform, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#24292e',
  },
  picker: {
    height: 50,
    color: '#24292e',
    fontWeight: 'bold',
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24292e',
    height: 40,
  },
});

const RepositoryListHeader = ({ selectedOrder, onOrderChange, searchKeyword, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search repositories..."
        placeholderTextColor="#999"
        style={styles.searchInput}
        value={searchKeyword}
        onChangeText={onSearchChange}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <View>
        <Picker
          selectedValue={selectedOrder}
          style={styles.picker}
          onValueChange={onOrderChange}
          mode='dropdown'
          itemStyle={Platform.OS === 'ios' || Platform.OS === 'android' ? styles.pickerItem : undefined}
        >
          <Picker.Item
            label="Latest repositories"
            value="latest"
            color="#24292e"
          />
          <Picker.Item
            label="Highest rated repositories"
            value="highest"
            color="#24292e"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="lowest"
            color="#24292e"
          />
        </Picker>
      </View>
    </View>
  );
};

export default RepositoryListHeader;
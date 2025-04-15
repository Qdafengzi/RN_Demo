import {Platform, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React, {useEffect, useState} from 'react';
import {CollapsibleHeaderFlatList} from 'react-native-collapsible-header-views';

interface ListItemProps {
  id: string;
  title: string;
}

const ListItem: React.FC<ListItemProps> = item => (
  <View style={styles.itemBox}>
    <Text style={styles.item}>{item.title}</Text>
  </View>
);

export const ListDetailScreen3: React.FC = () => {
  const {colors} = useTheme();
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const ref: React.RefObject<CollapsibleHeaderFlatList<ListItemProps>> = React.createRef();

  useEffect(() => {
    let list = [];
    for (let i = 0; i < 300; i++) {
      const item: ListItemProps = {
        id: i.toString(),
        title: `Item ${i}`,
      };
      list.push(item);
    }
    setListData(list);
  }, []);

  const Header = () => {
    return (
      <View
        style={{
          height: 100,
          width: '100%',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff'}}>Header</Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.detailContainer, {backgroundColor: colors.background}]}>
      <CollapsibleHeaderFlatList
        ref={ref}
        CollapsibleHeaderComponent={Header}
        headerHeight={100}
        statusBarHeight={Platform.OS === 'ios' ? 20 : 0}
        style={styles.listBox}
        data={listData}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: 'blue',
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff'}}>列表头部</Text>
          </View>
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListItem {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
  },
  listBox: {
    flex: 1,
    width: '100%',
  },
  itemBox: {
    height: 60,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  item: {
    color: '#fff',
    width: '100%',
    marginLeft: 10,
  },
});

import {Platform, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Animated} from 'react-native';
import {CollapsibleHeaderScrollView} from 'react-native-collapsible-header-views';

interface ListItemProps {
  id: string;
  title: string;
}

const ListItem: React.FC<ListItemProps> = item => (
  <View style={styles.itemBox}>
    <Text style={styles.item}>{item.title}</Text>
  </View>
);

export const ListDetailScreen2: React.FC = () => {
  const {colors} = useTheme();
  const [listData, setListData] = useState<ListItemProps[]>([]);

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
      <View style={{height: 64, width: '100%', backgroundColor: 'red'}}>
        <Text style={{color: '#fff'}}>Header</Text>
      </View>
    );
  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 64);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 64],
    outputRange: [0, -64],
  });

  return (
    <View
      style={[styles.detailContainer, {backgroundColor: colors.background}]}>
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          // backgroundColor: 'rgba(52, 52, 52, 0)',
          backgroundColor: 'red',
          width: '100%',

          //for animation
          height: 64,
          transform: [{translateY: translateY}],
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          elevation: 4,
          zIndex: 1,
        }}>
        {
          //You can use your component for header.
          <Header />
        }
      </Animated.View>

      <FlashList
          ListHeaderComponent={<View style={{height: 64}}></View>}
        style={styles.listBox}
        data={listData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListItem {...item} />}
        estimatedItemSize={200}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
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

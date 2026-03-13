import {PullToRefresh} from '@sdcx/pull-to-refresh';
import React, {useState} from "react";
import {FlatList, Text} from "react-native";

const PullToRefreshPage: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <PullToRefresh
            refreshing={refreshing}
            onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 500);
            }}
        >
            <FlatList
                nestedScrollEnabled
                data={Array.from({length: 20})}
                renderItem={({item, index}) => <Text
                    style={{width: '100%', marginVertical: 4, padding: 16, backgroundColor: '#a7a7a9'}}>{index}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </PullToRefresh>
    );
}
export default PullToRefreshPage;

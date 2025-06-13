import NativePullToRefresh, {NativePullToRefreshProps} from '../../../specs/PullToRefreshNativeComponent';
import NativePullToRefreshHeader from '../../../specs/PullToRefreshHeaderNativeComponent';
import NativePullToRefreshFooter from '../../../specs/PullToRefreshFooterNativeComponent';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {HeaderStates} from './HeaderState.ts';

export interface PullToRefreshProps extends NativePullToRefreshProps {
    children?: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = (props) => {

    const [refreshState, setRefreshState] = useState('下拉刷新');

    const headerOnStateChange = (event: { nativeEvent: { state: string } }) => {
        console.log('当前状态为:', event.nativeEvent.state);
        switch (event.nativeEvent.state) {
            case HeaderStates.PullDownToRefresh:
                setRefreshState('下拉刷新');
                break;
            case HeaderStates.RefreshFinish:
                break;
            case HeaderStates.Refreshing:
                setRefreshState('正在刷新……');
                break;
            case HeaderStates.ReleaseToRefresh:
                setRefreshState('释放刷新');
                break;
            case HeaderStates.RefreshReleased:
                break;
            default:
                break;
        }
    };

    const footerOnStateChange = (event: { nativeEvent: { state: string } }) => {
        console.log('当前下拉状态为:', event.nativeEvent.state);
        // switch (event.nativeEvent.state) {
        //     case HeaderStates.PullDownToRefresh:
        //         setRefreshState('下拉刷新');
        //         break;
        //     case HeaderStates.RefreshFinish:
        //         break;
        //     case HeaderStates.Refreshing:
        //         setRefreshState('正在刷新……');
        //         break;
        //     case HeaderStates.ReleaseToRefresh:
        //         setRefreshState('释放刷新');
        //         break;
        //     case HeaderStates.RefreshReleased:
        //         break;
        //     default:
        //         break;
        // }
    };

    return (
        <NativePullToRefresh
            style={props.style}
            onRefresh={props.onRefresh}
            onLoadMore={props.onLoadMore}
            isRefreshing={props.isRefreshing}
            isLoadMore={props.isLoadMore}
            noMoreData={props.noMoreData}
            enableLoadMore={props.enableLoadMore}
            enableRefresh={props.enableRefresh}
        >
            <NativePullToRefreshHeader
                onStateChange={headerOnStateChange}
                style={customStyle.container}>
                <LottieView
                    source={require('../../assets/lottie/loading2.json')}
                    autoPlay
                    loop
                    speed={0.5}
                    style={customStyle.lottie}
                />
                <Text style={customStyle.text}>{refreshState}</Text>
            </NativePullToRefreshHeader>
            {props.children}


            <NativePullToRefreshFooter
                onStateChange={footerOnStateChange}
                isLoadingMore={props.isLoadMore}
                style={customStyle.container}>
                <LottieView
                    source={require('../../assets/lottie/loading2.json')}
                    autoPlay
                    loop
                    speed={0.5}
                    style={customStyle.lottie}
                />
                <Text style={customStyle.text}>正在加载</Text>

            </NativePullToRefreshFooter>
        </NativePullToRefresh>
    );
};

const customStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff000',
    },
    text: {
        width: '100%',
        textAlign: 'center',
    },
    lottie: {
        width: 60,
        height: 60,
    },
    box: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        flexDirection: 'column',
    },
});

import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type PullToRefreshOnRefreshEvent = {

};

type PullToRefreshOnLoadMoreEvent = {

};

export interface NativePullToRefreshProps extends ViewProps {
    onRefresh?: BubblingEventHandler<PullToRefreshOnRefreshEvent> | null;
    onLoadMore?: BubblingEventHandler<PullToRefreshOnLoadMoreEvent> | null;
    isRefreshing?: boolean;
    isLoadMore?: boolean;
    noMoreData?: boolean;
    enableLoadMore?: boolean;
    enableRefresh?: boolean;
}

export default codegenNativeComponent<NativePullToRefreshProps>('NativePullToRefresh') as HostComponent<NativePullToRefreshProps>;

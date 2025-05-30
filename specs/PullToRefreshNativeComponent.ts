import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';


type PullToRefreshOnRefreshEvent = {

};

type PullToRefreshOnLoadMoreEvent = {

};

export interface NativeProps extends ViewProps {
  onRefresh?: BubblingEventHandler<PullToRefreshOnRefreshEvent> | null;
  onLoadMore?: BubblingEventHandler<PullToRefreshOnLoadMoreEvent> | null;
  isRefreshing?: boolean;
  isLoadMore?: boolean;
  noMoreData?: boolean;
  enableLoadMore?: boolean;
  enableRefresh?: boolean;
}

export default codegenNativeComponent<NativeProps>(
    'PullToRefresh',
    {
      // 指定组件接受子节点
      interfaceOnly: true,
    }
) as HostComponent<NativeProps>;

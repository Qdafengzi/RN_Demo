import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type PullToRefreshOnRefreshEvent = {

};

export interface NativeProps extends ViewProps {
    onRefresh?: BubblingEventHandler<PullToRefreshOnRefreshEvent> | null;
    isRefreshing?: boolean;
}

export default codegenNativeComponent<NativeProps>('NativePullToRefreshHeader',
    {
        // 指定组件接受子节点
        interfaceOnly: true,
    }
) as HostComponent<NativeProps>;

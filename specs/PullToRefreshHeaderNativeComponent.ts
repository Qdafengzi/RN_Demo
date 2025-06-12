import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type HeaderStateEvent = {
    state: string;
};

export interface NativePullToRefreshHeaderProps extends ViewProps {
    onStateChange?: BubblingEventHandler<HeaderStateEvent> | null;
    isRefreshing?: boolean;
}

export default codegenNativeComponent<NativePullToRefreshHeaderProps>('NativePullToRefreshHeader') as HostComponent<NativePullToRefreshHeaderProps>;

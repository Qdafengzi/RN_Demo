import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type FooterStateEvent = {
    state: string;
};

export interface NativePullToRefreshFooterProps extends ViewProps {
    onStateChange?: BubblingEventHandler<FooterStateEvent> | null;
    isLoadingMore?: boolean;
}

export default codegenNativeComponent<NativePullToRefreshFooterProps>('NativePullToRefreshFooter') as HostComponent<NativePullToRefreshFooterProps>;

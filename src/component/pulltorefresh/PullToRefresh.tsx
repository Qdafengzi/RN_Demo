import NativePullToRefresh, {NativePullToRefreshProps} from '../../../specs/PullToRefreshNativeComponent';
import NativePullToRefreshHeader from '../../../specs/PullToRefreshHeaderNativeComponent';
import React from 'react';

export interface PullToRefreshProps extends NativePullToRefreshProps {
    children?: React.ReactNode;
}
export const PullToRefresh: React.FC<PullToRefreshProps> = (props) => {
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
            <NativePullToRefreshHeader/>
            {props.children}
        </NativePullToRefresh>
    );
};

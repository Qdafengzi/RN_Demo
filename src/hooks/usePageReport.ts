import {useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';

export function usePageReport(pageName?: string) {
    const route = useRoute();
    const actualPageName = pageName || route.name || '未知页面';
    const isMounted = useRef(false);

    // 页面显示事件
    useEffect(() => {
        isMounted.current = true;
        console.log(`页面 ${actualPageName} 显示`);
        reportPageView(actualPageName);
        // 页面隐藏事件
        return () => {
            if (isMounted.current) {
                console.log(`页面 ${actualPageName} 隐藏`);
                reportPageHide(actualPageName);
            }
        };
    }, [actualPageName]);

    // 上报页面浏览事件
    const reportPageView = (name: string) => {
        console.log(`[事件上报] 页面浏览: ${name}`);
        // 这里可以调用实际的埋点SDK
        // Analytics.logEvent('page_view', { page_name: name });
    };

    // 上报页面离开事件
    const reportPageHide = (name: string) => {
        console.log(`[事件上报] 页面离开: ${name}`);
        // Analytics.logEvent('page_hide', { page_name: name });
    };

    // 上报自定义事件
    const reportEvent = (eventName: string, params?: Record<string, any>) => {
        console.log(`[事件上报] 自定义事件: ${eventName}`, params);
        // Analytics.logEvent(eventName, params);
    };

    return {
        reportEvent,
    };
}

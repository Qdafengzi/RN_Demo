import React, {useEffect, useMemo, useRef, useState} from "react";
import { StyleSheet, View} from "react-native";
import {ImageRequireSource} from "react-native/Libraries/Image/ImageSource";
import * as Progress from 'react-native-progress';
import TurboImage, {ResizeMode, Source} from 'react-native-turbo-image';

export type XImageModel = string | number | Source | ImageRequireSource;

type XImageProps = {
    model: XImageModel;
    style?: any;
    resizeMode?: ResizeMode;
    placeHolder?: XImageModel;
    errorHolder?: XImageModel;
};

type NormalizedSource = {
    source?: Source | ImageRequireSource;
    isRemote: boolean;
    key: string;
};


const XImage = React.memo((props: XImageProps) => {
    const {
        model,
        style,
        resizeMode = 'contain',
        placeHolder,
        errorHolder,
    } = props;

    const main = useMemo(() => normalizeModel(model), [model]);
    const placeholder = useMemo(() => normalizeModel(placeHolder), [placeHolder]);
    const error = useMemo(() => normalizeModel(errorHolder), [errorHolder]);

    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [progress, setProgress] = useState(0);
    const lastProgressRef = useRef(0);

    useEffect(() => {
        setStatus('loading');
        setProgress(0);
        lastProgressRef.current = 0;
    }, [main.key]);

    const defaultSource = useMemo(() => {
        if (typeof placeholder.source === 'number') {
            return placeholder.source;
        }
        if (typeof error.source === 'number') {
            return error.source;
        }
        return undefined;
    }, [placeholder.source, error.source]);

    const shouldShowProgress = main.isRemote && status === 'loading';
    const shouldShowPlaceholder = main.isRemote && !!placeholder.source && status !== 'loaded';

    //  completed: number;
    //   total: number;
    const onProgress = (result: any) => {
        if (!main.isRemote) {
            return;
        }
        const {completed, total} = result.nativeEvent ?? {};
        if (!total || completed <= 0) {
            return;
        }
        const next = Math.min(1, completed / total);
        //logger.log(`loading progress:${next}`)
        if (next - lastProgressRef.current >= 0.02 || next === 1) {
            lastProgressRef.current = next;
            setProgress(next);
        }
    };

    return (
        <View style={[styles.container, style]}>


            {main.source && (
                <TurboImage
                    source={main.source as any}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode={resizeMode}
                    // placeholder={defaultSource}
                    onStart={() => {
                        if (main.isRemote) {
                            setStatus('loading');
                        }
                    }}
                    onProgress={onProgress}
                    onFailure={() => {
                        if (__DEV__){
                            //logger.log("load image error:",main)
                        }
                        setStatus('error');
                    }}
                    onSuccess={() => {
                        setProgress(1);
                        setStatus('loaded');
                    }}
                />
            )}

            {shouldShowPlaceholder && (
                <TurboImage
                    source={placeholder.source as any}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode={resizeMode}
                    onStart={() => {
                        if (__DEV__){
                            //logger.log('start load placeHolder:',placeholder.source, main.isRemote)
                        }
                    }}
                />
            )}

            {shouldShowProgress && (
                <View pointerEvents="none" style={styles.progressContainer}>
                    <Progress.Circle
                        progress={progress}
                        size={34}
                        thickness={3}
                        color={INDICATOR_COLOR}
                        unfilledColor={UN_FILL_COLOR}
                        borderWidth={0}
                        strokeCap={'round'}
                        showsText={false}
                        formatText={() =>
                            // `${Math.round(progress * 100)}%`
                            ''
                        }
                    />
                </View>
            )}
        </View>
    );
});


const INDICATOR_COLOR = '#fcfdfd';
const UN_FILL_COLOR = '#C4C7D4';

function normalizeModel(model: XImageModel | undefined): NormalizedSource {
    if (!model) {
        return {source: undefined, isRemote: false, key: 'empty'};
    }
    if (typeof model === 'number') {
        return {source: model, isRemote: false, key: `r:${model}`};
    }
    if (typeof model === 'string') {
        const normalized = normalizeUriString(model);
        return {source: {uri: normalized.uri}, isRemote: normalized.isRemote, key: `u:${normalized.uri}`};
    }
    // object with uri
    // @ts-ignore
    const uri = model?.uri ?? '';
    const normalized = normalizeUriString(uri);
    const source = normalized.uri === uri ? (model as Source) : ({...(model as any), uri: normalized.uri} as Source);
    return {source, isRemote: normalized.isRemote, key: `u:${normalized.uri}`};
}

function normalizeUriString(raw: string): {uri: string; isRemote: boolean} {
    const uri = (raw ?? '').trim();
    if (!uri) {
        return {uri: '', isRemote: false};
    }
    if (isPackagerAssetUrl(uri)) {
        return {uri, isRemote: false};
    }
    if (/^https?:\/\//i.test(uri)) {
        return {uri, isRemote: true};
    }
    if (
        uri.startsWith('file://') ||
        uri.startsWith('content://') ||
        uri.startsWith('assets-library://') ||
        uri.startsWith('ph://') ||
        uri.startsWith('data:')
    ) {
        return {uri, isRemote: false};
    }
    if (uri.startsWith('/')) {
        return {uri: `file://${uri}`, isRemote: false};
    }
    return {uri, isRemote: false};
}

function isPackagerAssetUrl(uri: string): boolean {
    // Metro dev server assets: http://<host>:8081/assets/...png?platform=ios&hash=...
    if (!/^https?:\/\//i.test(uri)) {
        return false;
    }
    if (uri.indexOf('/assets/') === -1) {
        return false;
    }
    return uri.includes('platform=');
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    progressContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Circle handles its own layout
});

export default XImage;

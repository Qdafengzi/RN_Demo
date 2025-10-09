import {Alert, Button, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import type {Asset, ImageLibraryOptions, ImagePickerResponse} from 'react-native-image-picker';
import React, {useCallback, useRef, useState} from 'react';
import axios, {AxiosError} from 'axios';
import { uuidv7 } from 'uuidv7';

const axiosClient = axios.create({
    baseURL: 'https://dev.graphql.gemlightbox.com/chunks_upload',
    timeout: 300000,
    headers: {
        'X-Custom-Header': 'chunks_upload',
        Authorization: '',
    },
});

const FileUploadDemo: React.FC = () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjc4LCJhdWQiOiIxMjM0IiwiZGlkIjoiNWRmOTllZjc1ZTIzYWU4YSIsImV4cCI6MTc2MDA4NTMxMiwiaWF0IjoxNzU5OTkxNzExLCJzdWIiOiI3OCJ9.9HiITQo3qgWqVv-ArFnFhy5AQwXalfc8RFB2LHP-MpM'
    axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;




    const selectedAsset = useRef<Asset | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const filePicker = useCallback(() => {
        const options: ImageLibraryOptions = {
            mediaType: 'mixed',
            includeBase64: false,
            selectionLimit: 9,
            videoQuality: 'high',
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            console.log('🌏🌏🌏 Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled the picker');
            } else if (response.errorMessage || response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage ?? response.errorCode);
                Alert.alert('选择失败', response.errorMessage ?? response.errorCode ?? '未知错误');
            } else if (!response.assets || response.assets.length === 0) {
                console.log('No assets found');
                Alert.alert('选择失败', '没有选中的文件');
            } else {
                const asset = response.assets[0];
                selectedAsset.current = asset;
                setUploadProgress(0);
                console.log('ImagePicker Response: ', asset);
            }
        });
    }, []);

    const uploadFile = useCallback(async () => {
        const asset = selectedAsset.current;
        if (!asset?.uri) {
            Alert.alert('提示', '请先选择要上传的文件');
            return;
        }

        const formData = new FormData();
        formData.append(
            'file',
            {
                uri: asset.uri,
                name: asset.fileName ?? `upload-${Date.now()}`,
                type: asset.type ?? 'application/octet-stream',
            } as unknown as Blob,
        );

        formData.append('fileGuid', uuidv7());
        formData.append('index', 0);
        formData.append('totalChunks', 1);
        formData.append('fileSize', asset.fileSize);

        try {
            setIsUploading(true);
            setUploadProgress(0);

            const response = await axiosClient.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    const total = progressEvent.total ?? progressEvent.loaded ?? 0;
                    if (!total) {
                        return;
                    }
                    const percent = Math.round((progressEvent.loaded / total) * 100);
                    setUploadProgress(percent);
                    console.log(`上传进度: ${percent}%`);
                },
            });

            console.log('Upload success:', response.data);
            Alert.alert('上传成功', '文件上传完成');
        } catch (error) {
            const err = error as AxiosError;
            const message = err.response?.data
                ? JSON.stringify(err.response.data)
                : err.message ?? '上传失败';
            console.warn('Upload failed:', message, error);
            Alert.alert('上传失败', message);
        } finally {
            setIsUploading(false);
        }
    }, []);

    return (
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Button title={'file Picker'} onPress={filePicker}/>

            <View style={{height:50}}/>
            <Button  title={'uploadFile'} onPress={uploadFile} disabled={isUploading}/>
            <View style={{height:20}}/>
            <Text>{isUploading ? `上传中：${uploadProgress}%` : `当前进度：${uploadProgress}%`}</Text>
        </View>
    );
};

export default FileUploadDemo;

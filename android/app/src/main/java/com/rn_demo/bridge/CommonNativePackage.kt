package com.rn_demo.bridge

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CommonNativePackage : ReactPackage {
    // 返回需要暴露给React Native的模块列表
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(CommonNativeModule(reactContext))
    }

    // 如果没有自定义的ViewManager，可以返回空列表
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
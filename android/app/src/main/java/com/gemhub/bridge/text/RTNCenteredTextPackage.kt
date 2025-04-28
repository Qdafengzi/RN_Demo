package com.gemhub.bridge.text

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class RTNCenteredTextPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return RTNCenteredTextManager() // 这个包只包含 ViewManager，没有 NativeModule
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: Map<String, ReactModuleInfo> = HashMap()
            moduleInfos
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
        viewManagers.add(RTNCenteredTextManager())
        return viewManagers
    }
}
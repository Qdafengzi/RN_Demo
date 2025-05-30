package com.rn_demo.bridge.text

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class RTNCenteredTextPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return RTNCenteredTextManager(reactContext) // 这个包只包含 ViewManager，没有 NativeModule
    }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            RTNCenteredTextManager.NAME to ReactModuleInfo(
                name = RTNCenteredTextManager.NAME,
                className = RTNCenteredTextManager.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true,
            )
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(RTNCenteredTextManager(reactContext))
    }
}
package com.gemhub.bridge.slider

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class RTNSliderPackage : BaseReactPackage() {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(RTNSliderManager())
    }

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return RTNSliderManager()
    }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            RTNSliderView.NAME to ReactModuleInfo(
                name = RTNSliderView.NAME,
                className = RTNSliderView.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true,
            )
        )
    }

}
package com.gemhub.bridge.pulltorefresh

import android.util.Log
import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class ReactPullToRefreshPackage : BaseReactPackage() {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(ReactPullToRefreshManager())
    }

    override fun getModule(name: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
        return ReactPullToRefreshManager()
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        mapOf(
            ReactPullToRefreshManager.NAME to ReactModuleInfo(
            name = ReactPullToRefreshManager.NAME,
            className = ReactPullToRefreshManager.NAME,
            canOverrideExistingModule = false,
            needsEagerInit = false,
            isCxxModule = false,
            isTurboModule = true,
        )
        )
    }
}
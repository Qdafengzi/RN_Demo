package com.rn_demo.bridge.pulltorefresh.header

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import com.rn_demo.bridge.pulltorefresh.ReactPullToRefreshManager

class ReactPullToRefreshHeaderPackage : BaseReactPackage() {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(ReactPullToRefreshHeaderManager())
    }

    override fun getModule(name: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
        return ReactPullToRefreshHeaderManager()
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        mapOf(
            ReactPullToRefreshHeaderManager.NAME to ReactModuleInfo(
            name = ReactPullToRefreshHeaderManager.NAME,
            className = ReactPullToRefreshHeaderManager.NAME,
            canOverrideExistingModule = false,
            needsEagerInit = false,
            isCxxModule = false,
            isTurboModule = true,
        ))
    }
}
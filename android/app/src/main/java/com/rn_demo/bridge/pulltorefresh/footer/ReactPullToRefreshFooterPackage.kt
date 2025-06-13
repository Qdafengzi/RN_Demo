package com.rn_demo.bridge.pulltorefresh.footer

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class ReactPullToRefreshFooterPackage : BaseReactPackage() {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(ReactPullToRefreshFooterManager())
    }

    override fun getModule(name: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
        return ReactPullToRefreshFooterManager()
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        mapOf(
            ReactPullToRefreshFooterManager.NAME to ReactModuleInfo(
            name = ReactPullToRefreshFooterManager.NAME,
            className = ReactPullToRefreshFooterManager.NAME,
            canOverrideExistingModule = false,
            needsEagerInit = false,
            isCxxModule = false,
            isTurboModule = true,
        ))
    }
}
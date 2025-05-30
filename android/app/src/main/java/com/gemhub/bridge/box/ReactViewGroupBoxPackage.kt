package com.gemhub.bridge.box

import android.util.Log
import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class ReactViewGroupBoxPackage : BaseReactPackage() {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(RTNViewGroupManager())
    }

    override fun getModule(name: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
        Log.d("ssss","-------------"+name)
        return RTNViewGroupManager()
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        mapOf(
            RTNViewGroupManager.NAME to ReactModuleInfo(
            name = RTNViewGroupManager.NAME,
            className = RTNViewGroupManager.NAME,
            canOverrideExistingModule = false,
            needsEagerInit = false,
            isCxxModule = false,
            isTurboModule = true,
        )
        )
    }
}
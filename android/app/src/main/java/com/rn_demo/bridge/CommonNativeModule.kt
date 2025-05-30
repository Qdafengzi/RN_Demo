package com.rn_demo.bridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.turbomodule.core.interfaces.TurboModule

class CommonNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(), TurboModule {

    companion object {
        const val NAME = "CommonNativeModule"
    }

    override fun getName() = NAME



}
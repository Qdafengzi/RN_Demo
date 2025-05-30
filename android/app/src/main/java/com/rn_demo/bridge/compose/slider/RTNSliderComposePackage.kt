//package com.gemhub.bridge.compose.slider
//
//import com.facebook.react.BaseReactPackage
//import com.facebook.react.bridge.NativeModule
//import com.facebook.react.bridge.ReactApplicationContext
//import com.facebook.react.module.model.ReactModuleInfo
//import com.facebook.react.module.model.ReactModuleInfoProvider
//import com.facebook.react.uimanager.ViewManager
//import com.gemhub.bridge.slider.RTNSliderManager
//import com.gemhub.bridge.slider.RTNSliderView
//
//class RTNSliderComposePackage : BaseReactPackage() {
//    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
//        return listOf(RTNSliderComposeManager())
//    }
//
//    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
//        return RTNSliderComposeManager()
//    }
//
//    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
//        mapOf(
//            RTNSliderComposeView.NAME to ReactModuleInfo(
//                name = RTNSliderComposeView.NAME,
//                className = RTNSliderComposeView.NAME,
//                canOverrideExistingModule = false,
//                needsEagerInit = false,
//                isCxxModule = false,
//                isTurboModule = true,
//            )
//        )
//    }
//
//}
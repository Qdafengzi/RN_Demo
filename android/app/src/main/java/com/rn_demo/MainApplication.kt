package com.rn_demo

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.rn_demo.bridge.CommonNativePackage
import com.rn_demo.bridge.box.ReactViewGroupBoxPackage
import com.rn_demo.bridge.compose.slider.RTNSliderComposePackage
import com.rn_demo.bridge.pulltorefresh.ReactPullToRefreshPackage
import com.rn_demo.bridge.pulltorefresh.footer.ReactPullToRefreshFooterPackage
import com.rn_demo.bridge.pulltorefresh.header.ReactPullToRefreshHeaderPackage
import com.rn_demo.bridge.slider.RTNSliderPackage
import com.rn_demo.bridge.text.RTNCenteredTextPackage
import com.rn_demo.bridge.webview.ReactWebViewPackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
               add(RTNSliderComposePackage())
               add(RTNCenteredTextPackage())
               add(RTNSliderPackage())
               add(ReactWebViewPackage())
               add(ReactViewGroupBoxPackage())
               add(ReactPullToRefreshPackage())
               add(ReactPullToRefreshHeaderPackage())
               add(ReactPullToRefreshFooterPackage())
               add(CommonNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}

package com.rn_demo.bridge

import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.rn_demo.utils.XLogger
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch


class CommonNativeModule(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule() {

    companion object {
        const val NAME = "CommonNativeModule"
    }

    override fun getName() = NAME


    @ReactMethod
    fun sayHello(successCallback: Callback) {
        successCallback.invoke("Hello World from Android!")

        val map = Arguments.createMap()
        map.putString("msg", "恭喜你成功了")
        sendEvent("native2RN",map)


        (reactContext.currentActivity as AppCompatActivity)?.apply {
            var num = 0
            lifecycleScope.launch {
                while (true){
                    num += 1
                    delay(1)
                    val map1 = Arguments.createMap()
                    map1.putString("msg", "恭喜你成功了")
                    map1.putString("num", "恭喜你成功了 ${System.currentTimeMillis()}次")
                    sendEvent("native2RN",map1)
                    if (num>3000000){
                        return@launch
                    }
                }
            }
        }
    }

    @ReactMethod
    fun receivedData(data: ReadableMap, callback: Callback) {
        XLogger.d("Received data: ${data.toString()}")
        val userName = data.getString("userName") ?: "No username"
        val age = data.getString("age") ?: "No age"
        XLogger.d( "Username: $userName, Age: $age")
        callback.invoke("Android Data received successfully  ")
    }

    @ReactMethod
    fun rnSend2Native(data: String) {
        val result = "RN 发送到 native: $data"
        XLogger.d(result)
    }


    //必须是 WritableMap类型
    private fun sendEvent(eventName: String,map: WritableMap) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, map)

    }

}
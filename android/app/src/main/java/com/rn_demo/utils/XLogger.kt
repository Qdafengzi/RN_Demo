package com.rn_demo.utils

import android.content.Context
import android.util.Log
import android.widget.Toast
import com.rn_demo.BuildConfig

object XLogger {
    var className: String? = null
    var methodName: String? = null
    var lineNumber = 0
    val isDebuggable: Boolean
        get() = BuildConfig.DEBUG

    private fun createLog(log: String): String {
        return "$methodName($className:$lineNumber)$log"
    }

    private fun getMethodNames(sElements: Array<StackTraceElement>) {
        className = sElements[1].fileName
        methodName = sElements[1].methodName
        lineNumber = sElements[1].lineNumber
    }
    @JvmStatic
    fun e(message: String) {
        if (!isDebuggable) return

        // Throwable instance must be created before any methods
        getMethodNames(Throwable().stackTrace)
        Log.e(className, createLog(message))
    }
    @JvmStatic
    fun i(message: String) {
        if (!isDebuggable) return
        getMethodNames(Throwable().stackTrace)
        Log.i(className, createLog(message))
    }

    @JvmStatic
    fun d(message: String) {
        if (!isDebuggable) return
        getMethodNames(Throwable().stackTrace)
        Log.d(className, createLog(message))
    }
    @JvmStatic
    fun v(message: String) {
        if (!isDebuggable) return
        getMethodNames(Throwable().stackTrace)
        Log.v(className, createLog(message))
    }
    @JvmStatic
    fun w(message: String) {
        if (!isDebuggable) return
        getMethodNames(Throwable().stackTrace)
        Log.w(className, createLog(message))
    }
    @JvmStatic
    fun log(tag: String, content: String) {
        if (isDebuggable) {
            println("$tag:$content")
        }
    }

    fun toast(context: Context?, content: String?) {
        if (isDebuggable) {
            Toast.makeText(context, content, Toast.LENGTH_SHORT).show()
        }
    }

    fun longD(msg: String) {
        if (isDebuggable) {
            val maxLogSize = 3000
            for (i in 0..msg.length / maxLogSize) {
                val start = i * maxLogSize
                var end = (i + 1) * maxLogSize
                end = if (end > msg.length) msg.length else end
                Log.d(className, msg.substring(start, end))
            }
        }
    }

    fun longE(msg: String) {
        if (isDebuggable) {
            val maxLogSize = 3000
            for (i in 0..msg.length / maxLogSize) {
                val start = i * maxLogSize
                var end = (i + 1) * maxLogSize
                end = if (end > msg.length) msg.length else end
                Log.e(className, msg.substring(start, end))
            }
        }
    }
}
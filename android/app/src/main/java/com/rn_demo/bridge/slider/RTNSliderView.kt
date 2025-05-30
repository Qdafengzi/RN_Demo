package com.rn_demo.bridge.slider

import android.content.Context
import android.widget.FrameLayout
import android.widget.SeekBar
import android.widget.TextView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

class RTNSliderView(context: Context) : FrameLayout(context) {
    companion object {
        const val NAME: String = "RTNSlider"
    }

    private val seekBar: SeekBar
    private val textView: TextView
    private var min: Int = 0
    private var max: Int = 100
    private var value: Int = 0
    private var text: String? = null

    init {
        // 创建 SeekBar
        seekBar = SeekBar(context).apply {
            layoutParams = LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.WRAP_CONTENT
            )
            setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                    if (fromUser) {
                        val actualProgress = progress + min
                        emitOnProgress(actualProgress)
                    }
                }

                override fun onStartTrackingTouch(seekBar: SeekBar) {}
                override fun onStopTrackingTouch(seekBar: SeekBar) {}
            })
        }

        // 创建 TextView
        textView = TextView(context).apply {
            layoutParams = LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.WRAP_CONTENT
            )
        }

        // 添加视图
        addView(textView)
        addView(seekBar)
    }

    fun setText(text: String?) {
        this.text = text
        textView.text = text
    }

    fun setMin(min: Int) {
        this.min = min
        updateSeekBarRange()
    }

    fun setMax(max: Int) {
        this.max = max
        updateSeekBarRange()
    }

    fun setValue(value: Int) {
        this.value = value
        updateSeekBarProgress()
    }

    private fun updateSeekBarRange() {
        seekBar.max = max - min
        updateSeekBarProgress()
    }

    private fun updateSeekBarProgress() {
        val progress = value - min
        seekBar.progress = if (progress >= 0) progress else 0
    }

    private fun emitOnProgress(progress: Int) {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
        val payload = Arguments.createMap().apply {
            putInt("progress", progress)
        }
        val event = OnProgressEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }

    inner class OnProgressEvent(
        surfaceId: Int,
        viewId: Int,
        private val payload: WritableMap
    ) : Event<OnProgressEvent>(surfaceId, viewId) {
        override fun getEventName() = "onProgress"
        override fun getEventData() = payload
    }
}
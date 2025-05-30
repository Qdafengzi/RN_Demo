package com.gemhub.bridge.box

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.Gravity
import android.widget.LinearLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

class ReactViewGroupBox : LinearLayout {
    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        configureComponent()
    }


    private fun configureComponent() {
        orientation = VERTICAL
        gravity = Gravity.TOP
        emitOnScriptLoaded(OnScriptLoadedEventResult.success)
        invalidate()
        requestLayout()
        Log.d("初始化", "configureComponent---------------4");
    }

    fun emitOnScriptLoaded(result: OnScriptLoadedEventResult) {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
        val payload =
            Arguments.createMap().apply {
                putString("result", result.name)
            }
        val event = ViewGroupLoadedEvent(surfaceId, id, payload)
        Log.d("初始化", "configureComponent---------------3----1");
        eventDispatcher?.dispatchEvent(event)
    }

    enum class OnScriptLoadedEventResult {
        success,
        error;
    }

    inner class ViewGroupLoadedEvent(
        surfaceId: Int,
        viewId: Int,
        private val payload: WritableMap
    ) : Event<ViewGroupLoadedEvent>(surfaceId, viewId) {
        override fun getEventName() = "onChildLoaded"
        override fun getEventData() = payload
    }
}
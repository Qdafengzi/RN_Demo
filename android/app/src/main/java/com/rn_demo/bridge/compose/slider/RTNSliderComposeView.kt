package com.rn_demo.bridge.compose.slider

import android.content.Context
import android.util.AttributeSet
import android.widget.LinearLayout
import androidx.compose.ui.platform.ComposeView
import com.facebook.react.bridge.ReactContext
import com.rn_demo.utils.XLogger


class RTNSliderComposeView : LinearLayout {

    companion object {
        const val NAME: String = "RTNSliderCompose"
    }

    constructor(context: Context) : super(context) {
        XLogger.d("constructor---------1")
        configureComponent(context)
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        XLogger.d("constructor---------2")
        configureComponent(context)
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        XLogger.d("constructor---------3")
        configureComponent(context)
    }

    private val viewModel: ComposeViewModel = ComposeViewModel()
    private fun configureComponent(context: Context) {
        ComposeView(context).also {
            it.setContent {
                ComposeSliderView(
                    context as ReactContext,
                    id,
                    viewModel
                )
            }
            addView(it)
        }
        return
    }

    fun setText(text: String?) {
        viewModel.updateText(text)
    }

    fun setMin(min: Int) {
        viewModel.updateMin(min.toFloat())
    }

    fun setMax(max: Int) {
        viewModel.updateMax(max.toFloat())
    }

    fun setValue(value: Int) {
        viewModel.updateProgress(value.toFloat())
    }
}
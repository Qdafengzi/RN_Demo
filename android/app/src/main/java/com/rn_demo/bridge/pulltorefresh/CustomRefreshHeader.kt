package com.rn_demo.bridge.pulltorefresh

import android.annotation.SuppressLint
import android.content.Context
import android.util.AttributeSet
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import com.airbnb.lottie.compose.LottieAnimation
import com.airbnb.lottie.compose.LottieCompositionSpec
import com.airbnb.lottie.compose.LottieConstants
import com.airbnb.lottie.compose.animateLottieCompositionAsState
import com.airbnb.lottie.compose.rememberLottieComposition
import com.rn_demo.R
import com.scwang.smart.refresh.layout.api.RefreshHeader
import com.scwang.smart.refresh.layout.api.RefreshKernel
import com.scwang.smart.refresh.layout.api.RefreshLayout
import com.scwang.smart.refresh.layout.constant.RefreshState
import com.scwang.smart.refresh.layout.constant.SpinnerStyle




class CustomHeaderViewModel :ViewModel(){
    var text  by mutableStateOf("下拉刷新中")
}

class CustomRefreshHeader : LinearLayout, RefreshHeader {

    private val mViewModel  by lazy {
        CustomHeaderViewModel()
    }



    constructor(context: Context) : super(context) {
        configureComponent()
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        configureComponent()
    }

    private fun configureComponent() {
        removeAllViews()
        val composeView = ComposeView(context)
        gravity = Gravity.CENTER_HORIZONTAL
        addView(composeView, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        composeView.setContent {


            val composition by rememberLottieComposition(LottieCompositionSpec.RawRes(R.raw.loading2))
            val progress by animateLottieCompositionAsState(
                composition,
                iterations = LottieConstants.IterateForever
            )
            Column(modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
//                .background(color = Color.Yellow)
                ,
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                LottieAnimation(
                    composition = composition,
                    progress = { progress },
                    modifier = Modifier
                        .size(60.dp, 60.dp)
//                        .background(color = Color.Magenta)
                    ,
                )
                Text(
                    text = mViewModel.text,
                    color = Color.Black,
                    modifier = Modifier
//                        .background(color = Color.Cyan)
                )
            }
        }
//        minimumHeight = ResUtils.dp2px(context, 100f)
    }

    @SuppressLint("RestrictedApi")
    override fun onStateChanged(refreshLayout: RefreshLayout,
        oldState: RefreshState,
        newState: RefreshState) {
        when (newState) {
            RefreshState.None -> {}
            RefreshState.PullDownToRefresh -> {
                mViewModel.text = "下拉开始刷新"
            }

            RefreshState.PullUpToLoad -> {}
            RefreshState.PullDownCanceled -> {}
            RefreshState.PullUpCanceled -> {}
            RefreshState.ReleaseToRefresh -> {
                mViewModel.text = "释放立即刷新"
            }
            RefreshState.ReleaseToLoad -> {}
            RefreshState.ReleaseToTwoLevel -> {}
            RefreshState.TwoLevelReleased -> {}
            RefreshState.RefreshReleased -> {}
            RefreshState.LoadReleased -> {}
            RefreshState.Refreshing -> {
                mViewModel.text = "正在刷新"
            }
            RefreshState.Loading -> {}
            RefreshState.TwoLevel -> {}
            RefreshState.RefreshFinish -> {}
            RefreshState.LoadFinish -> {}
            RefreshState.TwoLevelFinish -> {}
        }
    }


    override fun getView(): View {
        return this
    }

    override fun getSpinnerStyle(): SpinnerStyle = SpinnerStyle.Translate

    @SuppressLint("RestrictedApi")
    override fun setPrimaryColors(vararg colors: Int) {

    }

    @SuppressLint("RestrictedApi")
    override fun onInitialized(kernel: RefreshKernel, height: Int, maxDragHeight: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun onMoving(isDragging: Boolean,
        percent: Float,
        offset: Int,
        height: Int,
        maxDragHeight: Int) {

    }

    @SuppressLint("RestrictedApi")
    override fun onReleased(refreshLayout: RefreshLayout, height: Int, maxDragHeight: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun onStartAnimator(refreshLayout: RefreshLayout, height: Int, maxDragHeight: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun onFinish(refreshLayout: RefreshLayout, success: Boolean): Int {
        return 500
    }

    @SuppressLint("RestrictedApi")
    override fun onHorizontalDrag(percentX: Float, offsetX: Int, offsetMax: Int) {
    }

    @SuppressLint("RestrictedApi")
    override fun isSupportHorizontalDrag(): Boolean {
        return false
    }

    @SuppressLint("RestrictedApi")
    override fun autoOpen(duration: Int, dragRate: Float, animationOnly: Boolean): Boolean {
        return true
    }


}
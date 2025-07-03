package com.rn_demo.bridge.compose.slider

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.Drawable
import androidx.core.content.ContextCompat
import androidx.core.graphics.createBitmap
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RTNSliderComposeManagerDelegate
import com.facebook.react.viewmanagers.RTNSliderComposeManagerInterface
import com.facebook.react.views.imagehelper.ResourceDrawableIdHelper
import com.rn_demo.utils.XLogger
import com.rn_demo.utils.toJSON

@ReactModule(name = RTNSliderComposeManager.NAME)
class RTNSliderComposeManager : SimpleViewManager<RTNSliderComposeView>(), RTNSliderComposeManagerInterface<RTNSliderComposeView> {
    companion object {
        const val NAME = "RTNSliderCompose"
    }

    private val mDelegate: ViewManagerDelegate<RTNSliderComposeView> = RTNSliderComposeManagerDelegate(this)

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): RTNSliderComposeView {
        return RTNSliderComposeView(reactContext)
    }

    override fun getDelegate(): ViewManagerDelegate<RTNSliderComposeView> = mDelegate

    @ReactProp(name = "text")
    override fun setText(view: RTNSliderComposeView, text: String?) {
        view.setText(text)
    }

    @ReactProp(name = "min")
    override fun setMin(view: RTNSliderComposeView, min: Int) {
        view.setMin(min)
    }

    @ReactProp(name = "max")
    override fun setMax(view: RTNSliderComposeView, max: Int) {
        view.setMax(max)
    }

    @ReactProp(name = "value")
    override fun setValue(view: RTNSliderComposeView, value: Int) {
        view.setValue(value)
    }


    // public FastImageSource(Context context, String source, double width, double height, @Nullable Headers headers) {
    //        ImageSource imageSource = new ImageSource(context, source, width, height);
    //        mSource = imageSource.getSource();
    //        mHeaders = headers == null ? Headers.DEFAULT : headers;
    //        mUri = imageSource.getUri();
    //
    //        if (isResource() && TextUtils.isEmpty(mUri.toString())) {
    //            throw new Resources.NotFoundException("Local Resource Not Found. Resource: '" + getSource() + "'.");
    //        }
    //
    //        if (isLocalResourceUri(mUri)) {
    //            // Convert res:/ scheme to android.resource:// so
    //            // glide can understand the uri.
    //            mUri = Uri.parse(mUri.toString().replace("res:/", ANDROID_RESOURCE_SCHEME + "://" + context.getPackageName() + "/"));
    //        }
    //    }
    @ReactProp(name = "thumb")
    override fun setThumb(view: RTNSliderComposeView, value: ReadableMap?) {
        XLogger.d("数据:${value.toJSON()}")
        val uri= value?.getString("uri")
        XLogger.d("数据:${uri}")

        ResourceDrawableIdHelper.instance.getResourceDrawable(
            context = view.context,
            uri
        )?.also {
            XLogger.d("数据 转bitmap")
            view.setThumb(getBitmapFromImage(drawable =it))
        }

        view.setThumbUri(uri?:"")



    }


    private fun getBitmapFromImage(drawable: Drawable): Bitmap {

        // on below line we are getting drawable

        // in below line we are creating our bitmap and initializing it.
        val bit = createBitmap(drawable!!.intrinsicWidth, drawable.intrinsicHeight)

        // on below line we are
        // creating a variable for canvas.
        val canvas = android.graphics.Canvas(bit)

        // on below line we are setting bounds for our bitmap.
        drawable.setBounds(0, 0, canvas.width, canvas.height)

        // on below line we are simply
        // calling draw to draw our canvas.
        drawable.draw(canvas)

        // on below line we are
        // returning our bitmap.
        return bit
    }
}
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    id("com.facebook.react")
}

react {
    autolinkLibrariesWithApp()
}

val enableProguardInReleaseBuilds = false
val jscFlavor = "io.github.react-native-community:jsc-android:2026004.+"


android {
    ndkVersion = libs.versions.ndkVersion.get()
    compileSdk = libs.versions.compile.sdk.get().toInt()
    namespace = "com.rn_demo"

    defaultConfig {
        applicationId = "com.rn_demo"
        minSdk = libs.versions.min.sdk.get().toInt()
        targetSdk = libs.versions.targetSdk.get().toInt()
        versionCode = 1
        versionName = "1.0"
    }

    signingConfigs {
        create("release") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }

        getByName("debug") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }


    }

    buildTypes {
        getByName("debug") {
            signingConfig = signingConfigs.getByName("debug")
        }
        getByName("release") {
            signingConfig = signingConfigs.getByName("debug")
            isMinifyEnabled = enableProguardInReleaseBuilds
            proguardFiles(
                getDefaultProguardFile("proguard-android.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlin {
        compilerOptions {
            jvmTarget = JvmTarget.JVM_17
        }
    }
    buildFeatures {
        compose = true
        dataBinding = true
    }
}

dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")

    if ((rootProject.extra["hermesEnabled"] as String).toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation(jscFlavor)
    }


    debugImplementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.material)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.foundation)
    implementation(libs.androidx.compose.ui.tooling.preview)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
    debugImplementation(libs.androidx.compose.ui.test.junit4)
    implementation("androidx.compose.material:material-icons-extended:1.7.8")
    // Optional - Add window size utils
    implementation("androidx.compose.material3.adaptive:adaptive:1.1.0")

    implementation(libs.lottie.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)



    implementation("io.github.scwang90:refresh-layout-kernel:3.0.0-alpha")      //核心必须依赖
    implementation("io.github.scwang90:refresh-header-classics:3.0.0-alpha")    //经典刷新头
    implementation("io.github.scwang90:refresh-header-radar:3.0.0-alpha")       //雷达刷新头
    implementation("io.github.scwang90:refresh-header-falsify:3.0.0-alpha")     //虚拟刷新头
    implementation("io.github.scwang90:refresh-header-material:3.0.0-alpha")    //谷歌刷新头
    implementation("io.github.scwang90:refresh-header-two-level:3.0.0-alpha")   //二级刷新头
    implementation("io.github.scwang90:refresh-footer-ball:3.0.0-alpha")        //球脉冲加载
    implementation("io.github.scwang90:refresh-footer-classics:3.0.0-alpha")    //经典加载

    implementation("com.airbnb.android:lottie:6.6.7")
    implementation("com.google.code.gson:gson:2.13.1")
    implementation("com.github.bumptech.glide:compose:1.0.0-beta01")
}
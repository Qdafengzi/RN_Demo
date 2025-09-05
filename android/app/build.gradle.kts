plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.facebook.react")
//    id("org.jetbrains.kotlin.plugin.compose")
}

react {
    autolinkLibrariesWithApp()
}

val enableProguardInReleaseBuilds = false
val jscFlavor = "org.webkit:android-jsc:+"

android {
    ndkVersion = rootProject.extra["ndkVersion"] as String
    compileSdk = rootProject.extra["compileSdkVersion"] as Int
    namespace = "com.rn_demo"

    defaultConfig {
        applicationId = "com.rn_demo"
        minSdk = rootProject.extra["minSdkVersion"] as Int
        targetSdk = rootProject.extra["targetSdkVersion"] as Int
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

    buildFeatures {
        compose = true
        dataBinding = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.15"
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

    val composeBom = platform("androidx.compose:compose-bom:2025.06.01")
    implementation(composeBom)
    androidTestImplementation(composeBom)

    // Choose one of the following:
    // Material Design 3
    implementation("androidx.compose.material3:material3")
    // or Material Design 2
    implementation("androidx.compose.material:material")
    // or skip Material Design and build directly on top of foundational components
    implementation("androidx.compose.foundation:foundation")
    // or only import the main APIs for the underlying toolkit systems,
    // such as input and measurement/layout
    implementation("androidx.compose.ui:ui")

    // Android Studio Preview support
    implementation("androidx.compose.ui:ui-tooling-preview")
    debugImplementation("androidx.compose.ui:ui-tooling")

    // UI Tests
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    implementation("androidx.compose.material:material-icons-extended")
    // Optional - Add window size utils
    implementation("androidx.compose.material3.adaptive:adaptive")

    // Optional - Integration with activities
    implementation("androidx.activity:activity-compose:1.10.1")
    implementation("com.airbnb.android:lottie-compose:6.6.7")
    // Optional - Integration with ViewModels
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.9.1")

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
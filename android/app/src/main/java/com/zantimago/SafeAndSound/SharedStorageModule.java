package com.zantimago.SafeAndSound;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;

public class SharedStorageModule extends ReactContextBaseJavaModule {

    private static final String SHARED_PREFS_NAME = "com.zantimago.SafeAndSound.PREFERENCES";
    public static final String NAME = "SharedStorageModule";

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    public SharedStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public void saveButtonData(String data, Callback successCallback){
        try {
            SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString("data", data);
            editor.apply();
            successCallback.invoke("Phone number saved successfully.");
        } catch (Exception e) {
            Log.e("SharedStorageModule - saveButtonData", e.getMessage());
        }
    }
}

package com.zantimago.SafeAndSound;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.module.annotations.ReactModuleList;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;
import com.reactnativecommunity.asyncstorage.AsyncStorageModule;
import com.reactnativecommunity.asyncstorage.BuildConfig;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ReactModuleList(
        nativeModules = {
                SharedStorageModule.class,
        }
)
public class SharedStoragePackage extends TurboReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        try {
            Class<?> reactModuleInfoProviderClass =
                    Class.forName("com.zantimago.SafeAndSound.SharedStoragePackage$$ReactModuleInfoProvider");
            return (ReactModuleInfoProvider) reactModuleInfoProviderClass.newInstance();
        } catch (ClassNotFoundException e) {
            // ReactModuleSpecProcessor does not run at build-time. Create this ReactModuleInfoProvider by
            // hand.
            return new ReactModuleInfoProvider() {
                @Override
                public Map<String, ReactModuleInfo> getReactModuleInfos() {
                    final Map<String, ReactModuleInfo> reactModuleInfoMap = new HashMap<>();
                    boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;

                    Class<? extends NativeModule>[] moduleList =
                            new Class[] {
                                    SharedStorageModule.class,
                            };

                    for (Class<? extends NativeModule> moduleClass : moduleList) {
                        ReactModule reactModule = moduleClass.getAnnotation(ReactModule.class);

                        reactModuleInfoMap.put(
                                reactModule.name(),
                                new ReactModuleInfo(
                                        reactModule.name(),
                                        moduleClass.getName(),
                                        reactModule.canOverrideExistingModule(),
                                        reactModule.needsEagerInit(),
                                        reactModule.hasConstants(),
                                        reactModule.isCxxModule(),
                                        isTurboModule));
                    }

                    return reactModuleInfoMap;
                }
            };
        } catch (InstantiationException | IllegalAccessException e) {
            throw new RuntimeException(
                    "No ReactModuleInfoProvider for com.zantimago.SafeAndSound.SharedStoragePackage$$ReactModuleInfoProvider", e);
        }
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SharedStorageModule(reactContext));
        return modules;
    }

    @Nullable
    @Override
    public NativeModule getModule(@NonNull String s, @NonNull ReactApplicationContext reactApplicationContext) {
        switch (s) {
            case SharedStorageModule.NAME:
                return new AsyncStorageModule(reactApplicationContext);
            default:
                return null;
        }
    }

}
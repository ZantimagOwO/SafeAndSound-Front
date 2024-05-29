package com.zantimago.SafeAndSound;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public class AsyncStorageReader {

    public static String TAG = "RNAsyncStorage";
    public Context context;
    public HashMap<String, String> data;

    Cursor catalystLocalStorage = null;
    SQLiteDatabase readableDatabase = null;

    public AsyncStorageReader (Context context) {
        this.context = context;
        data = new HashMap<>();
        this.fetch();
    }

    public void fetch() {
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();
            catalystLocalStorage = readableDatabase.query("catalystLocalStorage", new String[]{"key", "value"}, null, null, null, null, null);

            if (catalystLocalStorage.moveToFirst()) {
                do {
                    try {
                        // one row with all AsyncStorage: { "user": { ... }, ... }
                        @SuppressLint("Range") String key = catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("key"));
                        @SuppressLint("Range") String value = catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"));

                        data.put(key, value);
                    } catch(Exception e) {
                        Log.e("AsyncStorageReader - fetch()", e.getMessage());
                    }
                } while(catalystLocalStorage.moveToNext());
            }
        } finally {
            if (catalystLocalStorage != null) {
                catalystLocalStorage.close();
            }

            if (readableDatabase != null) {
                readableDatabase.close();
            }
        }
    }

    public String getDataString(){
        return data.toString();
    }

    public HashMap<String, String> getData() {
        return data;
    }

    public void setData(HashMap data) {
        this.data = data;
    }

    public JSONObject get(String key){
        try {
            return new JSONObject(data.get(key));
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    public JSONArray getAsArray(String key){
        try {
            return new JSONArray(key);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}

package com.zantimago.SafeAndSound;

import android.Manifest;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.util.Log;
import android.widget.RemoteViews;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.ReactMethod;
import com.reactnativecommunity.asyncstorage.ReactDatabaseSupplier;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;

public class Widget1 extends AppWidgetProvider {

    private static final String ACTION_CALL = "com.zantimago.SafeAndSound.ACTION_CALL";
    private static final String SHARED_PREFS_NAME = "com.zantimago.SafeAndSound.PREFERENCES";
    private static final String BUTTON_DATA = "button_data";

    private static ButtonData button = new ButtonData();

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        loadDatabase(context);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget1);
        views.setTextViewText(R.id.appwidget_text, button.getText());

        // Set up the intent that starts the Phone Call
        Intent intent = new Intent(context, Widget1.class);
        intent.setAction(ACTION_CALL);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, appWidgetId, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        // Register the onClickListener with the PendingIntent
        views.setOnClickPendingIntent(R.id.widget_container, pendingIntent);

        Log.i("updateAppWidget", views.toString());

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {

        Log.i("onUpdate", Arrays.toString(appWidgetIds));

        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        Log.i("onReceive", intent.toString());

        if (ACTION_CALL.equals(intent.getAction())) {
            Intent callIntent = new Intent(context, CallActivity.class);
            callIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(callIntent);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    public static void loadDatabase(Context context){

        AsyncStorageReader as = new AsyncStorageReader(context);

        Log.i("AsyncStorage: ", as.getDataString());

        JSONArray btnJSON = as.getAsArray("buttons");

        Log.i("Buttons:", btnJSON.toString());

    }
}

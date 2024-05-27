package com.zantimago.SafeAndSound;

import android.Manifest;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.RemoteViews;
import androidx.core.app.ActivityCompat;

import java.util.Arrays;

public class Widget1 extends AppWidgetProvider {

    private static final String ACTION_CALL = "com.zantimago.SafeAndSound.ACTION_CALL";

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        CharSequence widgetText = context.getString(R.string.appwidget_text);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget1);
        views.setTextViewText(R.id.appwidget_text, widgetText);

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
            Log.i("onReceive", "Entrando en ACTION_CALL...");
            String phoneNumber = "111-333-222-4";
            Intent callIntent = new Intent(Intent.ACTION_CALL);
            callIntent.setData(Uri.parse("tel:" + phoneNumber));
            callIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            Log.i("onReceive", "Intent: " + callIntent);
            if (ActivityCompat.checkSelfPermission(context, android.Manifest.permission.CALL_PHONE) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                Log.i("onReceive", "Permisos concedidos...");
                context.getApplicationContext().startActivity(callIntent);
            } else {
                // Handle the case where the permission is not granted
                // You may want to request the permission here
                Log.e("onReceive", "FALTAN PERMISOS PARA REALIZAR LA LLAMADA!");
                //ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CALL_PHONE}, 1);
            }
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
}

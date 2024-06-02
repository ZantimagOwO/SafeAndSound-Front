package com.zantimago.SafeAndSound;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;

import androidx.appcompat.content.res.AppCompatResources;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;

public class Widget1 extends AppWidgetProvider {

    private static final String ACTION_CALL = "com.zantimago.SafeAndSound.ACTION_CALL";

    private static ButtonData button = new ButtonData();

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        try {
            loadDatabase(context);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget1);
        views.setTextViewText(R.id.appwidget_text, "S&S");

        // Set up the intent that starts the Phone Call
        Intent intent = new Intent(context, Widget1.class);
        intent.setAction(ACTION_CALL);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, appWidgetId, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        int drawableId = getResource(button.getColor());

        // Register the onClickListener with the PendingIntent
        views.setInt(R.id.widget_container, "setBackgroundResource", drawableId);
        views.setOnClickPendingIntent(R.id.widget_container, pendingIntent);

        Log.i("updateAppWidget", views.toString());

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
            try {
                callIntent.putExtra("buttonData", button.toJSON().toString());
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
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

    public static void loadDatabase(Context context) throws JSONException {

        AsyncStorageReader as = new AsyncStorageReader(context);

        JSONArray btnsJSON = as.getAsArray("buttons");

        JSONObject btn = (JSONObject) btnsJSON.get(0);

        Log.i("Button:", btn.toString());

        button = ButtonData.parseJSONFromRN(btn);

        JSONObject user = as.get("user");

        Log.i("User", user.toString());

        JSONArray ailmentsJSON = user.getJSONArray("Ailments");

        JSONObject ailment;
        for (int i = 0; i < ailmentsJSON.length(); i++) {
            ailment = ailmentsJSON.getJSONObject(i);
            button.getAilments().add(ailment.getString("Ailment"));
        }

        Log.i("Ailments", button.getAilments().toString());

        JSONArray alergiesJSON = user.getJSONArray("Alergies");

        JSONObject alergy;
        for (int i = 0; i < alergiesJSON.length(); i++) {
            alergy = alergiesJSON.getJSONObject(i);
            button.getAlergies().add(alergy.getString("Alergy"));
        }

        Log.i("Alergies", button.getAlergies().toString());

        JSONObject bloodType = user.getJSONObject("Blood_Type");

        boolean rh = bloodType.getBoolean("RH");

        String blood = (rh)? "+": "-";

        blood = blood + bloodType.getString("Blood_Group");

        button.setBloodGroup(blood);

        if(!user.isNull("Diabetes")){
            int diabetes = user.getInt("Diabetes");
            if(diabetes != 4){
                button.setDiabetes(user.getString("Diabetes"));
            } else {
                button.setDiabetes("");
            }
        }

        Log.i("ButtonData", button.toJSON().toString());
    }

    public static int getResource(String color){
        switch (color){
            case "#BF392B":
                return R.drawable.app_widget_background;
            case "#DC6154":
                return R.drawable.app_widget_background_orange;
            case "#9B59B6":
                return R.drawable.app_widget_background_purple;
            case "#A23BCD":
                return R.drawable.app_widget_background_dark_purple;
            case "#2A80B9":
                return R.drawable.app_widget_background_blue;
            case "#F1C40E":
                return R.drawable.app_widget_background_yellow;
            case "#3FCC71":
                return R.drawable.app_widget_background_green;
            case "#34AE60":
                return R.drawable.app_widget_background_light_green;
            case "#31A084":
                return R.drawable.app_widget_background_teal;
            case "#3498DB":
                return R.drawable.app_widget_background_light_blue;
            case "#F39C13":
                return R.drawable.app_widget_background_orange_dark;
            case "#D35400":
                return R.drawable.app_widget_background_dark_orange;
            case "#95A5A6":
                return R.drawable.app_widget_background_grey;
            case "#34495E":
                return R.drawable.app_widget_background_dark_grey;
            case "#000000":
                return R.drawable.app_widget_background_black;
            case "#68C699":
                return R.drawable.app_widget_background_safe_and_sound;
            default:
                return R.drawable.app_widget_background; // Default color
        }

    }
}

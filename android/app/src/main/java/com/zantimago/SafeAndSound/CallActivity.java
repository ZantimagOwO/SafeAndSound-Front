package com.zantimago.SafeAndSound;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.net.Uri;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class CallActivity extends AppCompatActivity {

    private static final int REQUEST_CALL_PHONE = 1;
    private static final int REQUEST_SEND_SMS = 2;
    private static final int REQUEST_GPS = 3;
    private ButtonData buttonData;

    private FusedLocationProviderClient fusedLocationClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.i("CallActivity - onCreate", "Entrando");

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        try {
            JSONObject btnJSON = new JSONObject(getIntent().getStringExtra("buttonData"));
            buttonData = ButtonData.parseJSON(btnJSON);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        getPermissions();
        makePhoneCall();
    }

    private void makePhoneCall() {

        Log.i("CallActivity - makePhoneCall", "Entrando");
        Intent callIntent = new Intent(Intent.ACTION_CALL);
        callIntent.setData(Uri.parse("tel:" + buttonData.getPhoneNumber()));
        Log.i("CallActivity - makePhoneCall", "Se tienen permisos, haciendo mandando mensajes y llamando...");
        sendSMS();
        startActivity(callIntent);
        finish(); // Cierra la actividad después de iniciar la llamada

    }

    @SuppressLint("MissingPermission")
    private void sendSMS() {
        Log.i("sendSMS", "Entrando...");

        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, buttonData.getPhoneNumberMsg(), null, null);

        for(String tel: buttonData.getProtectores()){
            smsManager.sendTextMessage(tel, null, buttonData.getProtectorsMsg(), null, null);
        }
    }

    private void getPermissions(){
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CALL_PHONE}, REQUEST_CALL_PHONE);
        }

        if(ActivityCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.SEND_SMS}, REQUEST_SEND_SMS);
        }

        if(ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, REQUEST_GPS);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.i("CallActivity - onRequestPermissionsResult", "Entrando");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch(requestCode) {
            case REQUEST_CALL_PHONE:
            case REQUEST_SEND_SMS:
            case REQUEST_GPS:
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    makePhoneCall();
                } else {
                    Toast.makeText(getApplicationContext(),
                            "LLAMADA CANCELADA POR FALTA DE PERMISOS", Toast.LENGTH_LONG).show();
                    finish();
                }
        }
    }


}

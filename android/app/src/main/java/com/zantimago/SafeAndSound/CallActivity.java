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
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

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

        try {
            getPermissions();
            makePhoneCall();
        } catch(Exception e){
            Log.e("CallActivity", e.getMessage());
        }

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

        getLastLocationMsg();

        String medMsg = "Soy del grupo sanguíneo " + buttonData.getBloodGroup();

        String diabetesMgs = null;
        if(!buttonData.getDiabetes().isEmpty()){
            String diab = buttonData.getDiabetes().equals("3")? "gestacional" : buttonData.getDiabetes();
            diabetesMgs = "Tengo diabetes de tipo " + diab;
        }

        String alergiesMsg = null;
        String alergiesStr = buttonData.getAlergies().toString();
        if(!alergiesStr.equals("[]")){
            alergiesMsg = "Tengo estas alergias: " + alergiesStr.substring(1, alergiesStr.length()-1);
        }

        String ailmentsMsg = null;
        String ailmentsStr = buttonData.getAilments().toString();
        if(!ailmentsStr.equals("[]")){
            ailmentsMsg = "Tengo estas enfermedades: " + ailmentsStr.substring(1, ailmentsStr.length() - 1);
        }

        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, buttonData.getPhoneNumberMsg(), null, null);
        smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, medMsg, null, null);


        if(diabetesMgs != null){
            smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, diabetesMgs, null, null);
        }

        if(alergiesMsg != null){
            smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, alergiesMsg, null, null);
        }

        if(ailmentsMsg != null){
            smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, ailmentsMsg, null, null);
        }


        for(String tel: buttonData.getProtectores()){
            smsManager.sendTextMessage(tel, null, buttonData.getProtectorsMsg(), null, null);
            smsManager.sendTextMessage(tel, null, medMsg, null, null);

            if(diabetesMgs != null){
                smsManager.sendTextMessage(tel, null, diabetesMgs, null, null);
            }

            if(alergiesMsg != null){
                smsManager.sendTextMessage(tel, null, alergiesMsg, null, null);
            }

            if(ailmentsMsg != null){
                smsManager.sendTextMessage(tel, null, ailmentsMsg, null, null);
            }

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

        if(ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQUEST_GPS);
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

    @SuppressLint("MissingPermission")
    private void getLastLocationMsg() {
        fusedLocationClient.getLastLocation()
                .addOnCompleteListener(this, new OnCompleteListener<Location>() {
                    @Override
                    public void onComplete(@NonNull Task<Location> task) {
                        if (task.isSuccessful() && task.getResult() != null) {
                            Location location = task.getResult();
                            double latitude = location.getLatitude();
                            double longitude = location.getLongitude();
                            double altitude = location.getAltitude();

                            Log.d("Location", "Latitud: " + latitude + ", Longitud: " + longitude + ", Altitud: " + altitude);

                            String locMsg = "Esta es mi localización: www.google.com/maps?q=" + latitude + "," + longitude;
                            sendLocationSMS(locMsg);
                        } else {
                            Log.w("Location", "No se pudo obtener la ubicación.");
                        }
                    }
                });
    }

    public void sendLocationSMS(String locMsg){
        Log.i("sendLocationSMS", "mensaje: " + locMsg);
        try {
            SmsManager smsManager = SmsManager.getDefault();

            Log.i("sendLocationSMS", "Enviando mensaje a " + buttonData.getPhoneNumber());
            smsManager.sendTextMessage(buttonData.getPhoneNumber(), null, locMsg, null, null);
            Log.i("sendLocationSMS", "Mensaje enviado a " + buttonData.getPhoneNumber());

            for (String tel : buttonData.getProtectores()) {
                Log.i("sendLocationSMS", "Enviando mensaje a protector: " + tel);
                smsManager.sendTextMessage(tel, null, locMsg, null, null);
                Log.i("sendLocationSMS", "Mensaje enviado a protector: " + tel);
            }
        } catch (Exception e){
            Log.e("sendLocationSMS", e.getMessage());
        }

    }



}

package com.zantimago.SafeAndSound;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class CallActivity extends AppCompatActivity {

    private static final int REQUEST_CALL_PHONE = 1;
    private String phoneNumber;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.i("CallActivity - onCreate", "Entrando");

        phoneNumber = "666970082"; // Número de teléfono a llamar

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            Log.i("CallActivity - onCreate", "NO SE TIENE PERMISO, PIDIENDO...");
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CALL_PHONE}, REQUEST_CALL_PHONE);
        } else {
            makePhoneCall();
        }
    }

    private void makePhoneCall() {
        Log.i("CallActivity - makePhoneCall", "Entrando");
        Intent callIntent = new Intent(Intent.ACTION_CALL);
        callIntent.setData(Uri.parse("tel:" + phoneNumber));
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE) == PackageManager.PERMISSION_GRANTED) {
            Log.i("CallActivity - makePhoneCall", "Se tienen permisos, haciendo callIntent...");
            startActivity(callIntent);
            finish(); // Cierra la actividad después de iniciar la llamada
        }
        Log.e("CallActivity - makePhoneCall", "NO SE TIENEN PERMISOS");

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.i("CallActivity - onRequestPermissionsResult", "Entrando");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CALL_PHONE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                makePhoneCall();
            } else {
                // Permiso denegado, muestra un mensaje al usuario
                finish(); // Cierra la actividad si el permiso es denegado
            }
        }
    }
}

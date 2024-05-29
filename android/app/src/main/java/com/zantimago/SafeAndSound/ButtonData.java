package com.zantimago.SafeAndSound;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ButtonData {

    private String phoneNumber; // Número de teléfono a llamar
    private String phoneNumberMsg;

    private ArrayList<String> protectores = new ArrayList<>();
    private String protectorsMsg;

    private String text;
    private String name;
    private String color;

    private ArrayList<String> ailments = new ArrayList<>();
    private ArrayList<String> alergies = new ArrayList<>();
    private String bloodGroup;
    private String diabetes;

    public static ButtonData parseJSONFromRN(JSONObject btn) throws JSONException {

        Log.i("ButtonData - parseJSON", btn.toString());

        ButtonData button = new ButtonData();
        button.setColor(btn.getString("Color"));
        button.setPhoneNumber(btn.getString("Button_Tlf"));
        button.setPhoneNumberMsg(btn.getString("Emergency_Message"));
        button.setText(btn.getString("Button_Name"));

        JSONArray protectoresJSON = btn.getJSONArray("Phones");

        JSONObject protectorJSON;
        for(int i = 0; i < protectoresJSON.length(); i++){
            protectorJSON = protectoresJSON.getJSONObject(i);
            button.getProtectores().add(protectorJSON.getString("Phone"));
        }

        button.setProtectorsMsg(btn.getString("Protector_Message"));

        return button;
    }

    public static ButtonData parseJSON(JSONObject btn) throws JSONException {

        Log.i("ButtonData - parseJSON", btn.toString());

        ButtonData button = new ButtonData();
        button.setColor(btn.getString("color"));
        button.setPhoneNumber(btn.getString("phoneNumber"));
        button.setPhoneNumberMsg(btn.getString("phoneNumberMsg"));
        button.setText(btn.getString("text"));

        JSONArray protectoresJSON = btn.getJSONArray("protectores");

        String protector;
        for(int i = 0; i < protectoresJSON.length(); i++){
            protector = protectoresJSON.getString(i);
            button.getProtectores().add(protector);
        }

        button.setProtectorsMsg(btn.getString("protectorsMsg"));

        return button;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumberMsg() {
        return phoneNumberMsg;
    }

    public void setPhoneNumberMsg(String phoneNumberMsg) {
        this.phoneNumberMsg = phoneNumberMsg;
    }

    public ArrayList<String> getProtectores() {
        return protectores;
    }

    public void setProtectores(ArrayList<String> protectores) {
        this.protectores = protectores;
    }

    public String getProtectorsMsg() {
        return protectorsMsg;
    }

    public void setProtectorsMsg(String protectorsMsg) {
        this.protectorsMsg = protectorsMsg;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public ArrayList<String> getAilments() {
        return ailments;
    }

    public void setAilments(ArrayList<String> ailments) {
        this.ailments = ailments;
    }

    public ArrayList<String> getAlergies() {
        return alergies;
    }

    public void setAlergies(ArrayList<String> alergies) {
        this.alergies = alergies;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getDiabetes() {
        return diabetes;
    }

    public void setDiabetes(String diabetes) {
        this.diabetes = diabetes;
    }

    @Override
    public String toString() {
        return "{" +
                "phoneNumber='" + phoneNumber + '\'' +
                ", phoneNumberMsg='" + phoneNumberMsg + '\'' +
                ", protectores=" + protectores +
                ", protectorsMsg='" + protectorsMsg + '\'' +
                ", text='" + text + '\'' +
                ", name='" + name + '\'' +
                ", color='" + color + '\'' +
                ", ailments=" + ailments +
                ", alergies=" + alergies +
                ", bloodGroup='" + bloodGroup + '\'' +
                ", diabetes='" + diabetes + '\'' +
                '}';
    }
}

package com.zantimago.SafeAndSound;

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
}

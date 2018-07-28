package com.tomasz.wozniak.cardealershipproject.Items;

public class CarData {

    private String color;
    private String make;

    public CarData(String color, String make) {
        this.color = color;
        this.make = make;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }
}

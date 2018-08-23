package com.tomasz.wozniak.cardealershipproject.Items;

public class CarData {

    private int id;

    private String color;

    private String make;

    private String model;

    private int mfy;

    private CarImage carImage;

    private boolean recommended;

    public CarData() {}

    public CarData(String color, String make, String model, int mfy) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.mfy = mfy;
    }

    public CarData(String color, String make, String model, int mfy, CarImage carImage, boolean recommended) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.mfy = mfy;
        this.carImage = carImage;
        this.recommended = recommended;
    }

    @Override
    public String toString() {
        return "CarModel. Id: " + this.getId() + " Make: " + this.getMake() + " Model: " + this.getModel()
                + " Color: " + this.getColor() + " Year: " + this.getMfy();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getMfy() {
        return mfy;
    }

    public void setMfy(int mfy) {
        this.mfy = mfy;
    }

    public CarImage getCarImage() {
        return carImage;
    }

    public void setCarImage(CarImage carImage) {
        this.carImage = carImage;
    }

    public boolean isRecommended() {
        return recommended;
    }

    public void setRecommended(boolean recommended) {
        this.recommended = recommended;
    }
}

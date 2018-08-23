package com.tomasz.wozniak.cardealershipproject.Items;

public class CarData {

    private int id;

    private String color;

    private String make;

    private String model;

    private int mfy;

    private CarImage carImage;

    private boolean recommended;

    private int mfm;

    private String description;

    private String sellerNote;

    private int basePrice;

    private int retailPrice;

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

    public CarData(String color, String make, String model, int mfy, CarImage carImage,
                   boolean recommended, int mfm, String description, String sellerNote, int basePrice, int retailPrice) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.mfy = mfy;
        this.carImage = carImage;
        this.recommended = recommended;
        this.mfm = mfm;
        this.description = description;
        this.sellerNote = sellerNote;
        this.basePrice = basePrice;
        this.retailPrice = retailPrice;
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

    public int getMfm() {
        return mfm;
    }

    public void setMfm(int mfm) {
        this.mfm = mfm;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSellerNote() {
        return sellerNote;
    }

    public void setSellerNote(String sellerNote) {
        this.sellerNote = sellerNote;
    }

    public int getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(int basePrice) {
        this.basePrice = basePrice;
    }

    public int getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(int retailPrice) {
        this.retailPrice = retailPrice;
    }
}

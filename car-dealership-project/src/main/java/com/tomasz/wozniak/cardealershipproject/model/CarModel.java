package com.tomasz.wozniak.cardealershipproject.model;

import javax.persistence.*;

@Entity(name = "cars")
public class CarModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @Column
    private String color;

    @Column
    private String make;

    @Column
    private String model;

    @Column
    private boolean recommended;

    @Column
    private int mfy;

    @Column
    private int mfm;

    @Column
    private String description;

    @Column
    private String sellerNote;

    @Column
    private int basePrice;

    @Column
    private int retailPrice;

    @OneToOne
    @JoinColumn(name = "car_image_id", unique = true)
    private CarPictureModel carPictureModel;

    public CarModel() {
    }

    public CarModel(String color, String make, String model, int mfy, int mfm, boolean recommended,
                    String description, String sellerNote, int basePrice, int retailPrice, CarPictureModel carPictureModel) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.mfy = mfy;
        this.mfm = mfm;
        this.recommended = recommended;
        this.description = description;
        this.sellerNote = sellerNote;
        this.basePrice = basePrice;
        this.retailPrice = retailPrice;
        this.carPictureModel = carPictureModel;
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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
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

    public int getMfy() {
        return mfy;
    }

    public void setMfy(int mfy) {
        this.mfy = mfy;
    }

    public CarPictureModel getCarPictureModel() {
        return carPictureModel;
    }

    public void setCarPictureModel(CarPictureModel carPictureModel) {
        this.carPictureModel = carPictureModel;
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
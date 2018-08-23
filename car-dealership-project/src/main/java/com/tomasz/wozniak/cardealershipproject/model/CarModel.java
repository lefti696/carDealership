package com.tomasz.wozniak.cardealershipproject.model;

import javax.persistence.*;

@Entity(name = "cars")
//@Table(name = "car_model")
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
    private int mfy;

    @Column
    private boolean recommended;

    @OneToOne
    @JoinColumn(name = "car_image_id", unique = true)
    private CarPictureModel carPictureModel;

    public CarModel() {
    }

    public CarModel(String color, String make, String model, int mfy) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.mfy = mfy;
    }

    public CarModel(String color, String make, String model, int mfy, CarPictureModel carPictureModel, boolean recommended) {
        this.color = color;
        this.make = make;
        this.model = model;
        this.mfy = mfy;
        this.carPictureModel = carPictureModel;
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
}
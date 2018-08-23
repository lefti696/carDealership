package com.tomasz.wozniak.cardealershipproject.model;

import javax.persistence.*;

@Entity
//@Table(name = "car_picture_model")
public class CarPictureModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String fileName;

    @Column
    private String fileType;

    @Lob
    @Column
    private byte[] data;

//    @OneToOne(mappedBy = "carPictureModel")
//    private CarModel carModel;

    public CarPictureModel() {
    }

    public CarPictureModel(String fileName, String fileType, byte[] data) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
    }

//    public CarPictureModel(String fileName, String fileType, byte[] data, CarModel carModel) {
//        this.fileName = fileName;
//        this.fileType = fileType;
//        this.data = data;
//        this.carModel = carModel;
//    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public CarModel getCarModel() {
//        return carModel;
//    }
//
//    public void setCarModel(CarModel carModel) {
//        this.carModel = carModel;
//    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}

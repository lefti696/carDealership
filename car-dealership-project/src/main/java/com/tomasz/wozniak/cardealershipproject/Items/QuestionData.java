package com.tomasz.wozniak.cardealershipproject.Items;

import java.util.UUID;

public class QuestionData {

  private UUID id;

  private int contactNumber;

  private String nameAndSurname;

  private String bodyOfQuestion;

  private CarData carData;

  public QuestionData() {
  }

  public QuestionData(UUID id, int contactNumber, String nameAndSurname, String bodyOfQuestion, CarData carData) {
    this.id = id;
    this.contactNumber = contactNumber;
    this.nameAndSurname = nameAndSurname;
    this.bodyOfQuestion = bodyOfQuestion;
    this.carData = carData;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public int getContactNumber() {
    return contactNumber;
  }

  public void setContactNumber(int contactNumber) {
    this.contactNumber = contactNumber;
  }

  public String getNameAndSurname() {
    return nameAndSurname;
  }

  public void setNameAndSurname(String nameAndSurname) {
    this.nameAndSurname = nameAndSurname;
  }

  public String getBodyOfQuestion() {
    return bodyOfQuestion;
  }

  public void setBodyOfQuestion(String bodyOfQuestion) {
    this.bodyOfQuestion = bodyOfQuestion;
  }

  public CarData getCarData() {
    return carData;
  }

  public void setCarData(CarData carData) {
    this.carData = carData;
  }

  @Override
  public String toString() {
    return "Question id: " + getId() + " Name: " + getNameAndSurname() + " Number: "
      + getContactNumber() + " Body: " + getBodyOfQuestion();
  }
}

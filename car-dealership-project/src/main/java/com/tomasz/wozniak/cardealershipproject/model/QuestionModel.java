package com.tomasz.wozniak.cardealershipproject.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "questions")
public class QuestionModel {

  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private UUID id;

  @Column
  private int contactNumber;

  @Column
  private String nameAndSurname;

  @Column(length = 10485760)
  private String bodyOfQuestion;

  @ManyToOne
  @JoinColumn(name = "quested_car_id")
  private CarModel carModel;

  public QuestionModel() {
  }

  public QuestionModel(int contactNumber, String nameAndSurname, String bodyOfQuestion, CarModel carModel) {
    this.contactNumber = contactNumber;
    this.nameAndSurname = nameAndSurname;
    this.bodyOfQuestion = bodyOfQuestion;
    this.carModel = carModel;
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

  public CarModel getCarModel() {
    return carModel;
  }

  public void setCarModel(CarModel carModel) {
    this.carModel = carModel;
  }
}

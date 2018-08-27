package com.tomasz.wozniak.cardealershipproject.Facade.impl;

import com.tomasz.wozniak.cardealershipproject.Facade.SellerFacade;
import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import com.tomasz.wozniak.cardealershipproject.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class SellerFacadeImpl implements SellerFacade {

  private CarService carService;
  private QuestionService questionService;

  @Autowired
  public void setCarService(CarService carService) {
    this.carService = carService;
  }

  @Autowired
  public void setQuestionService(QuestionService questionService) {
    this.questionService = questionService;
  }

  @Override
  public List<CarData> getAllCars() {
    return carService.getAllCars();
  }

  @Override
  public CarData getCarById(int id) {
    return carService.getCarById(id);
  }

  @Override
  public int addCar(CarData carData) {
    return carService.addCar(carData);
  }

  @Override
  public void updateCar(CarData carData) {
    carService.updateCar(carData);
  }

  @Override
  public int countAllCars() {
    return carService.countAllCars();
  }

  @Override
  public void deleteCar(int id) {
    carService.deleteCar(id);
  }

  @Override
  public int countAllQuestions() {
    return questionService.countAllQuestions();
  }

  @Override
  public int countAllQuestionForCarId(int id) {
    return questionService.countAllQuestionForCarId(id);
  }

  @Override
  public List<QuestionData> getAllQuestions() {
    return questionService.getAllQuestions();
  }

    @Override
    public List<QuestionData> getAllQuestions(int pageIndex, int pageSize) {
        return questionService.getAllQuestions(pageIndex, pageSize);
    }

  @Override
  public QuestionData getQuestionById(UUID id) {
    return questionService.getQuestionById(id);
  }

  @Override
  public void deleteQuestion(UUID id) {
    questionService.deleteQuestion(id);
  }
}

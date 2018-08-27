package com.tomasz.wozniak.cardealershipproject.Facade;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;

import java.util.List;
import java.util.UUID;

public interface SellerFacade {

  List<CarData> getAllCars();
  CarData getCarById(int id);
  int addCar(CarData carData);
  void updateCar(CarData carData);
  int countAllCars();
  void deleteCar(int id);

  int countAllQuestions();
  int countAllQuestionForCarId(int id);
  List<QuestionData> getAllQuestions();
  List<QuestionData> getAllQuestions(int pageIndex, int pageSize);
  QuestionData getQuestionById(UUID id);
  void deleteQuestion(UUID id);
}

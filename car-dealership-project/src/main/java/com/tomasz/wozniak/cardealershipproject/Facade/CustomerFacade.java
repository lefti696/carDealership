package com.tomasz.wozniak.cardealershipproject.Facade;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;

import java.util.List;
import java.util.UUID;

public interface CustomerFacade {

  List<CarData> getAllCars();
  List<CarData> searchCarByMakeOrModel(String str);
  CarData getCarById(Integer id);
  Integer countAllCars();
  UUID addNewQuestion(QuestionData questionData);

}

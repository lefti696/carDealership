package com.tomasz.wozniak.cardealershipproject.Dao;

import com.tomasz.wozniak.cardealershipproject.model.QuestionModel;

import java.util.List;
import java.util.UUID;

public interface QuestionDao {


  int countAllQuestions();
  int countAllQuestionForCarId(int id);
  List<QuestionModel> getAllQuestions();
  List<QuestionModel> getAllQuestions(int pageIndex, int pageSize);
  QuestionModel getQuestionById(UUID id);
  UUID addNewQuestion(QuestionModel questionModel);
  void deleteQuestion(UUID id);

}

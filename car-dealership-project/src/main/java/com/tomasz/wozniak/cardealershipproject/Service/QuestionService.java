package com.tomasz.wozniak.cardealershipproject.Service;

import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;

import java.util.List;
import java.util.UUID;

public interface QuestionService {
  int countAllQuestions();
  int countAllQuestionForCarId(int id);
  List<QuestionData> getAllQuestions();
  List<QuestionData> getAllQuestions(int pageIdex, int pageSize);
  QuestionData getQuestionById(UUID id);
  void deleteQuestion(UUID id);
  UUID addNewQuestion(QuestionData questionData);
}

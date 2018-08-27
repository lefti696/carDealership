package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;
import com.tomasz.wozniak.cardealershipproject.model.QuestionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QuestionDataToQuestionModelPopulator {

    @Autowired
    private CarDataToCarModelPopulator carDataToCarModelPopulator;

    public QuestionModel convert(QuestionData questionData) {
        QuestionModel questionModel = new QuestionModel();

        questionModel.setBodyOfQuestion(questionData.getBodyOfQuestion());
        CarData carData = questionData.getCarData();
        if (null != carData) {
            questionModel.setCarModel(carDataToCarModelPopulator.convert(questionData.getCarData()));
        }
        questionModel.setContactNumber(questionData.getContactNumber());
        questionModel.setId(questionData.getId());
        questionModel.setNameAndSurname(questionData.getNameAndSurname());

        return questionModel;
    }

}

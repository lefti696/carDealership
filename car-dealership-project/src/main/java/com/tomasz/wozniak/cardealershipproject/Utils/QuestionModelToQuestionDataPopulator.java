package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import com.tomasz.wozniak.cardealershipproject.model.QuestionModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QuestionModelToQuestionDataPopulator {

    private static final Logger logger = Logger.getLogger(QuestionModelToQuestionDataPopulator.class);

    @Autowired
    private CarModelToCarDataPopulator carModelToCarDataPopulator;

    public QuestionData convert(QuestionModel questionModel) {
        logger.debug("Converting QuestionModel => QuestionData");
        QuestionData questionData = new QuestionData();

        questionData.setBodyOfQuestion(questionModel.getBodyOfQuestion());
        CarModel carModel = questionModel.getCarModel();
        if (null != carModel) {
            questionData.setCarData(carModelToCarDataPopulator.convert(questionModel.getCarModel()));
        }
        questionData.setId(questionModel.getId());
        questionData.setNameAndSurname(questionModel.getNameAndSurname());
        questionData.setContactNumber(questionModel.getContactNumber());

        return questionData;
    }
}

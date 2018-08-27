package com.tomasz.wozniak.cardealershipproject.Service.impl;

import com.tomasz.wozniak.cardealershipproject.Dao.QuestionDao;
import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;
import com.tomasz.wozniak.cardealershipproject.Service.QuestionService;
import com.tomasz.wozniak.cardealershipproject.Utils.QuestionDataToQuestionModelPopulator;
import com.tomasz.wozniak.cardealershipproject.Utils.QuestionModelToQuestionDataPopulator;
import com.tomasz.wozniak.cardealershipproject.model.QuestionModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class QuestionServiceImpl implements QuestionService {

    private static final Logger logger = Logger.getLogger(QuestionServiceImpl.class);

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private QuestionModelToQuestionDataPopulator questionModelToQuestionDataPopulator;

    @Autowired
    private QuestionDataToQuestionModelPopulator questionDataToQuestionModelPopulator;

    @Override
    public int countAllQuestions() {
        return questionDao.countAllQuestions();
    }

    @Override
    public int countAllQuestionForCarId(int id) {
        return questionDao.countAllQuestionForCarId(id);
    }

    @Override
    public List<QuestionData> getAllQuestions() {
        List<QuestionModel> questionModelList = questionDao.getAllQuestions();
        logger.debug("Questions found:" + questionModelList.size());

        List<QuestionData> questionDataList = new ArrayList<>();

        if (!CollectionUtils.isEmpty(questionModelList)) {
            for (QuestionModel questionModel : questionModelList) {
                QuestionData questionData = questionModelToQuestionDataPopulator.convert(questionModel);
                logger.debug("Removing extensive data from Questions");
                questionData.getCarData().setDescription("");
                questionData.getCarData().setCarImage(new CarImage());
                questionDataList.add(questionData);
            }
        }

        return questionDataList;
    }

    @Override
    public List<QuestionData> getAllQuestions(int pageIndex, int pageSize) {
        List<QuestionModel> questionModelList = questionDao.getAllQuestions(pageIndex, pageSize);
        logger.debug("Questions found:" + questionModelList.size());

        List<QuestionData> questionDataList = new ArrayList<>();

        if (!CollectionUtils.isEmpty(questionModelList)) {
            for (QuestionModel questionModel : questionModelList) {
                QuestionData questionData = questionModelToQuestionDataPopulator.convert(questionModel);
                logger.debug("Removing extensive data from Questions");
                questionData.getCarData().setDescription("");
                questionData.getCarData().setCarImage(new CarImage());
                questionDataList.add(questionData);
            }
        }

        return questionDataList;
    }

    @Override
    public QuestionData getQuestionById(UUID id) {
        return questionModelToQuestionDataPopulator.convert(questionDao.getQuestionById(id));
    }

    @Override
    public UUID addNewQuestion(QuestionData questionData) {
        return questionDao.addNewQuestion(questionDataToQuestionModelPopulator.convert(questionData));
    }

    @Override
    public void deleteQuestion(UUID id) {
        questionDao.deleteQuestion(id);
    }
}

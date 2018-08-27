package com.tomasz.wozniak.cardealershipproject.Dao.Impl;

import com.tomasz.wozniak.cardealershipproject.Dao.QuestionDao;
import com.tomasz.wozniak.cardealershipproject.model.QuestionModel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Transactional
@Repository
public class QuestionDaoImpl implements QuestionDao {

    private static final Logger logger = Logger.getLogger(QuestionDaoImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public int countAllQuestionForCarId(int qid) {
        String hql = "select count(q) from questions q where q.carModel.id = :qid";
        Query query = entityManager.createQuery(hql);
        query.setParameter("qid", qid);
        List<QuestionModel> questionModelList = query.getResultList();
        if (!CollectionUtils.isEmpty(questionModelList)) {
            return questionModelList.size();
        } else {
            return 0;
        }
    }

    @Override
    public int countAllQuestions() {
        String hql = "select count(q) from questions q";
        return Integer.valueOf(entityManager.createQuery(hql).getResultList().get(0).toString());
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<QuestionModel> getAllQuestions() {
        String hql = "select q from questions q"; //ORDER BY q.id ASC";
        return entityManager.createQuery(hql).getResultList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<QuestionModel> getAllQuestions(int pageIndex, int pageSize) {
        String hql = "select q from questions q"; //ORDER BY q.id ASC";
        Query query = entityManager.createQuery(hql);
        query.setFirstResult((pageIndex) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }

    @Override
    public QuestionModel getQuestionById(UUID id) {
        return entityManager.find(QuestionModel.class, id);
    }

    @Override
    public UUID addNewQuestion(QuestionModel questionModel) {
        entityManager.persist(questionModel);
        entityManager.flush();
        return questionModel.getId();
    }

    @Override
    public void deleteQuestion(UUID id) {
        entityManager.remove(getQuestionById(id));
    }
}

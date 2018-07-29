package com.tomasz.wozniak.cardealershipproject.Dao.Impl;

import com.tomasz.wozniak.cardealershipproject.Dao.CarDao;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class CarDaoImpl implements CarDao {

    private static final Logger logger = Logger.getLogger(CarDaoImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public List<CarModel> getAllCars() {
        String hql = "from cars";
        return (List<CarModel>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public int addCar(CarModel carModel) {
        entityManager.persist(carModel);
        entityManager.flush();
        return carModel.getId();
    }

    @Override
    public CarModel getCarByYear(int mfy) {
        return entityManager.find(CarModel.class, mfy);
    }

    @Override
    public CarModel getCarById(int id) {
        return entityManager.find(CarModel.class, id);
    }

    @Override
    public void updateCar(CarModel carModel) {
        CarModel aCar = getCarByYear(carModel.getId());
        aCar.setMake(carModel.getMake());
        aCar.setColor(carModel.getColor());
        aCar.setMfy(carModel.getMfy());
        entityManager.flush();
    }

    @Override
    public void deleteCar(int id) {
        entityManager.remove(getCarById(id));
    }

    @Override
    public int countAllCars() {
        String hql = "select count(c) from cars c";
        return Integer.valueOf(entityManager.createQuery(hql).getResultList().get(0).toString());
    }
}
package com.tomasz.wozniak.cardealershipproject.Dao.Impl;

import com.tomasz.wozniak.cardealershipproject.Dao.CarDao;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
        String hql = "select c from cars c ORDER BY c.id ASC";
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
    public void updateCar(CarModel updatedCarModel) {
        CarModel carToUpdate = getCarById(updatedCarModel.getId());
        carToUpdate.setMake(updatedCarModel.getMake());
        carToUpdate.setModel(updatedCarModel.getModel());
        carToUpdate.setColor(updatedCarModel.getColor());
        carToUpdate.setMfy(updatedCarModel.getMfy());
        carToUpdate.setRecommended(updatedCarModel.isRecommended());
        carToUpdate.setMfm(updatedCarModel.getMfm());
        carToUpdate.setSellerNote(updatedCarModel.getSellerNote());
        carToUpdate.setDescription(updatedCarModel.getDescription());
        carToUpdate.setBasePrice(updatedCarModel.getBasePrice());
        carToUpdate.setRetailPrice(updatedCarModel.getRetailPrice());
        carToUpdate.setEngineVolume(updatedCarModel.getEngineVolume());
        carToUpdate.setEngineDescription(updatedCarModel.getEngineDescription());

        CarPictureModel updatedCarPictureModel = updatedCarModel.getCarPictureModel();

        if (null != carToUpdate.getCarPictureModel() && null != updatedCarPictureModel) {
            //update picture
            updatedCarPictureModel.setId(carToUpdate.getCarPictureModel().getId());
            updateCarImage(updatedCarPictureModel);
        }
        if (null == carToUpdate.getCarPictureModel() && null != updatedCarPictureModel) {
            //upload new picture
            int newImageId = addImage(updatedCarPictureModel);
            logger.info("New picture picture uploaded with id: " + newImageId);
            carToUpdate.setCarPictureModel(updatedCarPictureModel);
        }
        entityManager.flush();
    }

    @Override
    public void updateCarImage(CarPictureModel updatedCarPicture) {
        CarPictureModel carPictureToUpdate = getImageById(updatedCarPicture.getId());

        carPictureToUpdate.setFileName(updatedCarPicture.getFileName());
        carPictureToUpdate.setFileType(updatedCarPicture.getFileType());
        carPictureToUpdate.setData(updatedCarPicture.getData());

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

    @Override
    public int addImage(CarPictureModel carPictureModel) {
        entityManager.persist(carPictureModel);
        entityManager.flush();
        return carPictureModel.getId();
    }

    @Override
    public CarPictureModel getImageById(int id) {
        return entityManager.find(CarPictureModel.class, id);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<CarModel> searchCarByMakeOrModel(String inputStr) {
        String hql = "select c from cars c where lower(c.make) like lower(:par) or lower(c.model) like lower(:par)";
        Query query = entityManager.createQuery(hql);
        query.setParameter("par", '%' + inputStr + '%');

        return (List<CarModel>) query.getResultList();
    }
}
package at.melius.repository;

import at.melius.model.GeneralInfo;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

@ApplicationScoped
public class GeneralInfoRepository {
    @Inject
    EntityManager entityManager;

    @Transactional
    public GeneralInfo addGeneralInfo(GeneralInfo generalInfo) {
        if(getInfoByProfile(generalInfo.getProfile()) == null) {
            this.entityManager.persist(generalInfo);
            return generalInfo;
        }

        throw new BadRequestException();
    }

    @Transactional
    public void updateGeneralInfo(GeneralInfo generalInfo) {
        GeneralInfo currGeneralInfo = entityManager.find(GeneralInfo.class, generalInfo.getProfile().getId());

        currGeneralInfo.setGender(generalInfo.getGender());
        currGeneralInfo.setZipCode(generalInfo.getZipCode());
        currGeneralInfo.setCity(generalInfo.getCity());
        currGeneralInfo.setAddress(generalInfo.getAddress());
    }

    public GeneralInfo getInfoByProfile(Profile profile) {
        return this.entityManager.find(GeneralInfo.class, profile.getId());
    }

    public GeneralInfo getInfoById(int id) {
        return this.entityManager.find(GeneralInfo.class, id);
    }


}

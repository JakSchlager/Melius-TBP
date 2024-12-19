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
        if(this.entityManager.find(GeneralInfo.class, generalInfo.getId()) == null) {
            this.entityManager.persist(generalInfo);
            return generalInfo;
        }

        throw new BadRequestException();
    }

    @Transactional
    public GeneralInfo updateGeneralInfo(GeneralInfo generalInfo) {
        this.entityManager.merge(generalInfo);
        return generalInfo;
    }
}

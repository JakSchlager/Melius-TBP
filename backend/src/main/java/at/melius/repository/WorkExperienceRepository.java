package at.melius.repository;

import at.melius.model.Education;
import at.melius.model.Profile;
import at.melius.model.WorkExperience;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import org.hibernate.jdbc.Work;

import java.util.List;

@ApplicationScoped
public class WorkExperienceRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void updateWorkExperience(WorkExperience workExperience) {
        if(this.entityManager.find(WorkExperience.class, workExperience.getId()) != null) {
            WorkExperience currWorkExperience = entityManager.find(WorkExperience.class, workExperience.getId());

            currWorkExperience.setCompany(workExperience.getCompany());
            currWorkExperience.setInformation(workExperience.getInformation());
            currWorkExperience.setFromDate(workExperience.getFromDate());
            currWorkExperience.setToDate(workExperience.getToDate());
            currWorkExperience.setProfile(workExperience.getProfile());
        } else {
            entityManager.persist(workExperience);
        }
    }

    @Transactional
    public void deleteWorkExperience(int id) {
        WorkExperience currWorkExperience = entityManager.find(WorkExperience.class, id);

        if(currWorkExperience != null) {
            entityManager.remove(currWorkExperience);
        } else {
            throw new BadRequestException();
        }
    }

    public List<WorkExperience> getWorkExperiencesByProfile(int profileId) {
        TypedQuery<WorkExperience> query = entityManager.createNamedQuery(WorkExperience.GET_BY_PROFILE_ID, WorkExperience.class);

        query.setParameter("profile", this.entityManager.find(Profile.class, profileId));

        return query.getResultList();
    }
}

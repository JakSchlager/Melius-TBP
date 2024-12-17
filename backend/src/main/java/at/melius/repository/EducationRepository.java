package at.melius.repository;

import at.melius.model.Education;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

import java.util.List;

@ApplicationScoped
public class EducationRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public Education updateEducation(Education education) {
        if(this.entityManager.find(Education.class, education.getId()) != null) {
            this.entityManager.merge(education);
        } else {
            this.entityManager.persist(education);
        }
        return education;
    }

    @Transactional
    public void deleteEducation(int id) {
        Education currEducation = this.entityManager.find(Education.class, id);

        if(currEducation != null) {
            this.entityManager.remove(currEducation);
        } else {
            throw new BadRequestException();
        }

    }

    public List<Education> getEducationsByProfile(int profileId) {
        TypedQuery<Education> query = entityManager.createNamedQuery(Education.GET_BY_PROFILE_ID, Education.class);

        query.setParameter("id", this.entityManager.find(Profile.class, profileId));

        return query.getResultList();
    }
}

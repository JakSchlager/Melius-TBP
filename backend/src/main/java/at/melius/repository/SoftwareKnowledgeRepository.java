package at.melius.repository;

import at.melius.model.Profile;
import at.melius.model.ProgrammingKnowledge;
import at.melius.model.Software;
import at.melius.model.SoftwareKnowledge;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class SoftwareKnowledgeRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public SoftwareKnowledge updateSoftwareKnowledge(SoftwareKnowledge softwareKnowledge){
        if(this.entityManager.find(SoftwareKnowledge.class, softwareKnowledge.getId()) != null){
            this.entityManager.merge(softwareKnowledge);
        } else {
            this.entityManager.persist(softwareKnowledge);
        }

        return softwareKnowledge;
    }

    public List<SoftwareKnowledge> getSoftwareKnowledgeByProfileId(int id) {
        TypedQuery<SoftwareKnowledge> query = this.entityManager.createNamedQuery(SoftwareKnowledge.QUERY_FIND_BY_PROFILE_ID, SoftwareKnowledge.class);

        query.setParameter("profile", this.entityManager.find(Profile.class, id));
        return query.getResultList();
    }

    @Transactional
    public void deleteSoftwareKnowledge(int id) {
        this.entityManager.remove(this.entityManager.find(SoftwareKnowledge.class, id));
    }
}

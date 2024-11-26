package at.melius.repository;

import at.melius.model.Profile;
import at.melius.model.ProgrammingKnowledge;
import at.melius.model.ProgrammingLanguage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ProgrammingKnowledgeRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void updateProgrammingKnowledge(ProgrammingKnowledge programmingKnowledge){
        if(this.entityManager.find(ProgrammingKnowledge.class, programmingKnowledge.getId()) != null){
            this.entityManager.merge(programmingKnowledge);
        } else {
            this.entityManager.persist(programmingKnowledge);

            /*Set<ProgrammingKnowledge> newSet = programmingKnowledge.getProfile().getProgrammingKnowledges();
            newSet.add(programmingKnowledge);
            programmingKnowledge.getProfile().setProgrammingKnowledges(newSet);
            //programmingKnowledge.getProgramming().getP

            this.entityManager.merge(this.entityManager.find(Profile.class,programmingKnowledge.getProfile().getId()));
            //this.entityManager.merge(this.entityManager.find(ProgrammingLanguage.class,programmingKnowledge.getProgramming().getId()));*/
        }
    }

    public List<ProgrammingKnowledge> getProgrammingKnowledgeByProfileId(int id) {
        TypedQuery<ProgrammingKnowledge> query = this.entityManager.createNamedQuery(ProgrammingKnowledge.QUERY_FIND_BY_PROFILE_ID, ProgrammingKnowledge.class);

        query.setParameter("profile", this.entityManager.find(Profile.class, id));
        return query.getResultList();
    }

    @Transactional
    public void deleteProgrammingKnowledge(int id) {
        this.entityManager.remove(this.entityManager.find(ProgrammingKnowledge.class, id));
    }
}

package at.melius.repository;

import at.melius.model.Characteristic;
import at.melius.model.ProgrammingKnowledge;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

import java.util.List;

@ApplicationScoped
public class ProgrammingKnowledgeRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void addProgrammingKnowledge(ProgrammingKnowledge programming) {
        if(this.entityManager.find(ProgrammingKnowledge.class, programming.getId()) == null) {
            entityManager.persist(programming);
        } else {
            throw new BadRequestException("Programming Knowledge with label " + programming.getLabel() + " already exists");
        }
    }

    @Transactional
    public void deleteProgrammingknowledge(ProgrammingKnowledge programming) {
        if(this.entityManager.find(ProgrammingKnowledge.class, programming.getId()) != null) {
            entityManager.remove(programming);
        }
    }

    public List<ProgrammingKnowledge> getAllProgrammingKnowledges() {
        TypedQuery<ProgrammingKnowledge> query = this.entityManager.createNamedQuery(ProgrammingKnowledge.QUERY_FIND_ALL, ProgrammingKnowledge.class);
        return query.getResultList();
    }
}

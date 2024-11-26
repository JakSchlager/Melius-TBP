package at.melius.repository;

import at.melius.model.ProgrammingLanguage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

import java.util.List;

@ApplicationScoped
public class ProgrammingLanguageRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void addProgrammingLanguage(ProgrammingLanguage programming) {
        if(this.entityManager.find(ProgrammingLanguage.class, programming.getId()) == null) {
            entityManager.persist(programming);
        } else {
            throw new BadRequestException("Programming Knowledge with label " + programming.getLabel() + " already exists");
        }
    }

    @Transactional
    public void deleteProgrammingLanguage(ProgrammingLanguage programming) {
        if(this.entityManager.find(ProgrammingLanguage.class, programming.getId()) != null) {
            entityManager.remove(programming);
        }
    }

    public List<ProgrammingLanguage> getAllProgrammingLanguages() {
        TypedQuery<ProgrammingLanguage> query = this.entityManager.createNamedQuery(ProgrammingLanguage.QUERY_FIND_ALL, ProgrammingLanguage.class);
        return query.getResultList();
    }
}

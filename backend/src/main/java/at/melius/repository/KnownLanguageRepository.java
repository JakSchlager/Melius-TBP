package at.melius.repository;

import at.melius.model.KnownLanguage;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class KnownLanguageRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public KnownLanguage updateKnownLanguage(KnownLanguage language) {
        if(this.entityManager.find(KnownLanguage.class, language.getId()) != null) {
            this.entityManager.merge(language);
        } else {
            this.entityManager.persist(language);
        }

        return language;
    }
    @Transactional
    public void deleteKnownLanguage(int id) {
        this.entityManager.remove(this.entityManager.find(KnownLanguage.class, id));
    }
}

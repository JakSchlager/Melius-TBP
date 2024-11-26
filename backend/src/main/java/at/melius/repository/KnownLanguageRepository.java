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
    public void updateKnownLanguage(KnownLanguage language) {
        if(this.entityManager.find(KnownLanguage.class, language.getId()) != null) {
            this.entityManager.merge(language);
        } else {
            this.entityManager.persist(language);
        }
    }

    public List<KnownLanguage> getKnownLanguagesByProfileId(int profileId) {
        TypedQuery<KnownLanguage> query = this.entityManager.createNamedQuery(KnownLanguage.QUERY_FIND_BY_USER, KnownLanguage.class);

        query.setParameter("profile", this.entityManager.find(Profile.class, profileId));

        return query.getResultList();
    }

    @Transactional
    public void deleteKnownLanguage(int id) {
        this.entityManager.remove(this.entityManager.find(KnownLanguage.class, id));
    }
}

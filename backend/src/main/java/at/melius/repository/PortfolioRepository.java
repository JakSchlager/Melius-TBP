package at.melius.repository;

import at.melius.model.Portfolio;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class PortfolioRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void addPortfolio(Portfolio portfolio) {
        entityManager.persist(portfolio);
    }

    @Transactional
    public void updatePortfolio(Portfolio portfolio) {
        this.entityManager.merge(portfolio);
    }

    public Portfolio getPortfolioById(int id) {
        return entityManager.find(Portfolio.class, id);
    }
}

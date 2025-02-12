package at.melius.repository;

import at.melius.model.Characteristic;
import at.melius.model.GHRepo;
import at.melius.model.Portfolio;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

import java.util.List;

@ApplicationScoped
public class GHRepoRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void addAllRepos(GHRepo[] ghRepos) {
        for(GHRepo currRepo : ghRepos) {
            if(this.entityManager.find(GHRepo.class, currRepo.getId()) == null) {
                entityManager.persist(currRepo);
            } else {
                throw new BadRequestException("Repo with id " + currRepo.getId() + " already exists");
            }
        }
    }

    @Transactional
    public void deleteAllRepos(int id) {
        List<GHRepo> ghRepos = getReposByPortfolioId(id);

        for(GHRepo currRepo : ghRepos) {
            if(this.entityManager.find(GHRepo.class, currRepo.getId()) != null) {
                entityManager.remove(currRepo);
            }
        }
    }

    private List<GHRepo> getReposByPortfolioId(int id) {
        TypedQuery<GHRepo> query = this.entityManager.createNamedQuery(GHRepo.QUERY_FIND_BY_PORTFOLIO, GHRepo.class);

        query.setParameter("portfolio", this.entityManager.find(Portfolio.class, id));

        return query.getResultList();
    }
}

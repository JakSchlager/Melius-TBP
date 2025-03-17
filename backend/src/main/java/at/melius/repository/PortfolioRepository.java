package at.melius.repository;

import at.melius.DTO.ImageUploadDTO;
import at.melius.model.Image;
import at.melius.model.Portfolio;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

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

    @Transactional
    public void updatePortfolioBackground(int id, ImageUploadDTO image) {
        Portfolio portfolio = entityManager.find(Portfolio.class, id);

        try {
            byte[] imageBytes = image.file.readAllBytes();

            portfolio.setBackgroundImage(imageBytes);
            portfolio.setColor("");
        } catch (Exception e) {
            throw new BadRequestException();
        }
    }
}

package at.melius.repository;

import at.melius.DTO.ImageUploadDTO;
import at.melius.model.Image;
import at.melius.model.Portfolio;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

@ApplicationScoped
public class ImageRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void addToPortfolio(int id, ImageUploadDTO image) {
        Portfolio portfolio = entityManager.find(Portfolio.class, id);

        try {
            byte[] imageBytes = image.file.readAllBytes();

            entityManager.persist(new Image(imageBytes, portfolio, image.position));
        } catch (Exception e) {
            throw new BadRequestException();
        }

    }

    @Transactional
    public void removeImage(int id) {
        this.entityManager.remove(entityManager.find(Image.class, id));
    }

    @Transactional
    public void updateImagePosition(int id, String position) {
        Image image = entityManager.find(Image.class, id);

        image.setPosition(position);
    }
}

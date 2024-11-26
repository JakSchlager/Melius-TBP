package at.melius.repository;

import at.melius.model.Software;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class SoftwareRepository {

    @Inject
    EntityManager entityManager;

    public List<Software> getAllSoftwares() {
        TypedQuery<Software> query = entityManager.createNamedQuery(Software.QUERY_FIND_ALL, Software.class);
        return query.getResultList();
    }
}
